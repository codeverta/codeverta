import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchInput({ label = "Input", ...others }: any) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      classes={{
        inputFocused: "!ring-0",
      }}
      sx={{ width: 300 }}
      isOptionEqualToValue={(option: any, value: any) =>
        option.value === value.value
      }
      renderInput={(params) => <TextField {...params} label={label} />}
      {...others}
    />
  );
}
