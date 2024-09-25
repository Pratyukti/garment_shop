
import React, { useState, useRef } from 'react';
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
  Modal,
  Box,
  Typography,
  Alert
} from '@mui/material';

export default function StockEntry() {
  const [barcode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDetails, setItemDetails] = useState({ name: '', description: '', mrp: '', stock: '' });
  const [quantity, setQuantity] = useState('');
  const [itemMRP, setItemMRP] = useState('');
  const [stockEntries, setStockEntries] = useState([]);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  // Create refs for each input field
  const barcodeRef = useRef();
  const itemNameRef = useRef();
  const modalItemNameRef = useRef();
  const modalDescriptionRef = useRef();
  const modalMRPRef = useRef();
  const modalQuantityRef = useRef();
  const modalItemMRPRef = useRef();

  // Handle barcode/item change and fetch item details
  const handleItemSearch = () => {
    if (barcode || itemName) {
      // Open modal to fill details
      setOpenModal(true);
    } else {
      setError('Please enter a barcode or item name.');
    }
  };

  // Handle form submission within the modal
  const handleModalSubmit = () => {
    if (!quantity || !itemMRP || !itemDetails.name || !itemDetails.mrp) {
      setError('Please fill in all fields.');
      return;
    }
    setStockEntries([
      ...stockEntries,
      { barcode, itemName: itemDetails.name, description: itemDetails.description, quantity, itemMRP }
    ]);
    setOpenModal(false);
    setBarcode('');
    setItemName('');
    setQuantity('');
    setItemMRP('');
    setItemDetails({ name: '', description: '', mrp: '', stock: '' });
    setError('');
  };

  // Handle saving stock entries
  const handleSaveEntries = () => {
    if (stockEntries.length === 0) {
      setError('No stock entries to save.');
      return;
    }
    // Save stockEntries to database or local storage
    console.log('Saving stock entries:', stockEntries);
    setStockEntries([]);
  };

  // Function to handle Enter key press for input navigation
  const handleKeyPress = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#f9dff5', padding: '20px' }}>
        <TextField
          label="Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          margin="normal"
          sx={{ margin: '5px' }}
          inputRef={barcodeRef}
          onKeyDown={(e) => handleKeyPress(e, itemNameRef)}
        />
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          margin="normal"
          sx={{ margin: '5px' }}
          inputRef={itemNameRef}
          onKeyDown={(e) => handleKeyPress(e, null)} // Add the next ref if needed
        />
        
        <Button onClick={handleItemSearch} variant="contained" color="secondary" sx={{ marginTop: '30px', margin: '5px' }}>
          Search
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#f9dff5',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Enter Stock Details
          </Typography>
        
          <TextField
            label="Item Name"
            value={itemDetails.name}
            onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })}
            margin="normal"
            fullWidth
            inputRef={modalItemNameRef}
            onKeyDown={(e) => handleKeyPress(e, modalDescriptionRef)}
          />
          <TextField
            label="Description"
            value={itemDetails.description}
            onChange={(e) => setItemDetails({ ...itemDetails, description: e.target.value })}
            margin="normal"
            fullWidth
            inputRef={modalDescriptionRef}
            onKeyDown={(e) => handleKeyPress(e, modalMRPRef)}
          />
          <TextField
            label="MRP"
            type="number"
            value={itemDetails.mrp}
            onChange={(e) => setItemDetails({ ...itemDetails, mrp: e.target.value })}
            margin="normal"
            fullWidth
            inputRef={modalMRPRef}
            onKeyDown={(e) => handleKeyPress(e, modalQuantityRef)}
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            fullWidth
            inputRef={modalQuantityRef}
            onKeyDown={(e) => handleKeyPress(e, modalItemMRPRef)}
          />
          <TextField
            label="Item MRP"
            type="number"
            value={itemMRP}
            onChange={(e) => setItemMRP(e.target.value)}
            margin="normal"
            fullWidth
            inputRef={modalItemMRPRef}
            onKeyDown={(e) => handleKeyPress(e, null)} // Add the next ref if needed
          />
          <Button onClick={handleModalSubmit} variant="contained" color="secondary">
            Save
          </Button>
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Barcode</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Item MRP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockEntries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.barcode}</TableCell>
                <TableCell>{entry.itemName}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{entry.quantity}</TableCell>
                <TableCell>{entry.itemMRP}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
