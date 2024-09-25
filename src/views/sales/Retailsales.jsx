// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Modal,
//   Box,
//   Typography,
//   Alert
// } from '@mui/material';

// // Initial data for tax rates (CGST and SGST)
// const TAX_RATE = 0.18;

// export default function RetailSale() {
//   // State variables
//   const [customer, setCustomer] = useState({ name: '', mobile: '', address: '' });
//   const [barcode, setBarcode] = useState('');
//   const [itemDetails, setItemDetails] = useState({ name: '', unit: '', unitPrice: 0 });
//   const [quantity, setQuantity] = useState(1);
//   const [discount, setDiscount] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [salesEntries, setSalesEntries] = useState([]);
//   const [error, setError] = useState('');
//   const [openModal, setOpenModal] = useState(false);
  
//   // Mock item database
//   const itemsDatabase = {
//     '12345': { name: 'Shirt', unit: 'Piece', unitPrice: 500 },
//     '54321': { name: 'Pants', unit: 'Piece', unitPrice: 700 }
//   };

//   // Handle barcode scan or manual input
//   const handleItemSearch = () => {
//     if (barcode && itemsDatabase[barcode]) {
//       const item = itemsDatabase[barcode];
//       setItemDetails(item);
//       setOpenModal(true);
//       setError('');
//     } else {
//       setError('Item not found or barcode is missing.');
//     }
//   };

//   // Calculate total price (with tax and discount)
//   const calculateTotalPrice = () => {
//     const total = itemDetails.unitPrice * quantity;
//     const discountAmount = (total * discount) / 100;
//     const taxAmount = total * TAX_RATE;
//     return total - discountAmount + taxAmount;
//   };

//   // Add item to sales table
//   const handleAddItem = () => {
//     if (!quantity || !paymentMethod) {
//       setError('Please enter quantity and select a payment method.');
//       return;
//     }
//     const totalPrice = calculateTotalPrice();
//     setSalesEntries([
//       ...salesEntries,
//       { ...itemDetails, quantity, discount, totalPrice }
//     ]);
//     setOpenModal(false);
//     resetForm();
//   };

//   // Reset form after item addition
//   const resetForm = () => {
//     setBarcode('');
//     setItemDetails({ name: '', unit: '', unitPrice: 0 });
//     setQuantity(1);
//     setDiscount(0);
//     setError('');
//   };

//   // Handle form submission (complete sale)
//   const handleCompleteSale = () => {
//     if (!salesEntries.length) {
//       setError('No items added to the sale.');
//       return;
//     }
//     console.log('Sale completed:', salesEntries, customer);
//     alert('Sale Completed!');
//     setSalesEntries([]);
//     resetForm();
//   };

//   return (
//     <div>
//       <Box sx={{ padding: '20px' }}>
//         <Typography variant="h4" gutterBottom>
//           Retail Sale
//         </Typography>

//         {/* Customer Info */}
//         <Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//           <TextField
//             label="Customer Name"
//             value={customer.name}
//             onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
//             sx={{ flex: 1 }}
//           />
//           <TextField
//             label="Mobile Number"
//             value={customer.mobile}
//             onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
//             sx={{ flex: 1 }}
//           />
//           <TextField
//             label="Customer Address"
//             value={customer.address}
//             onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
//             sx={{ flex: 2 }}
//           />
//         </Box>

//         {/* Barcode & Item Search */}
//         <Box sx={{ marginTop: '20px' }}>
//           <TextField
//             label="Barcode"
//             value={barcode}
//             onChange={(e) => setBarcode(e.target.value)}
//             sx={{ marginRight: '20px' }}
//           />
//           <Button variant="contained" onClick={handleItemSearch}>
//             Search Item
//           </Button>
//           {error && <Alert severity="error">{error}</Alert>}
//         </Box>

//         {/* Item Details Modal */}
//         <Modal open={openModal} onClose={() => setOpenModal(false)}>
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: 400,
//               bgcolor: 'background.paper',
//               p: 4,
//               boxShadow: 24,
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Item Details
//             </Typography>
//             <TextField
//               label="Item Name"
//               value={itemDetails.name}
//               disabled
//               fullWidth
//               sx={{ marginBottom: '15px' }}
//             />
//             <TextField
//               label="Unit"
//               value={itemDetails.unit}
//               disabled
//               fullWidth
//               sx={{ marginBottom: '15px' }}
//             />
//             <TextField
//               label="Unit Price"
//               value={itemDetails.unitPrice}
//               disabled
//               fullWidth
//               sx={{ marginBottom: '15px' }}
//             />
//             <TextField
//               label="Quantity"
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               fullWidth
//               sx={{ marginBottom: '15px' }}
//             />
//             <TextField
//               label="Discount (%)"
//               type="number"
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//               fullWidth
//               sx={{ marginBottom: '15px' }}
//             />
//             <FormControl fullWidth sx={{ marginBottom: '15px' }}>
//               <InputLabel>Payment Method</InputLabel>
//               <Select
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               >
//                 <MenuItem value="Cash">Cash</MenuItem>
//                 <MenuItem value="Credit Card">Credit Card</MenuItem>
//                 <MenuItem value="UPI">UPI</MenuItem>
//               </Select>
//             </FormControl>
//             <Button variant="contained" onClick={handleAddItem}>
//               Add to Sale
//             </Button>
//           </Box>
//         </Modal>

//         {/* Sales Table */}
//         <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Item Name</TableCell>
//                 <TableCell>Unit</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Unit Price</TableCell>
//                 <TableCell>Discount (%)</TableCell>
//                 <TableCell>Total Price</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {salesEntries.map((entry, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{entry.name}</TableCell>
//                   <TableCell>{entry.unit}</TableCell>
//                   <TableCell>{entry.quantity}</TableCell>
//                   <TableCell>{entry.unitPrice}</TableCell>
//                   <TableCell>{entry.discount}</TableCell>
//                   <TableCell>{entry.totalPrice}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Button
//           variant="contained"
//           color="secondary"
//           sx={{ marginTop: '20px' }}
//           onClick={handleCompleteSale}
//         >
//           Complete Sale
//         </Button>
//       </Box>
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const RetailSaleForm = () => {
  const [salesDate, setSalesDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [barcode, setBarcode] = useState("");
  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [cgst, setCgst] = useState(9); // CGST percentage
  const [sgst, setSgst] = useState(9); // SGST percentage
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [narration, setNarration] = useState("");
  const [open, setOpen] = useState(false); // To manage modal
  const [salesRecords, setSalesRecords] = useState([]); // To store sales data

  // Auto-fill item based on barcode
  const handleBarcodeScan = () => {
    if (barcode === "12345") {
      setItemName("Sample Product");
      setUnit("Piece");
      setUnitPrice(100); // Simulated price
    }
  };

  // Calculate total price with tax and discount
  const calculateTotalPrice = () => {
    const taxAmount = (unitPrice * (cgst + sgst)) / 100;
    const discountAmount = (unitPrice * discount) / 100;
    const total = unitPrice + taxAmount - discountAmount;
    setTotalPrice(total.toFixed(2)); // Round to two decimals
  };

  // Handle form submission
  const handleSubmit = () => {
    const newRecord = {
      salesDate,
      customerName,
      customerMobile,
      customerAddress,
      barcode,
      itemName,
      unit,
      unitPrice,
      cgst,
      sgst,
      discount,
      totalPrice,
      paymentMethod,
      narration,
    };

    // Add the new record to the salesRecords state
    setSalesRecords([...salesRecords, newRecord]);

    // Close the form after submission
    setOpen(false);

    // Reset form fields
    setSalesDate("");
    setCustomerName("");
    setCustomerMobile("");
    setCustomerAddress("");
    setBarcode("");
    setItemName("");
    setUnit("");
    setUnitPrice(0);
    setDiscount(0);
    setTotalPrice(0);
    setPaymentMethod("Cash");
    setNarration("");
  };

  // Generate PDF Invoice
  const generateInvoice = () => {
    const doc = new jsPDF();

    // Set title and invoice details
    doc.text("Retail Sale Invoice", 20, 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Customer Name: ${customerName}`, 20, 40);
    doc.text(`Customer Mobile: ${customerMobile}`, 20, 50);
    doc.text(`Customer Address: ${customerAddress}`, 20, 60);

    // Generate table with sales data
    autoTable(doc, {
      startY: 70, // Position the table below the customer details
      head: [['Item Name', 'Unit', 'Unit Price', 'CGST', 'SGST', 'Discount', 'Total Price']],
      body: salesRecords.map(record => [
        record.itemName,
        record.unit,
        record.unitPrice,
        `${record.cgst}%`,
        `${record.sgst}%`,
        `${record.discount}%`,
        record.totalPrice,
      ]),
    });

    // Save the PDF
    doc.save("Retail_Invoice.pdf");
  };

  return (
    <div>
      {/* Button to Open the Popup */}
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open Retail Sale Form
      </Button>

      {/* Popup (Dialog) with Retail Sale Form */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Retail Sale Form</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Form fields */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Sales Date and Time"
                type="datetime-local"
                fullWidth
                value={salesDate}
                onChange={(e) => setSalesDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer Name"
                fullWidth
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Barcode"
                fullWidth
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onBlur={handleBarcodeScan}
              />

            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer Mobile Number"
                fullWidth
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Item Name"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer Address"
                fullWidth
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Unit"
                fullWidth
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Unit Price"
                type="number"
                fullWidth
                value={unitPrice}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Discount (%)"
                type="number"
                fullWidth
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                onBlur={calculateTotalPrice}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Total Price"
                fullWidth
                value={totalPrice}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Payment Method"
                select
                fullWidth
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Credit/Debit Card">Credit/Debit Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Narration"
                fullWidth
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Sales Records in a Table */}
      {salesRecords.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sales Date</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>CGST</TableCell>
                  <TableCell>SGST</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Narration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.salesDate}</TableCell>
                    <TableCell>{record.customerName}</TableCell>
                    <TableCell>{record.itemName}</TableCell>
                    <TableCell>{record.unit}</TableCell>
                    <TableCell>{record.unitPrice}</TableCell>
                    <TableCell>{record.cgst}%</TableCell>
                    <TableCell>{record.sgst}%</TableCell>
                    <TableCell>{record.discount}%</TableCell>
                    <TableCell>{record.totalPrice}</TableCell>
                    <TableCell>{record.paymentMethod}</TableCell>
                    <TableCell>{record.narration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Button to Generate PDF Invoice */}
          <Button
            variant="contained"
            color="primary"
            onClick={generateInvoice}
            style={{ marginTop: "10px" }}
          >
            Generate Invoice PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default RetailSaleForm;
