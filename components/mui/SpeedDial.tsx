import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter } from "next/router";

const actions = [
  {
    icon: <CategoryIcon />,
    name: "Tambah Kategori",
    to: "/admin/categories/create",
  },
  {
    icon: <InventoryIcon />,
    name: "Tambah Produk",
    to: "/admin/products/create",
  },
  { icon: <GroupIcon />, name: "Tambah User", to: "/admin/users/create" },
  {
    icon: <ReceiptIcon />,
    name: "Tambah Penjualan",
    to: "/admin/orders/create",
  },
];

export default function SpeedDialTooltipOpen() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleRedirect = (to: string) => {
    router.push(to);
  };

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: "10%", right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        classes={{
          fab: "bg-blue-500",
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            classes={{
              staticTooltipLabel: "text-xs w-max",
            }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleRedirect(action.to)}
            className="bg-white text-xs"
          />
        ))}
      </SpeedDial>
    </>
  );
}
