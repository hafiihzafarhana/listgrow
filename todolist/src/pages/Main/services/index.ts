import apiClient from "../../../api";
import { IToDoDocument } from "../../../interfaces/todo";

export const getTodos = () => {
  return apiClient.get("/todos");
};

export const createTodo = (data: IToDoDocument) => {
  return apiClient.post("/todos", data);
};

export const updateTodo = (data: IToDoDocument, id: string) => {
  return apiClient.put(`/todos/${id}`, data);
};

export const deleteTodo = (id: string, image_secure_id: string) => {
  return apiClient.delete(`/todos/${id}/${image_secure_id}`);
};
