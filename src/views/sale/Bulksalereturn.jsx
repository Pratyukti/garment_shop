import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Grid, Paper, Container, InputAdornment
} from '@mui/material';
import { Send as SendIcon, Print as PrintIcon, Cancel as CancelIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

export default function BulkSaleInvoice() {
  const [formData, setFormData] = useState({
    salesDateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
    narration: ''
  });

  const [isTaxApplicable, setIsTaxApplicable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }), calculateTotalPrice);
  };

  const calculateTotalPrice = () => {
    const unitPrice = parseFloat(formData.unitPrice) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const discount = parseFloat(formData.discount) || 0;

    const taxAmount = isTaxApplicable ? (unitPrice * tax) / 100 : 0;
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
        <title>Bulk Sale Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .container { max-width: 800px; margin: auto; }
          .section { margin-bottom: 20px; }
          .section h2 { margin: 0 0 10px 0; }
          .section p { margin: 5px 0; }
          .section .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="section">
            <h1>Bulk Sale Invoice</h1>
            <p><strong>Date and Time:</strong> ${formData.salesDateTime}</p>
          </div>
          <div class="section">
            <h2>Customer Information</h2>
            <p><span class="label">Party Name:</span> ${formData.partyName}</p>
            <p><span class="label">Mobile Number:</span> ${formData.partyMobileNumber}</p>
            <p><span class="label">Address:</span> ${formData.partyAddress}</p>
            <p><span class="label">GST Number:</span> ${formData.partyGSTNumber}</p>
          </div>
          <div class="section">
            <h2>Item Information</h2>
            <p><span class="label">Barcode Number:</span> ${formData.barcodeNumber}</p>
            <p><span class="label">Item Name:</span> ${formData.itemName}</p>
            <p><span class="label">Unit:</span> ${formData.unit}</p>
            <p><span class="label">Unit Price:</span> ${formData.unitPrice}</p>
            <p><span class="label">Tax:</span> ${formData.tax}</p>
            <p><span class="label">Discount:</span> ${formData.discount}</p>
            <p><span class="label">Total Price:</span> ${formData.totalPrice}</p>
          </div>
          <div class="section">
            <h2>Additional Information</h2>
            <p><span class="label">Narration:</span> ${formData.narration}</p>
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

  const handleCancel = () => {
    alert('Sale cancelled and inventory updated!');
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#f9dff5', position: 'relative', padding: '2rem' }}>
      <Paper sx={{ p: 3, backgroundColor: '#f9dff5' }} elevation={0}>
        <Typography variant="h5" gutterBottom align="center" color="secondary">Bulk Sale Return</Typography>
        <Typography variant="body2" color="textSecondary" align="center">Sales Date & Time: {formData.salesDateTime}</Typography>

        {/* Notification, Print, and Cancel options */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
          <IconButton onClick={handleSendNotification} sx={{ color: '#370140' }}>
            <SendIcon />
          </IconButton>
          <IconButton onClick={handlePrint} sx={{ color: '#370140' }}>
            <PrintIcon />
          </IconButton>
          <IconButton onClick={handleCancel} sx={{ color: '#370140' }}>
            <CancelIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Customer Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Customer Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Party Name"
                name="partyName"
                value={formData.partyName}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="partyMobileNumber"
                value={formData.partyMobileNumber}
                onChange={handleChange}
                type="tel"
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                name="partyAddress"
                value={formData.partyAddress}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GST Number"
                name="partyGSTNumber"
                value={formData.partyGSTNumber}
                onChange={handleChange}
                variant="outlined"
               
              />
            </Grid>

            {/* Item Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Item Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Barcode Number"
                name="barcodeNumber"
                value={formData.barcodeNumber}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Unit Price"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                type="number"
                variant="outlined"
                
              />
            </Grid>

            {/* Pricing & Tax Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Pricing & Tax Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tax (%)"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                type="number"
                variant="outlined"
                
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount (%)"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                type="number"
                variant="outlined"
                
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Price"
                name="totalPrice"
                value={formData.totalPrice}
                readOnly
                variant="outlined"
                
              />
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Additional Information</Typography>
              <TextField
                fullWidth
                label="Narration"
                name="narration"
                value={formData.narration}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
