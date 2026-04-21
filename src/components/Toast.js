import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Toast({ open, Message }) {
  return (
    <div>
      <Snackbar open={open}>
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            background: Message === "تم الحذف بنجاح" ? "#b23c17" : "green",
          }}
        >
          {Message}
        </Alert>
      </Snackbar>
    </div>
  );
}
