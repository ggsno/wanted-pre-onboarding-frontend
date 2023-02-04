import axios from "axios";
import { TodoProps } from "../context/todo";
import { storage } from "../storage";

export interface CreateTodoProps {
  todoContent: string;
}

export interface UpdateTodoProps {
  todoId: number;
  todoContent: string;
  isCompleted: boolean;
}

export interface DeleteTodoProps {
  todoId: number;
}

export function fetchCreateTodo({ todoContent }: CreateTodoProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.post<{ data: TodoProps }>("todos", { todo: todoContent });
}

export function fetchGetTodos() {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.get<{ data: TodoProps[] }>("todos");
}
export function fetchUpdateTodo({
  todoId,
  todoContent,
  isCompleted,
}: UpdateTodoProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.put<{ data: TodoProps }>(`todos/${todoId}`, {
    todo: todoContent,
    isCompleted,
  });
}
export function fetchDeleteTodo({ todoId }: DeleteTodoProps) {
  const instance = makeAxiosInstanceWithTokenAuth();

  return instance.delete(`todos/${todoId}`);
}

function makeAxiosInstanceWithTokenAuth() {
  const token = storage.get("ACCESS_TOKEN");
  // TODO: error handling
  if (!token) throw new Error("");

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  instance.defaults.headers.common["Content-Type"] = "application/json";
  return instance;
}
