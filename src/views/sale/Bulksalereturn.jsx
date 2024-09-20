
import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Grid, Paper, Container, InputAdornment
} from '@mui/material';
import { Send as SendIcon, Print as PrintIcon, Cancel as CancelIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

export default function BulkSaleInvoice() {
  const [formData, setFormData] = useState({
    billNumber: '', // New field
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
    totalPrice: '', // Just a placeholder, no calculation
    narration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
        <title>Bulk Sale Return Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; padding: 0; color: blue; background-color: #f9f9f9; }
          .invoice-container { width: 100%; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; }
          .header { text-align: center; padding: 20px 0; background-color: #4caf50; color: white; }
          .header h1 { margin: 0; font-size: 24px; }
          .section { margin-bottom: 20px; }
          .section h2 { margin-bottom: 10px; font-size: 18px; color: #4caf50; }
          .section p { margin: 5px 0; font-size: 14px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table th, .table td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
          .table th { background-color: #f2f2f2; text-align: left; }
          .footer { text-align: center; padding: 20px 0; background-color: #4caf50; color: white; font-size: 14px; }
          .footer p { margin: 0; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>Bulk Sale Return Invoice</h1>
            <p>Bill Number: ${formData.billNumber}</p>
            <p>Sales Date & Time: ${formData.salesDateTime}</p>
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
            <table class="table">
              <tr>
                <th>Barcode Number</th>
                <td>${formData.barcodeNumber}</td>
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
              <tr>
                <th>Tax (%)</th>
                <td>${formData.tax}</td>
              </tr>
              <tr>
                <th>Discount (%)</th>
                <td>${formData.discount}</td>
              </tr>
              <tr>
                <th>Total Price</th>
                <td>${formData.totalPrice}</td>
              </tr>
            </table>
          </div>
  
          <div class="section">
            <h2>Narration</h2>
            <p>${formData.narration}</p>
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
            {/* Bill Number */}
            <Grid item xs={12} md={61}>
              <TextField
                fullWidth
                label="Bill Number"
                name="billNumber"
                value={formData.billNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

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
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Pricing and Tax</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Unit Price"
                name="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tax (%)"
                name="tax"
                type="number"
                value={formData.tax}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Discount (%)"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Total Price"
                name="totalPrice"
                value={formData.totalPrice}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Narration"
                name="narration"
                value={formData.narration}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
