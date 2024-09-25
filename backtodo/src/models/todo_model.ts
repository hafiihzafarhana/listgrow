import { DataTypes, ModelDefined, Optional } from 'sequelize';

import { IToDoDocument } from '../infra/interfaces/todo_interface';
import { sqlz } from '../db';

import { UserModel } from './user_model';

type TodoCreationAttributes = Optional<IToDoDocument, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

const ToDoModel: ModelDefined<IToDoDocument, TodoCreationAttributes> = sqlz.define('todos', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
    references: {
      model: UserModel, // Merujuk ke model User
      key: 'id'
    }
    // Pastikan tidak ada opsi unique di sini
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  place: {
    type: DataTypes.STRING,
    allowNull: false
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}) as ModelDefined<IToDoDocument, TodoCreationAttributes>;

UserModel.hasMany(ToDoModel, {
  foreignKey: 'user_id', // Foreign key in ToDoModel
  sourceKey: 'id' // Primary key in UserModel
});

ToDoModel.belongsTo(UserModel, {
  foreignKey: 'user_id', // Foreign key in ToDoModel
  targetKey: 'id' // Primary key in UserModel
});

export { ToDoModel };
