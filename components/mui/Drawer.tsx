import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import { Dashboard } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useGetFetchQuery } from "utils/hooks";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useRouter } from "next/router";
import CategoryIcon from "@mui/icons-material/Category";

type Anchor = "top" | "left" | "bottom" | "right";

interface PropsI {
  handleDrawer: any;
  open: boolean;
}

const adminList = [
  {
    to: "/admin",
    icon: <HomeIcon />,
    label: "Penjualan",
  },
  {
    to: "/admin/products",
    icon: <InventoryIcon />,
    label: "Produk",
  },
  {
    to: "/admin/users",
    icon: <GroupIcon />,
    label: "Pengguna",
  },
  {
    to: "/admin/notifications",
    icon: <NotificationsIcon />,
    label: "Notifikasi",
  },
  {
    to: "/admin/pembelian",
    icon: <ShoppingCartIcon />,
    label: "Pembelian",
  },
  {
    to: "/admin/profile",
    icon: <AccountCircleIcon />,
    label: "Profile",
  },
];

const buyerList = [
  {
    to: "/store",
    icon: <HomeIcon />,
    label: "Home",
  },
  {
    to: "/store/orders",
    icon: <ReceiptIcon />,
    label: "Transaksi",
  },
  {
    to: "/store/cart",
    icon: <ShoppingCartIcon />,
    label: "Keranjang",
  },
  {
    to: "/store/profile",
    icon: <AccountCircleIcon />,
    label: "Profile",
  },
];

export default function AppDrawer(props: PropsI) {
  const router = useRouter();
  const [state, setState] = React.useState({
    left: false,
  });
  const [routeList, setRouteList] = React.useState(buyerList);
  const getSelf: any = useGetFetchQuery(["self"]);

  useEffect(() => {
    setRouteList(
      getSelf?.data.roles.includes("merchant") ? adminList : buyerList
    );
  }, [getSelf]);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        {routeList.map((route, index) => (
          <ListItem key={route.to} disablePadding>
            <ListItemButton onClick={() => router.push(route.to)}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={() => (window.location.href = "/dashboard")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Drawer anchor={"left"} open={props.open} onClose={props.handleDrawer}>
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
