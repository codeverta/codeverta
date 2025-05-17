import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import Link from "next/link";

interface PropsI {
  open: boolean;
  handleClose: (event?: any) => void;
  anchorEl: HTMLElement | null;
}

export default function MuiMenu(props: PropsI) {
  const router = useRouter();
  const handleClose = () => {
    props.handleClose();
  };

  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Menu
        id="appbar-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "appbar-button",
        }}
      >
        <Link href={router.pathname + "/profile"}>
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href={router.pathname + "/admin/notifications"}>
          <MenuItem>Notification</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
