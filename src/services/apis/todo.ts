import axios from "axios";
import { handleError } from "../../error";
import { storage } from "../../storage";
import { TodoProps } from "../../types/todo";
import {
  CreateTodoRequestProps,
  UpdateTodoRequestProps,
  DeleteTodoRequestProps,
} from "../model/todoSchema";

export function fetchCreateTodo({ todo }: CreateTodoRequestProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.post<TodoProps>("todos", { todo });
}

export function fetchGetTodos() {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.get<TodoProps[]>("todos");
}
export function fetchUpdateTodo({
  id,
  todo,
  isCompleted,
}: UpdateTodoRequestProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.put<TodoProps>(`todos/${id}`, {
    todo,
    isCompleted,
  });
}
export function fetchDeleteTodo({ id }: DeleteTodoRequestProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.delete(`todos/${id}`);
}

function makeAxiosInstanceWithTokenAuth() {
  const token = storage.get("access_token");

  if (!token) {
    handleError(new Error("no token"));
  }

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  instance.defaults.headers.common["Content-Type"] = "application/json";
  return instance;
}
