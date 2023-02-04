import axios from "axios";
import { TodoProps } from "../context/todo";
import { storage } from "../storage";

export interface CreateTodoProps {
  todo: string;
}

export interface UpdateTodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export interface DeleteTodoProps {
  id: number;
}

export function fetchCreateTodo({ todo }: CreateTodoProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.post<TodoProps>("todos", { todo });
}

export function fetchGetTodos() {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.get<TodoProps[]>("todos");
}
export function fetchUpdateTodo({ id, todo, isCompleted }: UpdateTodoProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.put<TodoProps>(`todos/${id}`, {
    todo,
    isCompleted,
  });
}
export function fetchDeleteTodo({ id }: DeleteTodoProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.delete(`todos/${id}`);
}

function makeAxiosInstanceWithTokenAuth() {
  const token = storage.get("access_token");
  // TODO: error handling
  if (!token) throw new Error("ppap");

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  instance.defaults.headers.common["Content-Type"] = "application/json";
  return instance;
}
