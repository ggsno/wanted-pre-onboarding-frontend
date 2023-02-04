import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  CreateTodoProps,
  UpdateTodoProps,
  DeleteTodoProps,
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchGetTodos,
  fetchUpdateTodo,
} from "../apis/todo";

export interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface TodoContextProps {
  todos: TodoProps[];
  createTodo: (props: CreateTodoProps, callback: VoidFunction) => void;
  updateTodo: (props: UpdateTodoProps, callback: VoidFunction) => void;
  deleteTodo: (props: DeleteTodoProps, callback: VoidFunction) => void;
}

const TodoContext = createContext<TodoContextProps>(null!);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const refreshTodos = async () => {
    const response = await fetchGetTodos();
    setTodos(response.data.data);
  };

  const createTodo: TodoContextProps["createTodo"] = async (
    props,
    callback
  ) => {
    await fetchCreateTodo(props);
    refreshTodos();
    callback();
  };

  const updateTodo: TodoContextProps["updateTodo"] = async (
    props,
    callback
  ) => {
    await fetchUpdateTodo(props);
    refreshTodos();
    callback();
  };

  const deleteTodo: TodoContextProps["deleteTodo"] = async (
    props,
    callback
  ) => {
    await fetchDeleteTodo(props);
    refreshTodos();
    callback();
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
