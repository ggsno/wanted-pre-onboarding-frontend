import { useTodo } from "../context/todo";
import useInput from "../hooks/useInput";

export default function TodoAddForm() {
  const { createTodo } = useTodo();
  const { value, onChange, onSubmitCallback } = useInput("");

  const handleSubmitCreateTodo = onSubmitCallback(() => {
    createTodo({ todo: value });
  });

  return (
    <form onSubmit={handleSubmitCreateTodo} className={"mt-4"}>
      <input
        value={value}
        placeholder={"여기에 할 일 입력"}
        onChange={onChange}
        data-testid="new-todo-input"
        className="w-full"
      />
      <button
        type="submit"
        data-testid="new-todo-add-button"
        className="mt-2 mb-4"
      >
        추가
      </button>
    </form>
  );
}
