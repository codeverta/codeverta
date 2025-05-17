import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { useQuery } from "@tanstack/react-query";
import api from "utils/api";
import { Backdrop, Skeleton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { HeadCell } from "components/mui/EnhancedTableHead";
import { toCurrency } from "utils";
import EmptyData from "../EmptyData";

type Order = "asc" | "desc";

const headCells: HeadCell[] = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "No",
    classes: {
      root: "w-auto truncate",
    },
  },
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
  include: "product-categories,documents",
};

// Skeleton component for loading state
const ProductTableSkeleton = () => {
  return (
    <div className="max-w-4xl">
      <TableContainer className="!dark:bg-gray-900">
        <Table aria-labelledby="tableTitle">
          <thead>
            <tr>
              {headCells.map((headCell) => (
                <th
                  key={headCell.id}
                  className={`${
                    headCell.numeric ? "text-right" : "text-left"
                  } dark:text-white text-black ${
                    headCell.classes?.root || ""
                  } ${headCell.disablePadding ? "py-2" : "py-4"}`}
                >
                  {headCell.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr key={index}>
                <td className="py-2 dark:text-white text-black">
                  <Skeleton variant="text" width={20} />
                </td>
                <td className="px-0 dark:text-white text-black">
                  <Skeleton variant="text" width={150} />
                </td>
                <td className="text-right dark:text-white text-black">
                  <Skeleton
                    variant="text"
                    width={80}
                    style={{ marginLeft: "auto" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        classes={{
          root: "!dark:text-white",
        }}
        component="div"
        count={0}
        rowsPerPage={10}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </div>
  );
};

export default function ProductsTable({ handleRowClick }: any) {
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
      "productsAll",
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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Display skeleton loading component when loading
  if (getProducts.isLoading) {
    return <ProductTableSkeleton />;
  }

  if (getProducts.isError) {
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
    <div className="max-w-4xl">
      <TableContainer className="!dark:bg-gray-900">
        <Table aria-labelledby="tableTitle">
          <thead>
            <tr>
              {headCells.map((headCell) => (
                <th
                  key={headCell.id}
                  className={`${
                    headCell.numeric ? "text-right" : "text-left"
                  } dark:text-white text-black ${
                    headCell.classes?.root || ""
                  } ${headCell.disablePadding ? "py-2" : "py-4"}`}
                >
                  {headCell.label}
                </th>
              ))}
            </tr>
          </thead>
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
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell
                    padding="checkbox"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClick(event, row.id);
                    }}
                    className="dark:text-white text-black"
                  >
                    <span className="dark:text-white">
                      {getProducts.data.data.meta.page.from + index}
                    </span>
                  </TableCell>
                  <TableCell className="px-0 !dark:text-white">
                    <span className="dark:text-white">
                      {row.attributes.name}
                    </span>
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    className="text-right !dark:text-white"
                  >
                    <span className="dark:text-white">
                      {toCurrency(row.attributes.price)}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        classes={{
          root: "!dark:text-white",
        }}
        component="div"
        count={getProducts.data.data.meta.page.total ?? -1}
        rowsPerPage={query.products["page[size]"]}
        page={getProducts.data.data.meta.page.currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
