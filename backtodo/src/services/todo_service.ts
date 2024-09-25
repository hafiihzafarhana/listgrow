import { IToDoDocument } from '../infra/interfaces/todo_interface';
import { ToDoModel } from '../models/todo_model';

export class ToDoService {
  public async createToDo(data: IToDoDocument): Promise<IToDoDocument> {
    const result = await ToDoModel.create(data);
    return result as IToDoDocument;
  }

  public async updateToDoByUserId(data: IToDoDocument): Promise<IToDoDocument | null> {
    const [, updatedRows] = await ToDoModel.update(
      {
        date: data.date,
        img_url: data.img_url,
        place: data.place,
        title: data.title,
        public_id: data.public_id,
        description: data.description
      },
      {
        where: {
          user_id: data.user_id,
          id: data.id
        },
        returning: true
      }
    );

    return updatedRows.length > 0 ? (updatedRows[0].get({ plain: true }) as IToDoDocument) : null;
  }

  public async deleteToDo(id: string, user_id: string): Promise<void> {
    await ToDoModel.destroy({
      where: {
        id: id,
        user_id: user_id
      }
    });
  }

  public async getAllToDosByUser(user_id: string): Promise<IToDoDocument[]> {
    const result = await ToDoModel.findAll({
      where: {
        user_id
      }
    });

    return result as IToDoDocument[];
  }
}
