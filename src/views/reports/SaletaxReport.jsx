import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const SaleTaxReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taxType, setTaxType] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = () => {
    // Example data; replace with actual API call
    const data = [
      { id: 1, itemCategory: 'Electronics', salesAmount: 2000, taxCollected: 360 },
      { id: 2, itemCategory: 'Clothing', salesAmount: 1500, taxCollected: 270 },
    ];
    setReportData(data);
  };

  const handleExportPDF = () => {
    if (reportData.length === 0) {
      alert("No data to export");
      return;
    }
    const doc = new jsPDF();
    doc.text("Sale Tax Report", 14, 10);
    doc.autoTable({
      head: [['Item Category', 'Sales Amount', 'Tax Collected']],
      body: reportData.map(row => [row.itemCategory, row.salesAmount.toFixed(2), row.taxCollected.toFixed(2)]),
      startY: 20,
    });
    doc.save('sale_tax_report.pdf');
  };

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert("No data to export");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(reportData.map(row => ({
      'Item Category': row.itemCategory,
      'Sales Amount': row.salesAmount.toFixed(2),
      'Tax Collected': row.taxCollected.toFixed(2),
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sale Tax Report');
    
    XLSX.writeFile(wb, 'sale_tax_report.xlsx');
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom align="center">
          Sale Tax Report
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tax Type</InputLabel>
              <Select
                value={taxType}
                onChange={(e) => setTaxType(e.target.value)}
              >
                <MenuItem value="GST">GST</MenuItem>
                <MenuItem value="VAT">VAT</MenuItem>
                {/* Add more tax types as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleGenerateReport} fullWidth>
              Generate Report
            </Button>
          </Grid>
        </Grid>

        {reportData.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Item Category</strong></TableCell>
                  <TableCell align="right"><strong>Sales Amount</strong></TableCell>
                  <TableCell align="right"><strong>Tax Collected</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.itemCategory}</TableCell>
                    <TableCell align="right">{row.salesAmount.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.taxCollected.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleExportPDF}>
            Export as PDF
          </Button>
          <Button variant="contained" color="success" onClick={handleExportExcel}>
            Export as Excel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SaleTaxReport;
