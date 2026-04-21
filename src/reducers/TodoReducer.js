import { v4 as uuidv4 } from "uuid";

export default function TodoReducer(currentTodo, action) {
  switch (action.type) {
    case "add": {
      const addedItems = {
        id: uuidv4(),
        title: action.payload.newTitle,
        description: "",
        isCompleted: false,
      };
      const updatedTodo = [...currentTodo, addedItems];
      localStorage.setItem("todoItems", JSON.stringify(updatedTodo));

      return updatedTodo;
    }
    case "delete": {
      const notDeletedTodos = currentTodo.filter((t) => {
        return t.id !== action.payload.todoClicked.id;
      });
      localStorage.setItem("todoItems", JSON.stringify(notDeletedTodos));

      return notDeletedTodos;
    }
    case "update": {
      const editedTodo = currentTodo.map((t) => {
        if (t.id == action.payload.todoClickedUpdate.id) {
          let newTodo = {
            ...t,
            title: action.payload.todoClickedUpdate.title,
            description: action.payload.todoClickedUpdate.description,
          };
          return newTodo;
        } else {
          return t;
        }
      });
      localStorage.setItem("todoItems", JSON.stringify(editedTodo));

      return editedTodo;
    }
    case "get": {
      const todosFromStorgae =
        JSON.parse(localStorage.getItem("todoItems")) ?? [];

      return todosFromStorgae;
    }

    case "check": {
      const updatedTodo = currentTodo.map((t) => {
        if (t.id == action.payload.todo.id) {
          const updatedT = { ...t, isCompleted: !t.isCompleted };
          
          return updatedT;
        }
        return t;
      });
      localStorage.setItem("todoItems", JSON.stringify(updatedTodo));

      return updatedTodo;
    }

    default: {
      throw Error("UnKnowen action" + action.type);
    }
  }
}
