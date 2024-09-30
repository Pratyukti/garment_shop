
import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
} from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF icon
import DescriptionIcon from '@mui/icons-material/Description'; // Excel icon
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Sort Ascending Icon
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Sort Descending Icon

const SaleTaxReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taxType, setTaxType] = useState('');
  const [exportFormat, setExportFormat] = useState('');
  const [reportData] = useState([
    { id: 1, itemCategory: 'Electronics', salesAmount: 2000, taxCollected: 360, taxType: 'GST', date: '2024-09-01' },
    { id: 2, itemCategory: 'Clothing', salesAmount: 1500, taxCollected: 270, taxType: 'GST', date: '2024-09-05' },
    { id: 3, itemCategory: 'Furniture', salesAmount: 3000, taxCollected: 540, taxType: 'VAT', date: '2024-09-10' },
    { id: 4, itemCategory: 'Stationery', salesAmount: 800, taxCollected: 144, taxType: 'VAT', date: '2024-09-12' },
  ]);

  const [filteredData, setFilteredData] = useState(reportData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('salesAmount');

  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }
    const doc = new jsPDF();
    doc.text("Sale Tax Report", 14, 10);
    doc.autoTable({
      head: [['Date','Item Category', 'Sales Amount', 'Tax Collected']],
      body: filteredData.map(row => [row.date,row.itemCategory, row.salesAmount.toFixed(2), row.taxCollected.toFixed(2)]),
      startY: 20,
    });
    doc.save('sale_tax_report.pdf');
  };

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(filteredData.map(row => ({
      'Date': row.date,
      'Item Category': row.itemCategory,
      'Sales Amount': row.salesAmount.toFixed(2),
      'Tax Collected': row.taxCollected.toFixed(2),
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sale Tax Report');

    XLSX.writeFile(wb, 'sale_tax_report.xlsx');
  };

  const handleExportChange = (event) => {
    setExportFormat(event.target.value);
    if (event.target.value === 'pdf') {
      handleExportPDF();
    } else if (event.target.value === 'excel') {
      handleExportExcel();
    }
  };

  const filterData = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = reportData.filter(row => {
      const rowDate = new Date(row.date);
      const dateMatch = (!startDate || rowDate >= start) && (!endDate || rowDate <= end);
      const taxMatch = !taxType || row.taxType === taxType;
      return dateMatch && taxMatch;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [startDate, endDate, taxType]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = filteredData.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    }
    return a[orderBy] < b[orderBy] ? 1 : -1;
  });

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f9dff5' }}>
        <Typography variant="h4" gutterBottom align="center" color='purple'>
          Sale Tax Report
        </Typography>

        {/* Box for Input Fields in One Line */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            marginBottom: 3,
          }}
        >
          {/* Start Date Input */}
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          {/* End Date Input */}
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          {/* Tax Type Dropdown */}
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
              displayEmpty
              renderValue={() => (taxType ? taxType : "Select Tax Type")}
            >
              <MenuItem value="GST">GST</MenuItem>
              <MenuItem value="VAT">VAT</MenuItem>
              {/* Add more tax types as needed */}
            </Select>
          </FormControl>

          {/* Export Format Dropdown */}
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={exportFormat}
              onChange={handleExportChange}
              displayEmpty
              renderValue={() => (exportFormat ? exportFormat : "Export As")}
            >
              <MenuItem value="pdf">
                <PictureAsPdfIcon sx={{ marginRight: 1, color: 'red' }} />
                PDF
              </MenuItem>
              <MenuItem value="excel">
                <DescriptionIcon sx={{ marginRight: 1, color: "green" }} />
                Excel
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Report Table */}
        {filteredData.length > 0 && (
          <>
            <TableContainer component={Paper} sx={{ marginTop: 4, backgroundColor: '#f4c4ec' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleRequestSort('date')} sx={{ cursor: 'pointer', backgroundColor: '#ea8cdb',  fontStyle: 'bold' ,color:'purple'}}>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort('itemCategory')} sx={{ cursor: 'pointer', backgroundColor: '#ea8cdb', fontStyle: 'bold',color:'purple' }}>
                      <strong>Item Category</strong>
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort('salesAmount')} align="right" sx={{ cursor: 'pointer', backgroundColor: '#ea8cdb',  fontStyle: 'bold' ,color:'purple'}}>
                      <strong>Sales Amount {orderBy === 'salesAmount' ? (order === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />) : null}</strong>
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort('taxCollected')} align="right" sx={{ cursor: 'pointer', backgroundColor: '#ea8cdb', fontStyle: 'bold' ,color:'purple'}}>
                      <strong>Tax Collected {orderBy === 'taxCollected' ? (order === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />) : null}</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.itemCategory}</TableCell>
                      <TableCell align="right">{row.salesAmount.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.taxCollected.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </>
        )}

        {/* Message for no results */}
        {filteredData.length === 0 && (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ marginTop: 4 }}>
            No data available for the selected filters.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SaleTaxReport;
