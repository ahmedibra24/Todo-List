import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ToastContext } from "./context/ToastContext";
import Toast from "./components/Toast";
import TodoProvider from "./context/TodoContext";

const theme = createTheme({
  typography: {
    fontFamily: ["marhey"],
    fontWeight: ["medium"],
  },
  palette: {
    primary: { main: "#01579b" },
  },
});

function App() {
  const [open, setOpen] = useState(false);
 const [toastMessage , setToastMessage] = useState("")


  function handleOpenToast(Message) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
    setToastMessage(Message);
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#191b1f",
          direction: "rtl",
        }}
      >
        <ToastContext.Provider value={{ handleOpenToast }}>
          <Toast open={open} Message={toastMessage} />
          <TodoProvider>
            <TodoList />
          </TodoProvider>
        </ToastContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
