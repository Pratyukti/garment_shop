import React, { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import {
  Container,
  Grid,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  TextField,
} from '@mui/material';

const SaleReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saleType, setSaleType] = useState('Retail');
  const [salesData, setSalesData] = useState([]);

  // Example sales data with Date objects
  const exampleSales = [
    { date: new Date('2023-09-10'), type: 'Retail', category: 'Electronics', amount: 1000, quantity: 5 },
    { date: new Date('2023-09-11'), type: 'Bulk', category: 'Furniture', amount: 5000, quantity: 10 },
    { date: new Date('2023-09-12'), type: 'Retail', category: 'Clothing', amount: 1200, quantity: 7 },
    // Add more data...
  ];

  // Ensure that exampleSales is defined before filtering
  const filterSalesData = () => {
    if (exampleSales && exampleSales.length > 0) {
      const filteredData = exampleSales.filter((sale) => {
        const saleDate = new Date(sale.date);
        return (
          (!startDate || saleDate >= new Date(startDate)) &&
          (!endDate || saleDate <= new Date(endDate)) &&
          sale.type === saleType
        );
      });

      // Set filtered data
      setSalesData(filteredData);
    } else {
      setSalesData([]); // Handle case when exampleSales is empty or undefined
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 20, 20);
    salesData.forEach((sale, index) => {
      doc.text(
        `${sale.date.toLocaleDateString()}: ${sale.category} - $${sale.amount} - Qty: ${sale.quantity}`,
        20,
        30 + index * 10
      );
    });
    doc.save('sales-report.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      salesData.map((sale) => ({
        Date: sale.date.toLocaleDateString(),
        Type: sale.type,
        Category: sale.category,
        Amount: sale.amount,
        Quantity: sale.quantity,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Report');
    XLSX.writeFile(workbook, 'sales-report.xlsx');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Sale Report
      </Typography>

      <Paper elevation={3} style={{ padding: '16px', marginBottom: '24px' }}>
        <Grid container spacing={3}>
          {/* Start Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          {/* End Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              margin="normal"
              required
            />
          </Grid>

          {/* Sale Type Filter */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Sale Type</InputLabel>
              <Select value={saleType} onChange={(e) => setSaleType(e.target.value)}>
                <MenuItem value="Retail">Retail</MenuItem>
                <MenuItem value="Bulk">Bulk</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Filter Button */}
          <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Button fullWidth variant="contained" color="primary" onClick={filterSalesData}>
              Filter Sales
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Filtered Sales Data Table */}
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Filtered Sales Data
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Item Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.length > 0 ? (
              salesData.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>{sale.date.toLocaleDateString()}</TableCell>
                  <TableCell>{sale.type}</TableCell>
                  <TableCell>{sale.category}</TableCell>
                  <TableCell>${sale.amount}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No sales data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Export Buttons */}
      <Grid container spacing={3} style={{ marginTop: '24px' }}>
        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="contained" color="secondary" onClick={exportToPDF}>
            Export to PDF
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="contained" color="secondary" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SaleReport;
