import React, { useState } from 'react';
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PurchaseVoucher() {
  const [partyInfo, setPartyInfo] = useState({ party_name: '', address: '' });
  const [voucherInfo, setVoucherInfo] = useState({ voucher_number: '', voucher_date: '' });
  const [itemList, setItemList] = useState([]);
  const [itemDetails, setItemDetails] = useState({
    quantity: '',
    rate: '',
    discount_percentage: '',
    gst_percentage: '',
    discount_amount: 0,
    taxable_amount: 0,
    gst_amount: 0,
    purchase_amount: 0
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Update Party Information
  const handlePartyChange = (e) => {
    const { name, value } = e.target;
    setPartyInfo({ ...partyInfo, [name]: value });
  };

  // Update Voucher Information
  const handleVoucherChange = (e) => {
    const { name, value } = e.target;
    setVoucherInfo({ ...voucherInfo, [name]: value });
  };

  // Update Item Details
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    const updatedItem = { ...itemDetails, [name]: value };

    // Calculate amounts
    const quantity = parseFloat(updatedItem.quantity) || 0;
    const rate = parseFloat(updatedItem.rate) || 0;
    const amount = quantity * rate;
    const discountAmount = (parseFloat(updatedItem.discount_percentage) / 100) * amount;
    const taxableAmount = amount - discountAmount;
    const gstAmount = (parseFloat(updatedItem.gst_percentage) / 100) * taxableAmount;
    const purchaseAmount = taxableAmount + gstAmount;

    setItemDetails({
      ...updatedItem,
      discount_amount: discountAmount || 0,
      taxable_amount: taxableAmount || 0,
      gst_amount: gstAmount || 0,
      purchase_amount: purchaseAmount || 0
    });
  };

  // Add or Update Item in List
  const handleSaveItem = () => {
    const { party_name, address } = partyInfo;
    const { voucher_number, voucher_date } = voucherInfo;
    const { quantity, rate, discount_percentage, gst_percentage } = itemDetails;

    // Check if all required fields are filled
    if (!party_name || !address || !voucher_number || !voucher_date || !quantity || !rate || !discount_percentage || !gst_percentage) {
      setError('Please fill in all fields.');
      return;
    }

    // Check for valid values
    if (quantity <= 0 || rate <= 0 || discount_percentage < 0 || gst_percentage < 0) {
      setError('Please enter valid values.');
      return;
    }

    // Prepare item with all details, including party and voucher info
    const newItem = {
      ...itemDetails,
      party_name,
      address,
      voucher_number,
      voucher_date,
    };

    if (editIndex !== null) {
      // Update existing item
      const updatedItemList = itemList.map((item, index) =>
        index === editIndex ? newItem : item
      );
      setItemList(updatedItemList);
      setEditIndex(null);
    } else {
      // Add new item
      setItemList([...itemList, newItem]);
    }

    // Reset partyInfo and itemDetails after saving, but keep voucherInfo intact
    setPartyInfo({
      party_name: '',
      address: ''
    });

    setItemDetails({
      quantity: '',
      rate: '',
      discount_percentage: '',
      gst_percentage: '',
      discount_amount: 0,
      taxable_amount: 0,
      gst_amount: 0,
      purchase_amount: 0
    });

    setOpenDialog(false);
    setError(''); // Clear any previous errors
  };

  // Open Dialog for Adding or Editing Items
  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      // Set item details for editing
      setItemDetails(itemList[index]);
      setEditIndex(index);
    } else {
      setEditIndex(null);
    }
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(''); // Clear any previous errors
  };

  // Delete Item from List
  const handleDeleteItem = (index) => {
    setItemList(itemList.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Button to Open Dialog for Adding or Editing Items */}
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        {editIndex !== null ? 'Edit Item' : 'Add Item'}
      </Button>

      {/* Dialog (Popup) Form for Adding or Editing Item Details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editIndex !== null ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            label="Party Name"
            name="party_name"
            value={partyInfo.party_name}
            onChange={handlePartyChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={partyInfo.address}
            onChange={handlePartyChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Voucher Number"
            name="voucher_number"
            value={voucherInfo.voucher_number}
            onChange={handleVoucherChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Voucher Date"
            name="voucher_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={voucherInfo.voucher_date}
            onChange={handleVoucherChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={itemDetails.quantity}
            onChange={handleItemChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rate"
            name="rate"
            type="number"
            value={itemDetails.rate}
            onChange={handleItemChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Discount (%)"
            name="discount_percentage"
            type="number"
            value={itemDetails.discount_percentage}
            onChange={handleItemChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="GST (%)"
            name="gst_percentage"
            type="number"
            value={itemDetails.gst_percentage}
            onChange={handleItemChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Discount Amount"
            name="discount_amount"
            value={itemDetails.discount_amount.toFixed(2)}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            label="Taxable Amount"
            name="taxable_amount"
            value={itemDetails.taxable_amount.toFixed(2)}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            label="GST Amount"
            name="gst_amount"
            value={itemDetails.gst_amount.toFixed(2)}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            label="Purchase Amount"
            name="purchase_amount"
            value={itemDetails.purchase_amount.toFixed(2)}
            disabled
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveItem} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Table to Display Item List */}
      <Box sx={{ overflowX: 'auto', marginTop: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Party Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Voucher Number</TableCell>
                <TableCell>Voucher Date</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Discount (%)</TableCell>
                <TableCell>GST (%)</TableCell>
                <TableCell>Purchase Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.party_name}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.voucher_number}</TableCell>
                  <TableCell>{item.voucher_date}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.rate}</TableCell>
                  <TableCell>{item.discount_percentage}</TableCell>
                  <TableCell>{item.gst_percentage}</TableCell>
                  <TableCell>{item.purchase_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(index)}>
                      <EditIcon color='primary' />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteItem(index)}>
                      <DeleteIcon color='red' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
