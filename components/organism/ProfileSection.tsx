import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { Avatar, Chip } from "@mui/material";
import { useGetFetchQuery } from "utils/hooks";
import PasswordIcon from "@mui/icons-material/Password";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import PasswordDialog from "components/molecules/PasswordDialog";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function ProfileSection() {
  const router = useRouter();
  const [state, setState] = React.useState({
    isPasswordDialogOpen: false,
  });
  const getSelf: any = useGetFetchQuery(["self"]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!getSelf) {
    return <p>Error encountered</p>;
  }

  const handlePasswordDialog = () => {
    setState({ ...state, isPasswordDialogOpen: !state.isPasswordDialogOpen });
  };

  return (
    <>
      <PasswordDialog
        handlePasswordDialog={handlePasswordDialog}
        open={state.isPasswordDialogOpen}
      />
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt=""
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <Avatar
                sx={{ bgcolor: stringToColor(getSelf.data.me.name) }}
                className="!h-24 !w-24 rounded-full ring-4 ring-white !sm:h-32 !sm:w-32"
              >
                {getSelf.data.me.name[0]}
              </Avatar>
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {getSelf.data.me.name}
                </h1>
              </div>
              <div className="justify-stretch capitalize mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                {/* <Chip color="primary" label={getSelf.data.roles[0]} /> */}
                <button
                  onClick={handlePasswordDialog}
                  type="button"
                  className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PasswordIcon className="w-4" />
                  Edit Password
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 relative right-2 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {getSelf.data.me.name}{" "}
              <span className="text-sm font-light">
                {getSelf.data.me.email}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="button">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Pengaturan" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="button">
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Tentang Aplikasi" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="button">
                <ListItemIcon>
                  <AnnouncementIcon />
                </ListItemIcon>
                <ListItemText primary="Kritik dan Saran" />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={handleLogout} disablePadding>
              <ListItemButton component="button">
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </>
  );
}
