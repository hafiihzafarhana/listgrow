import apiClient from "../../../api";
export const getTodos = () => {
    return apiClient.get("/todos");
};
export const createTodo = (data) => {
    return apiClient.post("/todos", data);
};
export const updateTodo = (data, id) => {
    return apiClient.put(`/todos/${id}`, data);
};
export const deleteTodo = (id, image_secure_id) => {
    return apiClient.delete(`/todos/${id}/${image_secure_id}`);
};
