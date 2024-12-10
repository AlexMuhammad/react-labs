import { FormEvent, useRef, useState } from "react";

const TodoListPage = () => {
  const [activity, setActivity] = useState<string>("");
  const [todos, setTodos] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Record<any, any>>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  function addActivityHandler(e: FormEvent) {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      {
        id: +new Date(),
        activity,
      },
    ]);
    setActivity("");
    inputRef.current?.focus();
  }

  function deleteActivityHandler(todoId: number) {
    setTodos((prev) => prev.filter((item) => item.id !== todoId));
  }

  function editActivityHandler(e: FormEvent) {
    e.preventDefault();
    const newData = {
      id: editTodo.id,
      activity,
    };
    const updatedIndex = todos.findIndex((todo) => todo.id === newData.id);
    if (updatedIndex !== -1) {
      const updatedData = [...todos];
      updatedData[updatedIndex] = newData;
      setTodos(updatedData);
      inputRef.current?.focus();
      cancelInputHandler();
    }
  }

  function cancelInputHandler() {
    setIsEdit(false);
    setActivity("");
    setEditTodo({});
  }

  return (
    <div>
      <form onSubmit={isEdit ? editActivityHandler : addActivityHandler}>
        <input
          ref={inputRef}
          type="text"
          name="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button>{isEdit ? "Simpan Perubahan Data" : "Simpan Data"}</button>
        {isEdit && (
          <button onClick={cancelInputHandler}>Batal Edit Data</button>
        )}
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.activity}{" "}
            <button onClick={() => deleteActivityHandler(todo.id)}>
              Hapus
            </button>
            <button
              onClick={() => {
                setIsEdit(true);
                setEditTodo(todo);
                setActivity(todo.activity);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListPage;
