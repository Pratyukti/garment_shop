import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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

  const [itemList, setItemList] = useState([]); // List to hold all item entries
  const [categories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Stationery' }
  ]); // Example categories
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the item being edited

  const handleChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog when "Add Item" button is clicked
    setEditIndex(null); // Reset the edit index
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog when "Cancel" button is clicked
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });

    if (editIndex !== null) {
      // Update logic
      const updatedList = [...itemList];
      updatedList[editIndex] = itemDetails;
      setItemList(updatedList);
      console.log("Updated", itemDetails);
    } else {
      // Add logic
      setItemList([...itemList, itemDetails]);
      console.log("Added", itemDetails);
    }

    // Reset the form and state
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
    setOpen(false); // Close the dialog after adding or updating
  };

  const handleEdit = (index) => {
    setItemDetails(itemList[index]); // Populate form with the selected item's details
    setEditIndex(index); // Set the index of the item being edited
    setOpen(true); // Open the dialog to edit
  };

  const handleDelete = (index) => {
    const updatedList = itemList.filter((_, i) => i !== index); // Remove the selected item
    setItemList(updatedList);
    console.log("Deleted item at index", index);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add Item Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Item' : 'Add Item'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{backgroundColor:'#f9dff5'}}>{editIndex !== null ? 'Edit Item Details' : 'Add Item Details'}</DialogTitle>
        <DialogContent style={{backgroundColor:'#f9dff5'}}>
          <Paper sx={{ padding: "10px" , backgroundColor: "#f9dff5"}} elevation={0}>
            <form>
              <TextField
                fullWidth
                label="Item Name"
                name="item_name"
                value={itemDetails.item_name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Item Code"
                name="item_code"
                value={itemDetails.item_code}
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={itemDetails.category}
                  name="category"
                  onChange={handleChange}
                  label="Category"
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
              />
              <TextField
                fullWidth
                label="Unit Price"
                name="unit_price"
                value={itemDetails.unit_price}
                onChange={handleChange}
                margin="normal"
                type="number"
              />
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock_quantity"
                value={itemDetails.stock_quantity}
                onChange={handleChange}
                margin="normal"
                type="number"
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
              />
            </form>
          </Paper>
        </DialogContent>
        <DialogActions style={{backgroundColor:'#f9dff5'}}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
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
                  <IconButton color="primary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(index)}>
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
