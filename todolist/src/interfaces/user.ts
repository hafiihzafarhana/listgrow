export interface IUserDocument {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
