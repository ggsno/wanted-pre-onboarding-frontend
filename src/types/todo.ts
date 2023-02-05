import {
  CreateTodoRequestProps,
  DeleteTodoRequestProps,
  UpdateTodoRequestProps,
} from "../services/model/todoSchema";

export type TodoProps = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export type TodoContextProps = {
  todos: TodoProps[];
  createTodo: (props: CreateTodoRequestProps) => void;
  updateTodo: (props: UpdateTodoRequestProps) => void;
  deleteTodo: (props: DeleteTodoRequestProps) => void;
};
