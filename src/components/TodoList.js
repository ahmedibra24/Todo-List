import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useContext, useEffect, useMemo } from "react";
import { ToastContext } from "../context/ToastContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodo , useTodoDispatch } from "../context/TodoContext";


const TodoList = () => {
  const todos = useTodo();
  const dispatch = useTodoDispatch()
  const [addInput, setAddInput] = useState("");
  const { handleOpenToast } = useContext(ToastContext);
  const [displayButton, setDisplayButton] = useState("all");

  // dialog states
  const [todoClicked, setTodoClicked] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  // dialog functions
  const handleClickOpen = (todo) => {
    setTodoClicked(todo);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdate = (todo) => {
    setTodoClicked(todo);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };


  function handleConfirmDelete() {
    dispatch({ type: "delete", payload: { todoClicked: todoClicked } });
    handleClose();
    handleOpenToast("تم الحذف بنجاح");
  }
  function handleConfirmUpdate() {
    dispatch({ type: "update", payload: { todoClickedUpdate: todoClicked } });
    handleCloseUpdate();
    handleOpenToast("تم التعديل بنجاح")
  }

  // -------dialog functions-------

  function displayChange(e) {
    setDisplayButton(e.target.value);
  }

  const completedTodo = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodo = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let finalTodos = todos;

  if (displayButton === "completed") {
    finalTodos = completedTodo;
  } else if (displayButton === "not completed") {
    finalTodos = notCompletedTodo;
  }

  const todoShow = finalTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        openDeleteProp={handleClickOpen}
        openUpdateProp={handleClickOpenUpdate}
      />
    );
  });

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function handleAddButton() {
    dispatch({type:"add",payload : {newTitle:addInput}})
    setAddInput("");
    handleOpenToast("تمت الإضافة بنجاح")
  }

  return (
    <>
      {/* delete */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"  هل انت متأكد من رغبتك في خذف المهمة ؟ "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* update */}
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">{"  تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="تعديل المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={todoClicked.title}
              onChange={(e) => {
                setTodoClicked({
                  ...todoClicked,
                  title: e.target.value,
                });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="تعديل تفاصيل المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={todoClicked.description}
              onChange={(e) => {
                setTodoClicked({
                  ...todoClicked,
                  description: e.target.value,
                });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>إغلاق</Button>
          <Button onClick={handleConfirmUpdate} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {/* head */}
            <Typography variant="h2">مهامي</Typography>
            <Divider />
            {/* maun buttons */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px", color: "primary" }}
              value={displayButton}
              exclusive
              onChange={displayChange}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="not completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* tasks */}
            <div style={{ overflow: "auto", maxHeight: "55vh" }}>
              {todoShow}
            </div>
            {/* add text field + button */}
            <Grid container spacing={2} style={{ marginTop: "30px" }}>
              <Grid size={8}>
                <TextField
                  id="outlined-basic"
                  label="إضافة مهمة"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={addInput}
                  onChange={(e) => {
                    setAddInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={handleAddButton}
                  disabled={addInput.length === 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default TodoList;
