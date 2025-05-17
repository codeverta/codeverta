import { Toolbar, Typography, Tooltip, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  editable?: boolean;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleFilter?: () => void;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, title, editable = true } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected == 1 && editable && (
        <Tooltip title="Edit" onClick={props.handleEdit}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={props.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={props.handleFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
