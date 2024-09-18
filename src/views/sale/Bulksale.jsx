import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Paper, Grid, Divider, IconButton
} from '@mui/material';
import { Send as SendIcon, Print as PrintIcon } from '@mui/icons-material';


export default function RetailSaleWithSMS() {
  const [formData, setFormData] = useState({
    billNumber: '',
    salesDateTime: new Date().toISOString().slice(0, 16), // Auto-fetch current date and time
    partyName: '',
    partyMobileNumber: '',
    partyAddress: '',
    partyGSTNumber: '',
    barcodeNumber: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    }, calculateTotalPrice);
  };

  const calculateTotalPrice = () => {
    const unitPrice = parseFloat(formData.unitPrice) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const discount = parseFloat(formData.discount) || 0;

    const taxAmount = isDiscountApplicable ? (unitPrice * tax) / 100 : 0;
    const discountAmount = (unitPrice * discount) / 100;
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
        <title>Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .invoice { width: 100%; max-width: 600px; margin: auto; }
          .header, .footer { text-align: center; padding: 10px; }
          .section { margin-bottom: 20px; }
          .section h2 { margin: 0; }
          .section p { margin: 5px 0; }
          .table { width: 100%; border-collapse: collapse; }
          .table th, .table td { border: 1px solid #ddd; padding: 8px; }
          .table th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <h1>Retail Sale Receipt</h1>
            <p>${formData.salesDateTime}</p>
          </div>
          <div class="section">
            <h2>Customer Information</h2>
            <p><strong>Party Name:</strong> ${formData.partyName}</p>
            <p><strong>Mobile Number:</strong> ${formData.partyMobileNumber}</p>
            <p><strong>Address:</strong> ${formData.partyAddress}</p>
            <p><strong>GST Number:</strong> ${formData.partyGSTNumber}</p>
          </div>
          <div class="section">
            <h2>Item Information</h2>
            <p><strong>Barcode:</strong> ${formData.barcodeNumber}</p>
            <p><strong>Item Name:</strong> ${formData.itemName}</p>
            <p><strong>Unit:</strong> ${formData.unit}</p>
            <p><strong>Unit Price:</strong> ${formData.unitPrice}</p>
          </div>
          <div class="section">
            <h2>Pricing and Tax</h2>
            ${isDiscountApplicable ? `<p><strong>Tax (%):</strong> ${formData.tax}</p>` : ''}
            <p><strong>Discount (%):</strong> ${formData.discount}</p>
            <p><strong>Total Price:</strong> ${formData.totalPrice}</p>
          </div>
          <div class="section">
            <h2>Payment and Narration</h2>
            <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
            <p><strong>Narration:</strong> ${formData.narration}</p>
          </div>
          <div class="footer">
            <p>Thank you for your purchase!</p>
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

  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#f9dff5', position: 'relative' }}>
      <Paper sx={{ p: 3, backgroundColor: '#f9dff5' }} elevation={0}>
        <Typography variant="h5" gutterBottom align="center" color="secondary">Bulk Sale</Typography>
        <Typography variant="body2" color="textSecondary" align="center">Sales Date & Time: {formData.salesDateTime}</Typography>

        {/* Notification and Print options */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
          <IconButton onClick={handleSendNotification} sx={{color:'#370140'}}>
            <SendIcon />
          </IconButton>
          <IconButton onClick={handlePrint} sx={{color:'#370140'}}>
            <PrintIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Party Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Party Information</Typography>
              <TextField
                fullWidth
                label="Bill Number"
                name="billNumber"
                value={formData.billNumber}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Party Name"
                name="partyName"
                value={formData.partyName}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Mobile Number"
                name="partyMobileNumber"
                value={formData.partyMobileNumber}
                onChange={handleChange}
                margin="normal"
                type="tel"
                variant="outlined"
              />
              <TextField
                fullWidth
                multiline
                rows={1}
                label="Address"
                name="partyAddress"
                value={formData.partyAddress}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="GST Number"
                name="partyGSTNumber"
                value={formData.partyGSTNumber}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Item Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Item Information</Typography>
              <TextField
                fullWidth
                label="Barcode Number"
                name="barcodeNumber"
                value={formData.barcodeNumber}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
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
                />
              
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Apply Discount</InputLabel>
                <Select
                  name="isDiscountApplicable"
                  value={isDiscountApplicable ? 'true' : 'false'}
                  onChange={(e) => setIsDiscountApplicable(e.target.value === 'true')}
                  label="Apply Discount"
                >
                  <MenuItem value="false">No</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                </Select>
              </FormControl>
              {isDiscountApplicable && (
                <TextField
                  fullWidth
                  label="Discount (%)"
                  name="discount"
                  value={formData.tax}
                  onChange={handleChange}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              )}
              
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" align="center">Total Price: {formData.totalPrice}</Typography>
            </Grid>

            {/* Payment Method and Narration */}
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
                  <MenuItem value="Credit">Credit</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Narration"
                name="narration"
                value={formData.narration}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
