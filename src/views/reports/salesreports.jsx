
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

const SalesReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saleType, setSaleType] = useState('');
  const [exportFormat, setExportFormat] = useState('');
  const [reportData] = useState([
    { id: 1, date: '2024-09-01', itemType: 'Retail Sale', category: 'Electronics', amount: 2000, quantity: 5 },
    { id: 2, date: '2024-09-05', itemType: 'Bulk Sale', category: 'Clothing', amount: 1500, quantity: 3 },
    { id: 3, date: '2024-09-10', itemType: 'Retail Sale', category: 'Furniture', amount: 3000, quantity: 2 },
    { id: 4, date: '2024-09-12', itemType: 'Bulk Sale', category: 'Stationery', amount: 800, quantity: 10 },
    { id: 5, date: '2024-09-15', itemType: 'Retail Sale', category: 'Electronics', amount: 2200, quantity: 4 },
    { id: 6, date: '2024-09-20', itemType: 'Bulk Sale', category: 'Clothing', amount: 1800, quantity: 6 },
  ]);

  const [filteredData, setFilteredData] = useState(reportData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');

  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 10);
    doc.autoTable({
      head: [['Date', 'Item Type', 'Category', 'Amount', 'Quantity']],
      body: filteredData.map(row => [row.date, row.itemType, row.category, row.amount.toFixed(2), row.quantity]),
      startY: 20,
    });
    doc.save('sales_report.pdf');
  };

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(filteredData.map(row => ({
      'Date': row.date,
      'Item Type': row.itemType,
      'Category': row.category,
      'Amount': row.amount.toFixed(2),
      'Quantity': row.quantity,
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sale Tax Report');

    XLSX.writeFile(wb, 'sale_report.xlsx');
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
      const saleMatch = !saleType || row.itemType === saleType;
      return dateMatch && saleMatch;
    });
    setFilteredData(filtered);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = filteredData.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    filterData();
  }, [startDate, endDate, saleType]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f9dff5' }}>
        <Typography variant="h4" gutterBottom align="center" color='purple'>
          Sales Report
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

          {/* Sale Type Dropdown */}
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={saleType}
              onChange={(e) => setSaleType(e.target.value)}
              displayEmpty
              renderValue={() => (saleType ? saleType : "Select Sale Type")}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Retail Sale">Retail Sale</MenuItem>
              <MenuItem value="Bulk Sale">Bulk Sale</MenuItem>
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
        {sortedData.length > 0 && (
          <>
            <TableContainer component={Paper} sx={{ marginTop: 4 ,border:'2px solid purple'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleRequestSort('date')} sx={{cursor: 'pointer',backgroundColor:'#ea8cdb',fontStyle:'bold',color:'purple'}}><strong>Date</strong></TableCell>
                    <TableCell onClick={() => handleRequestSort('itemType')} sx={{cursor: 'pointer',backgroundColor:'#ea8cdb',fontStyle:'bold',color:'purple'}}><strong>Item Type</strong></TableCell>
                    <TableCell onClick={() => handleRequestSort('category')} sx={{cursor: 'pointer',backgroundColor:'#ea8cdb',fontStyle:'bold',color:'purple'}}><strong>Category</strong></TableCell>
                    <TableCell align="right" onClick={() => handleRequestSort('amount')} sx={{cursor: 'pointer',backgroundColor:'#ea8cdb',fontStyle:'bold',color:'purple'}}><strong>Amount</strong></TableCell>
                    <TableCell align="right" onClick={() => handleRequestSort('quantity')} sx={{cursor: 'pointer',backgroundColor:'#ea8cdb',fontStyle:'bold',color:'purple'}}><strong>Quantity</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.itemType}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
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
              sx={{ marginTop: 2 }}
            />
          </>
        )}
        {sortedData.length === 0 && (
          <Typography variant="h6" color="error" align="center">
            No data found
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SalesReports;
