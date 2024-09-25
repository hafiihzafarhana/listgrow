import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { omit } from 'lodash';

import { TokenService } from '../services/token_service';
import { UserService } from '../services/user_service';
import { signInDTO, signUpDTO } from '../infra/dtos/user_dto';
import { BadRequestError, NotFoundError } from '../utils/error_util';
import { IUserDocument } from '../infra/interfaces/user_interface';
import { generateTokens } from '../utils/token_util';

export class UserControllers {
  private authService: UserService;
  private tokenService: TokenService;

  constructor() {
    this.authService = new UserService();
    this.tokenService = new TokenService();
  }

  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Check or validate that body appropriate with the scheme

    const { error } = await Promise.resolve(signUpDTO.validate(req.body));
    console.log(error?.message);

    if (error?.details) {
      throw new BadRequestError(error?.message, 'create() error in class UserControllers');
    }

    const { email, password, name } = req.body;

    // Check if user exist
    const checkIfUserExist: IUserDocument | null = await this.authService.getUserByEmail(email);

    if (checkIfUserExist) {
      throw new BadRequestError('Email Exist', 'create() error in class SignUpControllers');
    }

    const userData: IUserDocument = {
      email: email,
      password,
      name
    } as IUserDocument;

    // Create data
    const result: IUserDocument = await this.authService.createUser(userData);

    // JWT token
    const token: { accessToken: string; refreshToken: string } = generateTokens(result.id, email);

    // create token
    await this.tokenService.createToken({ acc_token: token.accessToken, ref_token: token.refreshToken, user_id: result.id });

    res.status(StatusCodes.OK).json({
      msg: 'User was created',
      status: StatusCodes.CREATED,
      result,
      token: token.accessToken
    });
  });

  public login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { error } = await Promise.resolve(signInDTO.validate(req.body));
    if (error?.details) {
      throw new BadRequestError(error.message, 'UserControllers login() method error');
    }

    const { email, password } = req.body;

    const existingUser: IUserDocument | null = await this.authService.getUserByEmail(email);

    if (!existingUser || existingUser == null) {
      throw new NotFoundError('User not found', 'UserControllers read() method error');
    }

    const passwordsMatch: boolean = await this.authService.checkPassword(password, `${existingUser.password}`);

    if (!passwordsMatch) {
      throw new BadRequestError('User not found', 'UserControllers read() method error');
    }

    const token: { accessToken: string; refreshToken: string } = generateTokens(existingUser.id, email);
    let userData: IUserDocument | null = null;
    userData = omit(existingUser, ['password']);

    // update token by user id
    await this.tokenService.updateTokenByUserId({ user_id: existingUser.id, acc_token: token.accessToken, ref_token: token.refreshToken });

    res.status(StatusCodes.OK).json({
      msg: 'User was logged',
      status: StatusCodes.OK,
      result: userData,
      token: token.accessToken
    });
  });
}
