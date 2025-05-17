import React, { useState } from "react";
import {
  TextField,
  List,
  ListItemText,
  Paper,
  IconButton,
  Box,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const SearchPage = ({ onClose }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(true);
  const router = useRouter();

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
      onClose();
    }
  };

  const handleCloseOverlay = () => {
    setShowResults(false);
    setSearchTerm("");
    onClose();
  };

  const list = [
    {
      label: "Dashboard",
      to: "/admin",
    },
    {
      label: "Produk",
      to: "/admin/products",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {showResults && (
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "2px 4px",
            marginBottom: "8px",
            position: "relative",
            zIndex: 1300,
          }}
        >
          <TextField
            variant="standard"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <IconButton sx={{ p: "10px" }}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            fullWidth
          />
        </Paper>
      )}

      {showResults && (
        <>
          {/* Overlay */}
          <Box
            onClick={handleCloseOverlay}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
              zIndex: 1200, // Just below the Paper component
            }}
          />

          {/* Search Results */}
          <Paper
            sx={{
              position: "relative",
              zIndex: 1300, // Ensure it's above the overlay
            }}
          >
            <List>
              {list
                .filter((it) =>
                  it.label
                    .toLocaleLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                )
                .map((it) => (
                  <ListItemButton onClick={() => router.push(it.to)}>
                    <ListItemText primary={it.label} />
                  </ListItemButton>
                ))}
            </List>
          </Paper>
        </>
      )}
    </div>
  );
};

export default SearchPage;
