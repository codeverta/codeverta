import React, { useState } from "react";
import Layout from "components/layout/Landing";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

// Helper function to format IDR
const formatIDR = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

interface InvoiceData {
  invoiceNumber: string;
  date: string; // ISO date string
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: Item[];
  shippingCost: number;
  discount: number;
  discountType: "percentage" | "fixed";
  notes: string;
}

interface Item {
  description: string;
  quantity: number;
  price: number;
}

const InvoiceApp = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    shippingCost: 0,
    discount: 0,
    discountType: "percentage",
    notes: "",
  });

  const calculateSubtotal = () => {
    return invoiceData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (invoiceData.discountType === "percentage") {
      return (subtotal * invoiceData.discount) / 100;
    }
    return invoiceData.discount;
  };

  const calculateTotal = () => {
    return (
      calculateSubtotal() -
      calculateDiscount() +
      Number(invoiceData.shippingCost)
    );
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Container
        sx={{ "@media print": { display: "none" }, py: 4 }}
        maxWidth="lg"
      >
        <Paper
          elevation={3}
          sx={{ p: 4, "@media print": { boxShadow: "none" } }}
        >
          {/* Header */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6}>
              <Typography variant="h4" gutterBottom>
                Invoice
              </Typography>
              <TextField
                label="Invoice #"
                value={invoiceData.invoiceNumber}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    invoiceNumber: e.target.value,
                  })
                }
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <TextField
                  label="Date"
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, date: e.target.value })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Due Date"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, dueDate: e.target.value })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
            </Grid>
          </Grid>

          {/* Customer Details */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Customer Name"
                  value={invoiceData.customerName}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      customerName: e.target.value,
                    })
                  }
                  fullWidth
                />
                {/* <TextField
                  label="Customer Email"
                  type="text"
                  value={invoiceData.customerEmail}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      customerEmail: e.target.value,
                    })
                  }
                  fullWidth
                /> */}
                <TextField
                  label="Customer Address"
                  multiline
                  rows={3}
                  value={invoiceData.customerAddress}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      customerAddress: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Stack>
            </Grid>
          </Grid>

          {/* Items Table */}
          <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell align="right">Jumlah</TableCell>
                  <TableCell align="right">Harga (IDR)</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell
                    sx={{ "@media print": { display: "none" } }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        fullWidth
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                        size="small"
                        inputProps={{ min: 1 }}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                        size="small"
                        inputProps={{ min: 0 }}
                        sx={{ width: 150 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {formatIDR(item.quantity * item.price)}
                    </TableCell>
                    <TableCell sx={{ "@media print": { display: "none" } }}>
                      <IconButton
                        onClick={() => removeItem(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            startIcon={<AddIcon />}
            onClick={addItem}
            sx={{ mb: 4, "@media print": { display: "none" } }}
          >
            Add Item
          </Button>

          {/* Totals */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subtotal:</Typography>
                <Typography>{formatIDR(calculateSubtotal())}</Typography>
              </Box>

              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    type="number"
                    label="Discount"
                    value={invoiceData.discount}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        discount: parseFloat(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    value={invoiceData.discountType}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        discountType: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="percentage">%</MenuItem>
                    <MenuItem value="fixed">IDR</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Discount:</Typography>
                <Typography>-{formatIDR(calculateDiscount())}</Typography>
              </Box>

              <TextField
                type="number"
                label="Ongkir"
                value={invoiceData.shippingCost}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    shippingCost: parseFloat(e.target.value),
                  })
                }
                size="small"
                fullWidth
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: 1,
                  pt: 2,
                }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  {formatIDR(calculateTotal())}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Notes */}
          <TextField
            label="Notes"
            multiline
            rows={3}
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, notes: e.target.value })
            }
            fullWidth
            sx={{ mb: 4 }}
          />

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              "@media print": { display: "none" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className="bg-gray-500"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print Invoice
            </Button>
          </Box>
        </Paper>
      </Container>
      <Container
        sx={{
          "@media print": { display: "block" },
          display: "none",
        }}
      >
        <Invoice calculateTotal={calculateTotal} invoiceData={invoiceData} />
      </Container>
    </>
  );
};

const Invoice = ({
  invoiceData,
  calculateTotal,
}: {
  invoiceData: InvoiceData;
  calculateTotal: () => number;
}) => {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "auto",
      border: "1px solid #ccc",
      padding: "20px",
      background: "#fff",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#333",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    details: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    detailsSection: {
      width: "48%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    th: {
      background: "#f4f4f4",
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    totals: {
      marginTop: "20px",
    },
    totalsRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
    },
    notes: {
      marginTop: "20px",
      fontSize: "12px",
      color: "#666",
    },
  };

  // Calculate subtotal
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Get discount and shipping cost with default values
  const discount = invoiceData.discount || 0;
  const shippingCost = invoiceData.shippingCost || 0;

  // Calculate total
  const total = subtotal - discount + shippingCost;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Invoice</h1>
      </div>
      <div style={styles.details}>
        <div style={styles.detailsSection}>
          <p>
            <strong>Invoice #:</strong> {invoiceData.invoiceNumber}
          </p>
          <p>
            <strong>Date:</strong> {invoiceData.date}
          </p>
          <p>
            <strong>Due Date:</strong> {invoiceData.dueDate}
          </p>
        </div>
        <div style={styles.detailsSection}>
          <p>
            <strong>Customer Name:</strong> {invoiceData.customerName}
          </p>
          <p>
            <strong>Customer Address:</strong> {invoiceData.customerAddress}
          </p>
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Deskripsi</th>
            <th style={styles.th}>Jumlah</th>
            <th style={styles.th}>Harga (IDR)</th>
            <th style={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item: Item, index: number) => (
            <tr key={index}>
              <td style={styles.td}>{item.description}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>Rp {item.price.toLocaleString()}</td>
              <td style={styles.td}>
                Rp {(item.price * item.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.totals}>
        <div style={styles.totalsRow}>
          <span>
            <strong>Subtotal:</strong>
          </span>
          <span>Rp {subtotal.toLocaleString()}</span>
        </div>
        <div style={styles.totalsRow}>
          <span>
            <strong>Discount:</strong>
          </span>
          <span>
            -
            {invoiceData.discountType == "percentage"
              ? discount.toLocaleString() + "%"
              : "RP " + discount.toLocaleString()}
          </span>
        </div>
        <div style={styles.totalsRow}>
          <span>
            <strong>Shipping Cost:</strong>
          </span>
          <span>Rp {shippingCost.toLocaleString()}</span>
        </div>
        <div style={styles.totalsRow}>
          <span>
            <strong>Total:</strong>
          </span>
          <span>
            <strong>Rp {calculateTotal()}</strong>
          </span>
        </div>
      </div>
      <div style={styles.notes}>
        <p>
          <strong>Notes:</strong>
        </p>
        <p>{invoiceData.notes}</p>
      </div>
    </div>
  );
};

InvoiceApp.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default InvoiceApp;
