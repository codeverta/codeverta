import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import api from "utils/api";
import { useGetFetchQuery } from "utils/hooks";
import { toast } from "sonner";

export default function PasswordDialog(props: any) {
  const { open, handlePasswordDialog } = props;
  const getSelf: any = useGetFetchQuery(["self"]);
  const [state, setState] = React.useState({
    password: "",
    password_confirmation: "",
  });

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      data: {
        type: "users",
        id: getSelf.data.me.id + "",
        attributes: {
          password: state.password,
          password_confirmation: state.password_confirmation,
        },
      },
    };
    api.patch("users/" + payload.data.id, payload).then((res) => {
      res && toast.success("Password berhasil diubah");
    });
  };
  return (
    <div>
      <Dialog open={open} onClose={handlePasswordDialog} fullWidth>
        <DialogTitle>Ubah Password</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleChangePassword}
            className="flex flex-col py-4 gap-y-4"
          >
            <TextField
              fullWidth
              className="w-full"
              label="Password"
              placeholder="Masukkan Password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
              type="password"
            />
            <TextField
              fullWidth
              className="w-full"
              label="Konfirmasi Password"
              placeholder="Masukkan Konfirmasi Password"
              onChange={(e) =>
                setState({ ...state, password_confirmation: e.target.value })
              }
              type="password"
            />
            <span className="w-full flex justify-end">
              <Button type="submit">Simpan</Button>
            </span>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
