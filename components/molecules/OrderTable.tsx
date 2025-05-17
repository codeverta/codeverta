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
import { useQuery } from "@tanstack/react-query";
import api from "utils/api";
import {
  Backdrop,
  Button,
  Chip,
  Dialog,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getOrderStatus } from "utils/orders";
import { useRouter } from "next/router";
import EnhancedTableToolbar from "components/mui/EnhancedTableToolbar";
import EnhancedTableHead from "components/mui/EnhancedTableHead";
import EmptyData from "./EmptyData";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTour } from "@reactour/tour";
import dayjs from "dayjs";

interface Data {
  "no-resi": string;
  code: string;
  destination: string;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data | "status";
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "no-resi",
    numeric: false,
    disablePadding: true,
    label: "Kode",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

const ordersParams = {
  "page[size]": 15,
  sort: "-createdAt",
  include: "destination-users",
};

export default function OrderTable({ title }: { title: string }) {
  const router = useRouter();
  const { setIsOpen } = useTour();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(1);
  const [state, setState] = React.useState({
    isModalFilterOpen: false,
    filter: {
      orderStatus: "",
    },
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const query = useQuery({
    queryKey: ["orders", page, state.filter.orderStatus],
    queryFn: () => {
      const params: any = {
        ...ordersParams,
        "page[number]": page,
      };

      state.filter.orderStatus
        ? (params[`filter[${state.filter.orderStatus}]`] = true)
        : null;
      return api.get("orders", params);
    },
  });

  React.useEffect(() => {
    const hasOnboarding = JSON.parse(
      localStorage.getItem("has_onboarding") || "{}"
    );
    if (!hasOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = ({ order }: any) => {
    router.push(`/admin/orders/${order.id}`);
  };

  const handleFilter = () =>
    setState({ ...state, isModalFilterOpen: !state.isModalFilterOpen });

  const handleChangeFilter = (event: SelectChangeEvent) =>
    setState({
      ...state,
      filter: { ...state.filter, orderStatus: event.target.value },
    });

  const handleEdit = () => {
    const orderId = query?.data?.data.data[0].id;
    router.push(`/admin/orders/${orderId}`);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  if (query.isError || query.isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (query.data.data.data?.length == 0) {
    return <EmptyData />;
  }
  return (
    <div className="pb-16">
      <Dialog
        onClose={() =>
          setState({ ...state, isModalFilterOpen: !state.isModalFilterOpen })
        }
        classes={{
          paper: "!w-72 !max-w-screen",
        }}
        open={state.isModalFilterOpen}
      >
        <List>
          <ListItem dense>
            <Typography>Filter</Typography>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Status Order
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.filter.orderStatus}
                label="Status Order"
                onChange={handleChangeFilter}
              >
                <MenuItem value={"is_received"}>Selesai</MenuItem>
                <MenuItem value={"is_shipped"}>Selesai Dikirim</MenuItem>
                <MenuItem value={"is_shipping"}>Dikirim</MenuItem>
                <MenuItem value={"is_validate_seller"}>
                  Terverifikasi Penjual
                </MenuItem>
                <MenuItem value={"is_validate_buyer"}>
                  Terverifikasi Pembeli
                </MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem className="flex gap-x-3">
            <DatePicker label="Dari" className="w-full" />
            <DatePicker label="Sampai" className="w-full" />
          </ListItem>
          <ListItem className="flex justify-end">
            <Button onClick={handleFilter}>Simpan</Button>
          </ListItem>
        </List>
      </Dialog>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            title={title}
            handleEdit={handleEdit}
            editable={false}
            numSelected={selected.length}
            handleFilter={handleFilter}
          />
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={query.data.data.data.length}
                headCells={headCells}
              />
              <TableBody>
                {query.data.data.data.map((row: any, index: number) => {
                  const isItemSelected = isSelected(row.attributes.code);
                  const labelId = `{row.id}`;

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
                          handleClick(event, row.attributes.code);
                        }}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className="second-step"
                      >
                        {row.attributes.code}
                        <p>{dayjs(row.attributes.createdAt).format("LL LT")}</p>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          className="third-step"
                          label={getOrderStatus(row).text}
                          color={getOrderStatus(row).color}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 15, 25]}
            component="div"
            count={query.data.data.meta.page.total ?? -1}
            rowsPerPage={rowsPerPage}
            page={query.data.data.meta.page.currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
