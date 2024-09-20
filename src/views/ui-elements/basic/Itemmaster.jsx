import React, { useState, useRef } from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function Itemmaster() {
  const [itemDetails, setItemDetails] = useState({
    item_name: '',
    item_code: '',
    category: '',
    hsn_code: '',
    unit_price: '',
    stock_quantity: '',
    description: ''
  });

  const [itemList, setItemList] = useState([]);
  const [categories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Stationery' }
  ]);
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fieldRefs = useRef([]);

  const handleChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditIndex(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });

    if (editIndex !== null) {
      const updatedList = [...itemList];
      updatedList[editIndex] = itemDetails;
      setItemList(updatedList);
      console.log("Updated", itemDetails);
    } else {
      setItemList([...itemList, itemDetails]);
      console.log("Added", itemDetails);
    }

    setLoading({ ...loading, add: false });
    setItemDetails({
      item_name: '',
      item_code: '',
      category: '',
      hsn_code: '',
      unit_price: '',
      stock_quantity: '',
      description: ''
    });
    setOpen(false);
  };

  const handleEdit = (index) => {
    setItemDetails(itemList[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteDialogOpen = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    const updatedList = itemList.filter((_, i) => i !== deleteIndex);
    setItemList(updatedList);
    setDeleteDialogOpen(false);
    console.log("Deleted item at index", deleteIndex);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (fieldRefs.current[nextIndex]) {
        fieldRefs.current[nextIndex].focus();
      }
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add Item Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Item' : 'Add Item'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#f9dff5' }}>{editIndex !== null ? 'Edit Item Details' : 'Add Item Details'}</DialogTitle>
        <DialogContent style={{ backgroundColor: '#f9dff5' }}>
          <Paper sx={{ padding: "10px", backgroundColor: "#f9dff5" }} elevation={0}>
            <form>
              <TextField
                fullWidth
                label="Item Name"
                name="item_name"
                value={itemDetails.item_name}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={el => (fieldRefs.current[0] = el)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
              />
              <TextField
                fullWidth
                label="Item Code"
                name="item_code"
                value={itemDetails.item_code}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={el => (fieldRefs.current[1] = el)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={itemDetails.category}
                  name="category"
                  onChange={handleChange}
                  label="Category"
                  inputRef={el => (fieldRefs.current[2] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="HSN Code"
                name="hsn_code"
                value={itemDetails.hsn_code}
                onChange={handleChange}
                margin="normal"
                inputRef={el => (fieldRefs.current[3] = el)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
              />
              <TextField
                fullWidth
                label="Unit Price"
                name="unit_price"
                value={itemDetails.unit_price}
                onChange={handleChange}
                margin="normal"
                type="number"
                inputRef={el => (fieldRefs.current[4] = el)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
              />
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock_quantity"
                value={itemDetails.stock_quantity}
                onChange={handleChange}
                margin="normal"
                type="number"
                inputRef={el => (fieldRefs.current[5] = el)}
                onKeyDown={(e) => handleKeyDown(e, 5)}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={itemDetails.description}
                onChange={handleChange}
                margin="normal"
                inputRef={el => (fieldRefs.current[6] = el)}
                onKeyDown={(e) => handleKeyDown(e, 6)}
              />
            </form>
          </Paper>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#f9dff5' }}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table to Display Item Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>HSN Code</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.item_code}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.hsn_code}</TableCell>
                <TableCell>{item.unit_price}</TableCell>
                <TableCell>{item.stock_quantity}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteDialogOpen(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
