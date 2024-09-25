import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const StockReport = () => {
  const [filterTerm, setFilterTerm] = useState('');
  const [reportData, setReportData] = useState([
    { id: 1, itemName: 'Stool', openingStock: 100, stockIn: 50, stockOut: 20, closingStock: 130 },
    { id: 2, itemName: 'Table', openingStock: 200, stockIn: 30, stockOut: 60, closingStock: 170 },
    { id: 3, itemName: 'Chair', openingStock: 300, stockIn: 70, stockOut: 50, closingStock: 320 },
    // ... more dummy data
  ]);

  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  };

  const filteredData = reportData.filter(item => 
    item.itemName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom align="center">
          Stock Report
        </Typography>

        {/* Filter/Search Input */}
        <TextField
          label="Search Item"
          value={filterTerm}
          onChange={handleFilterChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {filteredData.length > 0 ? (
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Item Name</strong></TableCell>
                  <TableCell align="right"><strong>Opening Stock</strong></TableCell>
                  <TableCell align="right"><strong>Stock In</strong></TableCell>
                  <TableCell align="right"><strong>Stock Out</strong></TableCell>
                  <TableCell align="right"><strong>Closing Stock</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.itemName}</TableCell>
                    <TableCell align="right">{row.openingStock}</TableCell>
                    <TableCell align="right">{row.stockIn}</TableCell>
                    <TableCell align="right">{row.stockOut}</TableCell>
                    <TableCell align="right">{row.closingStock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No items found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default StockReport;
