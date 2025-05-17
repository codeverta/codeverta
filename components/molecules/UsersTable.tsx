import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { isError, useMutation, useQuery } from "@tanstack/react-query";
import api from "utils/api";
import { Backdrop, Switch } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import EnhancedTableToolbar from "components/mui/EnhancedTableToolbar";
import EnhancedTableHead from "components/mui/EnhancedTableHead";
import { HeadCell } from "components/mui/EnhancedTableHead";
import { toCurrency } from "utils";
import EmptyData from "./EmptyData";
import AlertDialog from "./AlertDialog";
import DangerousIcon from "@mui/icons-material/Dangerous";
import dayjs from "dayjs";

type Order = "asc" | "desc";

const headCells: HeadCell[] = [
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
    classes: {
      root: "w-auto truncate",
    },
  },
];

const userParams = {
  "page[size]": 10,
  "page[number]": 1,
};

export default function UsersTable() {
  const router = useRouter();
  const [query, setQuery] = React.useState({
    users: userParams,
  });
  const [state, setState] = React.useState({
    isAlertOpen: false,
  });
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [listActive, setListActive] = React.useState<string[]>([]);
  const getUsers = useQuery({
    queryKey: ["users", query.users["page[number]"], query.users["page[size]"]],
    queryFn: () => {
      return api.get("users", query.users);
    },
    onSuccess: (res) => {
      setListActive(
        res.data.data
          .filter((it: any) => it.attributes.is_active)
          .map((it: any) => it.id)
      );
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const updateUsers = useMutation({
    mutationKey: ["users", "update"],
    mutationFn: (payload: any) => {
      return api.patch(`users/${payload.data.id}`, payload);
    },
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (getUsers.isLoading || getUsers.isError) {
      return;
    }
    if (selected.length == getUsers.data.data.data.length) {
      setSelected([]);
    } else if (selected.length > 0) {
      setSelected(getUsers.data.data.data.map((it: any) => it.id));
    } else {
      setSelected(getUsers.data.data.data.map((it: any) => it.id));
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    // kalo row blm di select, select
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      // kalo yg diselect item pertama
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      // kalo yg diselect item terakhir
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      // kalo yg diselect item diantara item pertama & terakhir
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleEdit = () => {
    router.push(`users/create?id=${selected[0]}`);
  };

  const handleAlertAction = async ({
    action,
  }: {
    action: "agree" | "cancel";
  }) => {
    if (action == "agree") {
      const batchDelete = selected.map((it: string) => {
        const payload = {
          data: {
            type: "users",
            id: it,
            attributes: {
              deletedAt: dayjs().toISOString(),
            },
          },
        };
        return api.patch(`users/${it}`, payload);
      });
      await Promise.all(batchDelete);
      getUsers.refetch();
      setSelected([]);
    }
    setState({ ...state, isAlertOpen: false });
  };

  const handleDeleteDialog = () => {
    setState({ ...state, isAlertOpen: !state.isAlertOpen });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setQuery({
      ...query,
      users: { ...query.users, "page[number]": newPage + 1 },
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery({
      ...query,
      users: {
        ...query.users,
        "page[size]": parseInt(event.target.value),
      },
    });
  };

  const handleRowClick = ({ order }: any) => {
    router.push(`/admin/users/${order.id}`);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const isUserActive = (id: string) => listActive.includes(id);

  const handleSwitch = async (user: any) => {
    const payload = {
      data: {
        type: "users",
        id: user.id,
        attributes: {
          is_active: !user.attributes.is_active,
        },
      },
    };
    await updateUsers.mutate(payload);
    if (!listActive.includes(user.id)) {
      setListActive([...listActive, user.id]);
    } else {
      setListActive(listActive.filter((it) => it !== user.id));
    }
  };

  if (getUsers.isError || getUsers.isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (getUsers.data.data.data.length == 0) {
    return <EmptyData />;
  }
  return (
    <div>
      <AlertDialog
        title={
          <span className="flex items-center gap-2">
            <DangerousIcon color="warning" />
            Peringatan
          </span>
        }
        open={state.isAlertOpen}
        handleClose={handleDeleteDialog}
        handleAction={handleAlertAction}
      >
        <span>Pengguna yang telah dihapus tidak dapat dikembalikan</span>
      </AlertDialog>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            title="Pengguna"
            handleEdit={handleEdit}
            handleDelete={handleDeleteDialog}
            numSelected={selected.length}
          />
          <TableContainer>
            <Table className="" aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={"name"}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={getUsers.data.data.data.length}
                headCells={headCells}
              />
              <TableBody>
                {getUsers.data.data.data.map((row: any, index: number) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `{row.id}`;
                  const isActive = isUserActive(row.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      onClick={() => handleRowClick({ order: row })}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClick(event, row.id);
                        }}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          color="primary"
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.attributes.email}</TableCell>
                      <TableCell
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwitch(row);
                        }}
                      >
                        <Switch checked={isActive} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={getUsers.data.data.meta.page.total ?? -1}
            rowsPerPage={query.users["page[size]"]}
            page={getUsers.data.data.meta.page.currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
