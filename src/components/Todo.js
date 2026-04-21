import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { useTodo , useTodoDispatch } from "../context/TodoContext";


const Todo = ({ todo, openDeleteProp, openUpdateProp }) => {
    const todos = useTodo();
    const dispatch = useTodoDispatch()
    const { handleOpenToast } = useContext(ToastContext);


  function handleCheckAction() {

    dispatch({
      type: "check",
      payload: { todo: todo },
    });
    todos.map((t)=>{ 
          if (t.id ==todo.id) {
            if (t.isCompleted == false) {
              handleOpenToast("تم تغيير الحالة الى المنجزه");
            } else {
              handleOpenToast("تم تغيير الحالة الى غير المنجزه");
            }

            }

     })


  }

  const handleClickOpen = () => {
    openDeleteProp(todo);
  };

  const handleClickOpenUpdate = () => {
    openUpdateProp(todo);
  };

  return (
    <>
      <Card
        className="card"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={0}>
            <Grid size={8}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.description}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="buttonIcon"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={() => {
                  handleCheckAction();
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="buttonIcon"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={handleClickOpenUpdate}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              <IconButton
                className="buttonIcon"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleClickOpen}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
