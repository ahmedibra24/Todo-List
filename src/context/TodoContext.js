import { createContext , useReducer ,useContext } from "react";
import TodoReducer from "../reducers/TodoReducer";

export const TodosContext = createContext([])
export const dispatchContext = createContext(null)



const TodoProvider = ({children})=>{
    const [todos,dispatch]= useReducer (TodoReducer,[])

    return(

    <TodosContext.Provider value={todos}>
        <dispatchContext.Provider value={dispatch}>
            {children}
        </dispatchContext.Provider>
    </TodosContext.Provider>
    )

}

export const useTodo = ()=>{
    return useContext(TodosContext)
}
export const useTodoDispatch = () => {
  return useContext(dispatchContext);
};



export default TodoProvider