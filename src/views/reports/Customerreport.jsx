import React, { useState, useEffect } from 'react';
import {
  Container,
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

const CustomerReport = () => {
  const [customerType, setCustomerType] = useState('');
  const [exportFormat, setExportFormat] = useState('');
  const [reportData] = useState([
    {
      id: 1,
      name: 'John Doe',
      type: 'Retail',
      totalSales: 1000,
      totalQuantity: 20,
      mostFrequentItems: ['Item A', 'Item B'],
      avgPurchaseValue: 50,
    },
    {
      id: 2,
      name: 'Jane Smith',
      type: 'Bulk',
      totalSales: 5000,
      totalQuantity: 100,
      mostFrequentItems: ['Item C', 'Item D'],
      avgPurchaseValue: 50,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      type: 'Retail',
      totalSales: 3000,
      totalQuantity: 60,
      mostFrequentItems: ['Item A', 'Item E'],
      avgPurchaseValue: 50,
    },
    // Add more data as needed
  ]);

  const [filteredData, setFilteredData] = useState(reportData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key: column, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'ascending' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const getSortSymbol = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    const doc = new jsPDF();
    doc.text('Customer Sales Report', 14, 10);
    doc.autoTable({
      head: [
        [
          'Customer Name',
          'Total Sales',
          'Total Quantity',
          'Most Frequently Purchased Items',
          'Average Purchase Value',
        ],
      ],
      body: filteredData.map((row) => [
        row.name,
        row.totalSales.toFixed(2),
        row.totalQuantity,
        row.mostFrequentItems.join(', '),
        row.avgPurchaseValue.toFixed(2),
      ]),
      startY: 20,
    });
    doc.save('customer_sales_report.pdf');
  };

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((row) => ({
        'Customer Name': row.name,
        'Total Sales': row.totalSales.toFixed(2),
        'Total Quantity': row.totalQuantity,
        'Most Frequently Purchased Items': row.mostFrequentItems.join(', '),
        'Average Purchase Value': row.avgPurchaseValue.toFixed(2),
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Sales Report');

    XLSX.writeFile(wb, 'customer_sales_report.xlsx');
  };

  const handleExportChange = (event) => {
    setExportFormat(event.target.value);
    if (event.target.value === 'pdf') {
      handleExportPDF();
    } else if (event.target.value === 'excel') {
      handleExportExcel();
    }
  };

  const filterDataByCustomerType = () => {
    const filtered = customerType
      ? reportData.filter((row) => row.type === customerType)
      : reportData;
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterDataByCustomerType();
  }, [customerType]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f9dff5' }}>
        <Typography variant="h4" gutterBottom align="center" color="purple">
          Customer Sales Report
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            marginBottom: 3,
          }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              displayEmpty
              renderValue={() =>
                customerType ? customerType : 'Select Customer Type'
              }
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Bulk">Bulk</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={exportFormat}
              onChange={handleExportChange}
              displayEmpty
              renderValue={() =>
                exportFormat ? exportFormat : 'Export As'
              }
            >
              <MenuItem value="pdf">
                <PictureAsPdfIcon sx={{ marginRight: 1, color: 'red' }} />
                PDF
              </MenuItem>
              <MenuItem value="excel">
                <DescriptionIcon sx={{ marginRight: 1, color: 'green' }} />
                Excel
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {filteredData.length > 0 && (
          <>
            <TableContainer
              component={Paper}
              sx={{ marginTop: 4, backgroundColor: '#f4c4ec' }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      onClick={() => handleSort('name')}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: '#ea8cdb',
                        fontStyle: 'bold',
                        color: 'purple',
                      }}
                    >
                      <strong>Customer Name</strong>
                      {getSortSymbol('name')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('totalSales')}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: '#ea8cdb',
                        fontStyle: 'bold',
                        color: 'purple',
                      }}
                    >
                      <strong>Total Sales Amount</strong>
                      {getSortSymbol('totalSales')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('totalQuantity')}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: '#ea8cdb',
                        fontStyle: 'bold',
                        color: 'purple',
                      }}
                    >
                      <strong>Total Quantity Purchased</strong>
                      {getSortSymbol('totalQuantity')}
                    </TableCell>
                    <TableCell
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: '#ea8cdb',
                        fontStyle: 'bold',
                        color: 'purple',
                      }}
                    >
                      <strong>Most Frequently Purchased Items</strong>
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('avgPurchaseValue')}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: '#ea8cdb',
                        fontStyle: 'bold',
                        color: 'purple',
                      }}
                    >
                      <strong>Average Purchase Value</strong>
                      {getSortSymbol('avgPurchaseValue')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.totalSales.toFixed(2)}</TableCell>
                        <TableCell>{row.totalQuantity}</TableCell>
                        <TableCell>
                          {row.mostFrequentItems.join(', ')}
                        </TableCell>
                        <TableCell>{row.avgPurchaseValue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredData.length}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{ marginTop: 2 }}
            />
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CustomerReport;
