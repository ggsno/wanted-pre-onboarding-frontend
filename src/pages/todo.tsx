import { useState, useEffect } from "react";
import { TodoProps, useTodo } from "../context/todo";
import useInput from "../hooks/useInput";

export default function TodoPage() {
  const { todos, createTodo, updateTodo, deleteTodo } = useTodo();
  const {
    input: newTodo,
    onChange: onChangeNewTodo,
    onSubmitCallback: onSubmitCallbackNewTodo,
  } = useInput("");

  const [editTodoItem, setEditTodoItem] = useState<TodoProps | null>(null);

  const {
    input: editTodoInput,
    setInput: setEditTodoInput,
    onChange: onChangeEditTodo,
    onSubmitCallback: onSubmitCallbackEditTodo,
  } = useInput("");

  const handleSubmitCreateTodo = onSubmitCallbackNewTodo(() => {
    createTodo({ todo: newTodo });
  });

  const handleSubmitEditTodo = onSubmitCallbackEditTodo(() => {
    if (!editTodoItem) throw new Error("no edit item");
    updateTodo({ ...editTodoItem, todo: editTodoInput });
    setEditTodoItem(null);
  });

  useEffect(() => {
    setEditTodoInput(editTodoItem ? editTodoItem.todo : "");
  }, [editTodoItem]);

  return (
    <>
      <form onSubmit={handleSubmitCreateTodo}>
        <input
          value={newTodo}
          onChange={onChangeNewTodo}
          data-testid="new-todo-input"
        />
        <button type="submit" data-testid="new-todo-add-button">
          추가
        </button>
      </form>
      {todos.length <= 0 ? (
        <p>all done !!!</p>
      ) : (
        todos.map((item) => {
          const { id, todo, isCompleted } = item;
          return (
            <li key={id}>
              {editTodoItem?.id !== id ? (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => {
                        updateTodo({ ...item, isCompleted: !isCompleted });
                      }}
                    />
                    <span>{todo}</span>
                  </label>
                  <button
                    data-testid="modify-button"
                    onClick={() => {
                      setEditTodoItem(item);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => deleteTodo({ id: id })}
                    data-testid="delete-button"
                  >
                    삭제
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmitEditTodo}>
                  <input
                    value={editTodoInput}
                    onChange={onChangeEditTodo}
                    data-testid="modify-input"
                  />
                  <button type="submit">제출</button>
                  <button type="button" onClick={() => setEditTodoItem(null)}>
                    취소
                  </button>
                </form>
              )}
            </li>
          );
        })
      )}
    </>
  );
}
