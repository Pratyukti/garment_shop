import React, { useState } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Box,
  Typography,
  Alert
} from '@mui/material';

// Initial data for tax rates (CGST and SGST)
const TAX_RATE = 0.18;

export default function RetailSale() {
  // State variables
  const [customer, setCustomer] = useState({ name: '', mobile: '', address: '' });
  const [barcode, setBarcode] = useState('');
  const [itemDetails, setItemDetails] = useState({ name: '', unit: '', unitPrice: 0 });
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [salesEntries, setSalesEntries] = useState([]);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  
  // Mock item database
  const itemsDatabase = {
    '12345': { name: 'Shirt', unit: 'Piece', unitPrice: 500 },
    '54321': { name: 'Pants', unit: 'Piece', unitPrice: 700 }
  };

  // Handle barcode scan or manual input
  const handleItemSearch = () => {
    if (barcode && itemsDatabase[barcode]) {
      const item = itemsDatabase[barcode];
      setItemDetails(item);
      setOpenModal(true);
      setError('');
    } else {
      setError('Item not found or barcode is missing.');
    }
  };

  // Calculate total price (with tax and discount)
  const calculateTotalPrice = () => {
    const total = itemDetails.unitPrice * quantity;
    const discountAmount = (total * discount) / 100;
    const taxAmount = total * TAX_RATE;
    return total - discountAmount + taxAmount;
  };

  // Add item to sales table
  const handleAddItem = () => {
    if (!quantity || !paymentMethod) {
      setError('Please enter quantity and select a payment method.');
      return;
    }
    const totalPrice = calculateTotalPrice();
    setSalesEntries([
      ...salesEntries,
      { ...itemDetails, quantity, discount, totalPrice }
    ]);
    setOpenModal(false);
    resetForm();
  };

  // Reset form after item addition
  const resetForm = () => {
    setBarcode('');
    setItemDetails({ name: '', unit: '', unitPrice: 0 });
    setQuantity(1);
    setDiscount(0);
    setError('');
  };

  // Handle form submission (complete sale)
  const handleCompleteSale = () => {
    if (!salesEntries.length) {
      setError('No items added to the sale.');
      return;
    }
    console.log('Sale completed:', salesEntries, customer);
    alert('Sale Completed!');
    setSalesEntries([]);
    resetForm();
  };

  return (
    <div>
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Retail Sale
        </Typography>

        {/* Customer Info */}
        <Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <TextField
            label="Customer Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Mobile Number"
            value={customer.mobile}
            onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Customer Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            sx={{ flex: 2 }}
          />
        </Box>

        {/* Barcode & Item Search */}
        <Box sx={{ marginTop: '20px' }}>
          <TextField
            label="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            sx={{ marginRight: '20px' }}
          />
          <Button variant="contained" onClick={handleItemSearch}>
            Search Item
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>

        {/* Item Details Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              p: 4,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Item Details
            </Typography>
            <TextField
              label="Item Name"
              value={itemDetails.name}
              disabled
              fullWidth
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Unit"
              value={itemDetails.unit}
              disabled
              fullWidth
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Unit Price"
              value={itemDetails.unitPrice}
              disabled
              fullWidth
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Discount (%)"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              fullWidth
              sx={{ marginBottom: '15px' }}
            />
            <FormControl fullWidth sx={{ marginBottom: '15px' }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAddItem}>
              Add to Sale
            </Button>
          </Box>
        </Modal>

        {/* Sales Table */}
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Discount (%)</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.unit}</TableCell>
                  <TableCell>{entry.quantity}</TableCell>
                  <TableCell>{entry.unitPrice}</TableCell>
                  <TableCell>{entry.discount}</TableCell>
                  <TableCell>{entry.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: '20px' }}
          onClick={handleCompleteSale}
        >
          Complete Sale
        </Button>
      </Box>
    </div>
  );
}
