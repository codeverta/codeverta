import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface PropsI {
  open: boolean;
  handleClose: () => void;
  handleAction: ({ action }: { action: "cancel" | "agree" }) => void;
  children: React.ReactNode;
  title: React.ReactNode;
}

export default function AlertDialog(props: PropsI) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleAction({ action: "cancel" })}>
            Batalkan
          </Button>
          <Button
            onClick={() => props.handleAction({ action: "agree" })}
            autoFocus
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
