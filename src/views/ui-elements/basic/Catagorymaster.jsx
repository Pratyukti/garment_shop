import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, DialogContentText } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function SimplePaper() {
  const [categoryDetails, setCategoryDetails] = useState({
    category_name: '',
    category_code: '',
    description: '',
  });

  const [categoryList, setCategoryList] = useState([]);  // List to hold all category entries
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false);  // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the category being edited
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Control delete confirmation dialog
  const [deleteIndex, setDeleteIndex] = useState(null); // Track index to be deleted

  const handleChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);  // Open the dialog when "Add" button is clicked
    setEditIndex(null); // Reset the edit index
  };

  const handleClose = () => {
    setOpen(false);  // Close the dialog when "Cancel" button is clicked
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });

    if (editIndex !== null) {
      // Update logic
      const updatedList = [...categoryList];
      updatedList[editIndex] = categoryDetails;
      setCategoryList(updatedList);
      console.log("Updated", categoryDetails);
    } else {
      // Add logic
      setCategoryList([...categoryList, categoryDetails]);
      console.log("Added", categoryDetails);
    }

    // Reset the form and state
    setLoading({ ...loading, add: false });
    setCategoryDetails({
      category_name: '',
      category_code: '',
      description: ''
    });
    setOpen(false);  // Close the dialog after adding or updating
  };

  const handleEdit = (index) => {
    setCategoryDetails(categoryList[index]);  // Populate form with the selected category's details
    setEditIndex(index);  // Set the index of the category being edited
    setOpen(true);  // Open the dialog to edit
  };

  const handleDelete = (index) => {
    setDeleteDialogOpen(true);  // Open the delete confirmation dialog
    setDeleteIndex(index);  // Store the index to be deleted
  };

  const confirmDelete = () => {
    const updatedList = categoryList.filter((_, i) => i !== deleteIndex);  // Remove the selected category
    setCategoryList(updatedList);
    console.log("Deleted category at index", deleteIndex);
    setDeleteDialogOpen(false);  // Close the delete confirmation dialog
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);  // Close delete confirmation without deleting
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add Category Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Category' : 'Add Category'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{backgroundColor:'#f9dff5'}}>
          {editIndex !== null ? 'Edit Category Details' : 'Add Category Details'}
        </DialogTitle>
        <DialogContent style={{backgroundColor:'#f9dff5'}}>
          <Paper sx={{ padding: "10px", backgroundColor: "#f9dff5" }} elevation={0}>
            <form>
              <TextField
                fullWidth
                label="Category Name"
                name="category_name"
                value={categoryDetails.category_name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Category Code"
                name="category_code"
                value={categoryDetails.category_code}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={categoryDetails.description}
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

      {/* Table to Display Category Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Category Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.category_name}</TableCell>
                <TableCell>{category.category_code}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
