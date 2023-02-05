import TodoAddForm from "../components/TodoAddForm";
import TodoList from "../components/TodoList";

export default function TodoPage() {
  return (
    <>
      <h2 className="text-lg text-center">할 일 목록</h2>
      <TodoAddForm />
      <TodoList />
    </>
  );
}
