import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { TableCellClasses } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  classes?: Partial<TableCellClasses>;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<any>) => void;
  order: any;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
  readOnly?: boolean;
  className?: string;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    headCells,
    readOnly,
    className,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" onClick={onSelectAllClick}>
          {!readOnly && (
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          )}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            classes={headCell.classes ? headCell.classes : undefined}
            className={className}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              // onClick={createSortHandler()}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
