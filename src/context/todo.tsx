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
  createTodo: (props: CreateTodoProps) => void;
  updateTodo: (props: UpdateTodoProps) => void;
  deleteTodo: (props: DeleteTodoProps) => void;
}

const TodoContext = createContext<TodoContextProps>(null!);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const refreshTodos = async () => {
    const response = await fetchGetTodos();
    setTodos(response.data);
  };

  const createTodo: TodoContextProps["createTodo"] = async (props) => {
    await fetchCreateTodo(props);
    refreshTodos();
  };

  const updateTodo: TodoContextProps["updateTodo"] = async (props) => {
    await fetchUpdateTodo(props);
    refreshTodos();
  };

  const deleteTodo: TodoContextProps["deleteTodo"] = async (props) => {
    await fetchDeleteTodo(props);
    refreshTodos();
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
