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
import { isError, useQuery } from "@tanstack/react-query";
import api from "utils/api";
import { Backdrop } from "@mui/material";
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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nama Produk",
    classes: {
      root: "w-auto truncate",
    },
  },
  {
    id: "harga",
    numeric: true,
    disablePadding: false,
    label: "Harga",
    classes: {
      root: "pr-0 text-right",
    },
  },
];

const productsParams = {
  "page[size]": 10,
  "page[number]": 1,
  include: "product-categories",
};

export default function ProductsTable() {
  const router = useRouter();
  const [query, setQuery] = React.useState({
    products: productsParams,
  });
  const [state, setState] = React.useState({
    isAlertOpen: false,
  });
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const getProducts = useQuery({
    queryKey: [
      "products",
      query.products["page[number]"],
      query.products["page[size]"],
    ],
    queryFn: () => {
      return api.get("products", query.products);
    },
    keepPreviousData: true,
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
    if (getProducts.isLoading || getProducts.isError) {
      return;
    }
    if (selected.length == getProducts.data.data.data.length) {
      setSelected([]);
    } else if (selected.length > 0) {
      setSelected(getProducts.data.data.data.map((it: any) => it.id));
    } else {
      setSelected(getProducts.data.data.data.map((it: any) => it.id));
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
    router.push(`products/create?id=${selected[0]}`);
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
            type: "products",
            id: it,
            attributes: {
              deletedAt: dayjs().toISOString(),
            },
          },
        };
        return api.patch(`products/${it}`, payload);
      });
      await Promise.all(batchDelete);
      getProducts.refetch();
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
      products: { ...query.products, "page[number]": newPage + 1 },
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery({
      ...query,
      products: {
        ...query.products,
        "page[size]": parseInt(event.target.value),
      },
    });
  };

  const handleRowClick = ({ order }: any) => {
    router.push(`/admin/products/${order.id}`);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  if (getProducts.isError || getProducts.isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (getProducts.data.data.data.length == 0) {
    return <EmptyData />;
  }
  return (
    <div className="pb-16">
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
        <span>Produk yang telah dihapus tidak dapat dikembalikan</span>
      </AlertDialog>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            title="Produk"
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
                rowCount={getProducts.data.data.data.length}
                headCells={headCells}
                className="dark:text-white text-black"
              />
              <TableBody>
                {getProducts.data.data.data.map((row: any, index: number) => {
                  const isItemSelected = isSelected(row.id);
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
                      <TableCell className="px-0 text-sm">
                        {row.attributes.name} ({row.attributes.code})
                        <br />
                        <span className="text-xs text-gray-400">
                          Diupdate pada{" "}
                          {dayjs(row.attributes.updatedAt).format("LL LT")}
                        </span>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className="text-right"
                      >
                        {toCurrency(row.attributes.price)}
                      </TableCell>
                      <TableCell align="right">
                        {/* <Chip
                          label={getOrderStatus(row).text}
                          color={getOrderStatus(row).color}
                        /> */}
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
            count={getProducts.data.data.meta.page.total ?? -1}
            rowsPerPage={query.products["page[size]"]}
            page={getProducts.data.data.meta.page.currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
