import React, { useState } from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function DesignReport() {
  const [designDetails, setDesignDetails] = useState({
    design_name: '',
    design_code: '',
    description: '',
    associated_items: ''
  });

  const [designList, setDesignList] = useState([]); // List to hold all design entries
  const [items] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]); // Example items for Associated Items dropdown
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the design being edited
  const [confirmOpen, setConfirmOpen] = useState(false); // State for delete confirmation dialog
  const [deleteIndex, setDeleteIndex] = useState(null); // Index of the design to be deleted

  const handleChange = (e) => {
    setDesignDetails({
      ...designDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog when "Add Design" button is clicked
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
      const updatedList = [...designList];
      updatedList[editIndex] = designDetails;
      setDesignList(updatedList);
      console.log("Updated", designDetails);
    } else {
      // Add logic
      setDesignList([...designList, designDetails]);
      console.log("Added", designDetails);
    }

    // Reset the form and state
    setLoading({ ...loading, add: false });
    setDesignDetails({
      design_name: '',
      design_code: '',
      description: '',
      associated_items: ''
    });
    setOpen(false); // Close the dialog after adding or updating
  };

  const handleEdit = (index) => {
    setDesignDetails(designList[index]); // Populate form with the selected design's details
    setEditIndex(index); // Set the index of the design being edited
    setOpen(true); // Open the dialog to edit
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index); // Set the index of the design to be deleted
    setConfirmOpen(true); // Open the confirmation dialog
  };

  const handleDeleteConfirm = () => {
    const updatedList = designList.filter((_, i) => i !== deleteIndex); // Remove the selected design
    setDesignList(updatedList);
    setConfirmOpen(false); // Close confirmation dialog
    console.log("Deleted design at index", deleteIndex);
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false); // Close the confirmation dialog without deleting
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add Design Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Design' : 'Add Design'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#f9dff5' }}>{editIndex !== null ? 'Edit Design Details' : 'Add Design Details'}</DialogTitle>
        <DialogContent style={{ backgroundColor: '#f9dff5' }}>
          <Paper sx={{ padding: "10px", backgroundColor: "#f9dff5" }} elevation={0}>
            <form>
              <TextField
                fullWidth
                label="Design Name"
                name="design_name"
                value={designDetails.design_name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Design Code"
                name="design_code"
                value={designDetails.design_code}
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Associated Items</InputLabel>
                <Select
                  value={designDetails.associated_items}
                  name="associated_items"
                  onChange={handleChange}
                  label="Associated Items"
                >
                  {items.map(item => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={designDetails.description}
                onChange={handleChange}
                margin="normal"
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

      {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>Are you sure to delete?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table to Display Design Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Design Name</TableCell>
              <TableCell>Design Code</TableCell>
              <TableCell>Associated Items</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designList.map((design, index) => (
              <TableRow key={index}>
                <TableCell>{design.design_name}</TableCell>
                <TableCell>{design.design_code}</TableCell>
                <TableCell>{design.associated_items}</TableCell>
                <TableCell>{design.description}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(index)}>
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
