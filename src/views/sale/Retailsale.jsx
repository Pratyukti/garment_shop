

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Paper, Grid, IconButton, InputAdornment
} from '@mui/material';
import { Send as SendIcon, Print as PrintIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

export default function RetailSale() {
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    address: '',
    barcode: '',
    itemName: '',
    unit: '',
    unitPrice: '',
    tax: '',
    discount: '',
    totalPrice: '',
    paymentMethod: 'Cash',
    narration: ''
  });

  const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
  const salesDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  
  const inputRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    }, calculateTotalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.unitPrice, formData.tax, formData.discount, isDiscountApplicable]);

  const calculateTotalPrice = () => {
    const unitPrice = parseFloat(formData.unitPrice) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const discount = parseFloat(formData.discount) || 0;

    const taxAmount = (unitPrice * tax) / 100;
    const discountAmount = isDiscountApplicable ? (unitPrice * discount) / 100 : 0;
    const totalPrice = unitPrice + taxAmount - discountAmount;

    setFormData((prev) => ({
      ...prev,
      totalPrice: totalPrice.toFixed(2)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleSendNotification = () => {
    alert('Notification sent!');
  };

    const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const printContent = `
      <html>
      <head>
        <title>Retail Sale Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; padding: 0; color: blue; background-color: #f9f9f9; }
          .invoice-container { width: 100%; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; }
          .header { text-align: center; padding: 20px 0; background-color: #4caf50; color: red; }
          .header h1 { margin: 0; font-size: 24px; }
          .section { margin-bottom: 20px; }
          .section h2 { margin-bottom: 10px; font-size: 18px; color: #4caf50; }
          .section p { margin: 5px 0; font-size: 14px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table th, .table td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
          .table th { background-color: #f2f2f2; text-align: left; }
          .footer { text-align: center; padding: 20px 0; background-color: #4caf50; color: red; font-size: 14px; }
          .footer p { margin: 0; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>Retail Sale Receipt</h1>
            <p>${salesDateTime}</p>
          </div>
  
          <div class="section">
            <h2>Customer Information</h2>
            <p><strong>Full Name:</strong> ${formData.fullName}</p>
            <p><strong>Number:</strong> ${formData.number}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
          </div>
  
          <div class="section">
            <h2>Item Information</h2>
            <table class="table">
              <tr>
                <th>Barcode</th>
                <td>${formData.barcode}</td>
              </tr>
              <tr>
                <th>Item Name</th>
                <td>${formData.itemName}</td>
              </tr>
              <tr>
                <th>Unit</th>
                <td>${formData.unit}</td>
              </tr>
              <tr>
                <th>Unit Price</th>
                <td>${formData.unitPrice}</td>
              </tr>
            </table>
          </div>
  
          <div class="section">
            <h2>Pricing and Tax</h2>
            <table class="table">
              <tr>
                <th>Tax (%)</th>
                <td>${formData.tax}</td>
              </tr>
              ${isDiscountApplicable ? `
                <tr>
                  <th>Discount (%)</th>
                  <td>${formData.discount}</td>
                </tr>` : ''}
              <tr>
                <th>Total Price</th>
                <td>${formData.totalPrice}</td>
              </tr>
            </table>
          </div>
  
          <div class="section">
            <h2>Payment and Narration</h2>
            <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
            <p><strong>Narration:</strong> ${formData.narration}</p>
          </div>
  
          <div class="footer">
            <p>Thank you visit again!</p>
          </div>
        </div>
      </body>
      </html>
    `;
  
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus(); // Move focus to the next input
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#f9dff5', position: 'relative' }}>
      <Paper sx={{ p: 3, backgroundColor: '#f9dff5' }} elevation={0}>
        <Typography variant="h5" gutterBottom align="center" color="secondary">Retail Sale</Typography>
        <Typography variant="body2" color="textSecondary" align="center">Sales Date & Time: {salesDateTime}</Typography>

        {/* Notification and Print options */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
          <IconButton onClick={handleSendNotification} sx={{ color: '#370140' }}>
            <SendIcon />
          </IconButton>
          <IconButton onClick={handlePrint} sx={{ color: '#370140' }}>
            <PrintIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Item Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Item Information</Typography>
              <TextField
                fullWidth
                label="Barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[0] = el)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
              />
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[1] = el)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
              />
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[2] = el)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
              />
              <TextField
                fullWidth
                label="Unit Price"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                margin="normal"
                type="number"
                variant="outlined"
                inputRef={el => (inputRefs.current[3] = el)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
              />
            </Grid>

            {/* Customer Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Customer Information</Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[4] = el)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
              />
              <TextField
                fullWidth
                label="Number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                margin="normal"
                type="tel"
                variant="outlined"
                inputRef={el => (inputRefs.current[5] = el)}
                onKeyDown={(e) => handleKeyDown(e, 5)}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[6] = el)}
                onKeyDown={(e) => handleKeyDown(e, 6)}
              />
            </Grid>

            {/* Pricing and Tax */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Pricing and Tax</Typography>
              <TextField
                fullWidth
                label="Tax (%)"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                margin="normal"
                type="number"
                variant="outlined"
                inputRef={el => (inputRefs.current[7] = el)}
                onKeyDown={(e) => handleKeyDown(e, 7)}
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Discount Applicable</InputLabel>
                <Select
                  name="isDiscountApplicable"
                  value={isDiscountApplicable ? 'Yes' : 'No'}
                  onChange={(e) => setIsDiscountApplicable(e.target.value === 'Yes')}
                  label="Discount Applicable"
                >
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                </Select>
              </FormControl>
              {isDiscountApplicable && (
                <TextField
                  fullWidth
                  label="Discount (%)"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  margin="normal"
                  type="number"
                  variant="outlined"
                  inputRef={el => (inputRefs.current[8] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 8)}
                />
              )}
              <TextField
                fullWidth
                label="Total Price"
                name="totalPrice"
                value={formData.totalPrice}
                margin="normal"
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                variant="outlined"
                inputRef={el => (inputRefs.current[9] = el)}
                onKeyDown={(e) => handleKeyDown(e, 9)}
              />
            </Grid>

            {/* Payment and Narration */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Payment and Narration</Typography>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  label="Payment Method"
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Debit Card">Debit Card</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Narration"
                name="narration"
                value={formData.narration}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[10] = el)}
                onKeyDown={(e) => handleKeyDown(e, 10)}
              />
            </Grid>
          </Grid>
          <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
        </Box>
      </Paper>
    </Container>
  );
}
