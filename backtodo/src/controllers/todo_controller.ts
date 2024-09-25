import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 as UUIDV4 } from 'uuid';
import cloudinary, { UploadApiResponse } from 'cloudinary';

import { ToDoService } from '../services/todo_service';
import { ToDoCreateDTO, ToUpdateDTO } from '../infra/dtos/todo_dto';
import { BadRequestError } from '../utils/error_util';
import { uploads } from '../utils/cloudinary_util';
import { IToDoDocument } from '../infra/interfaces/todo_interface';
import { AuthorizeRequest } from '../middlewares/token_middleware';

export class ToDoControllers {
  private toDoService: ToDoService;

  constructor() {
    this.toDoService = new ToDoService();
  }

  public getAllTodos = asyncHandler(async (req: AuthorizeRequest, res: Response): Promise<void> => {
    const result = await this.toDoService.getAllToDosByUser(`${req.user?.user_id}`);

    res.json({
      msg: 'Get all todos',
      status: StatusCodes.OK,
      result,
      token: req.user?.acc_token
    });
  });

  public createTodo = asyncHandler(async (req: AuthorizeRequest, res: Response): Promise<void> => {
    const { error } = await Promise.resolve(ToDoCreateDTO.validate(req.body));

    if (error?.details) {
      throw new BadRequestError(error.message, 'createTodo() error in class ToDoControllers');
    }

    const { img_url_new, title, place, date, description } = req.body;

    const profilePublicId = UUIDV4();
    const uploadResult = (await uploads(img_url_new, `${profilePublicId}`, true, true)) as UploadApiResponse;
    if (!uploadResult.public_id) {
      throw new BadRequestError('upload file is error', 'create() error in class ToDoControllers');
    }

    const data: IToDoDocument = {
      img_url: uploadResult.secure_url,
      date,
      place,
      title,
      description,
      user_id: req.user?.user_id,
      public_id: profilePublicId
    };

    const result = await this.toDoService.createToDo(data);

    res.json({
      msg: 'Created todo',
      status: StatusCodes.CREATED,
      result,
      token: req.user?.acc_token
    });
  });

  public deleteTodo = asyncHandler(async (req: AuthorizeRequest, res: Response): Promise<void> => {
    const id = req.params.id;
    const image_secure_id = req.params.image_secure_id;
    // const { image_secure_id } = req.body;
    await cloudinary.v2.uploader.destroy(image_secure_id);
    await this.toDoService.deleteToDo(id, `${req.user?.user_id}`);

    res.json({
      msg: 'Delete todo',
      status: StatusCodes.OK,
      token: req.user?.acc_token
    });
  });

  public updateTodo = asyncHandler(async (req: AuthorizeRequest, res: Response): Promise<void> => {
    const { error } = await Promise.resolve(ToUpdateDTO.validate(req.body));

    if (error?.details) {
      throw new BadRequestError(error.message, 'createTodo() error in class ToDoControllers');
    }
    let getPublicId = '';
    let getImgUrl = '';
    const { img_url, img_url_new, title, place, date, description, public_id } = req.body;
    const id = req.params.id;
    getPublicId = public_id;
    getImgUrl = img_url;

    // update data gambar
    if (img_url_new != '') {
      await cloudinary.v2.uploader.destroy(public_id);

      const profilePublicId = UUIDV4();
      const uploadResult = (await uploads(img_url_new, `${profilePublicId}`, true, true)) as UploadApiResponse;
      if (!uploadResult.public_id) {
        throw new BadRequestError('upload file is error', 'create() error in class ToDoControllers');
      }

      getPublicId = profilePublicId;
      getImgUrl = uploadResult.secure_url;
    }

    const data: IToDoDocument = {
      img_url: getImgUrl,
      date,
      place,
      title,
      description,
      user_id: req.user?.user_id,
      id,
      public_id: getPublicId
    };

    const result = await this.toDoService.updateToDoByUserId(data);

    res.json({
      msg: 'Update todo',
      status: StatusCodes.OK,
      result,
      token: req.user?.acc_token
    });
  });
}
