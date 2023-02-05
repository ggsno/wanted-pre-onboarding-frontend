import { useState, useEffect } from "react";
import { useTodo } from "../context/todo";
import useInput from "../hooks/useInput";
import { TodoProps } from "../types/todo";

export default function TodoList() {
  const { todos } = useTodo();
  const [editTodoItem, setEditTodoItem] = useState<TodoProps | null>(null);

  return (
    <>
      {todos.length <= 0 ? (
        <p>조회된 할 일이 없습니다</p>
      ) : (
        <ul>
          {todos.map((item) => {
            return (
              <li key={item.id}>
                {editTodoItem?.id !== item.id ? (
                  <TodoItem item={item} setEditTodoItem={setEditTodoItem} />
                ) : (
                  <TodoEditForm
                    editTodoItem={editTodoItem}
                    setEditTodoItem={setEditTodoItem}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

const TodoItem = (props: {
  item: TodoProps;
  setEditTodoItem: React.Dispatch<React.SetStateAction<TodoProps | null>>;
}) => {
  const { item, setEditTodoItem } = props;
  const { id, todo, isCompleted } = item;
  const { updateTodo, deleteTodo } = useTodo();

  return (
    <>
      <div className="flex justify-between">
        <label className="flex">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => {
              updateTodo({ ...item, isCompleted: !isCompleted });
            }}
            className="w-auto"
          />
          <p className="w-48 truncate">{todo}</p>
        </label>
        <div className="flex">
          <button
            data-testid="modify-button"
            onClick={() => {
              setEditTodoItem(item);
            }}
            className="w-12"
          >
            수정
          </button>
          <button
            onClick={() => deleteTodo({ id: id })}
            data-testid="delete-button"
            className="w-12"
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

const TodoEditForm = (props: {
  editTodoItem: TodoProps;
  setEditTodoItem: React.Dispatch<React.SetStateAction<TodoProps | null>>;
}) => {
  const { editTodoItem, setEditTodoItem } = props;
  const { value, setValue, onChange, onSubmitCallback } = useInput("");
  const { updateTodo } = useTodo();

  const handleSubmitEditTodo = onSubmitCallback(() => {
    if (!editTodoItem) throw new Error("no edit item");
    updateTodo({ ...editTodoItem, todo: value });
    setEditTodoItem(null);
  });

  useEffect(() => {
    setValue(editTodoItem ? editTodoItem.todo : "");
  }, [editTodoItem]);

  return (
    <form onSubmit={handleSubmitEditTodo}>
      <div className="flex justify-between">
        <input
          value={value}
          onChange={onChange}
          data-testid="modify-input"
          className={"w-full"}
        />
        <div className="flex">
          <button type="submit" className="w-12">
            제출
          </button>
          <button
            type="button"
            onClick={() => setEditTodoItem(null)}
            className="w-12"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
};
