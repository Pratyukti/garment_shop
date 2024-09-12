import React, { useState } from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function Taxdetails() {
  const [taxDetails, setTaxDetails] = useState({
    tax_name: '',
    tax_percentage: '',
    description: ''
  });

  const [taxList, setTaxList] = useState([]); // List to hold all tax entries
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the tax being edited

  const handleChange = (e) => {
    setTaxDetails({
      ...taxDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog when "Add Tax" button is clicked
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
      const updatedList = [...taxList];
      updatedList[editIndex] = taxDetails;
      setTaxList(updatedList);
      console.log("Updated", taxDetails);
    } else {
      // Add logic
      setTaxList([...taxList, taxDetails]);
      console.log("Added", taxDetails);
    }

    // Reset the form and state
    setLoading({ ...loading, add: false });
    setTaxDetails({
      tax_name: '',
      tax_percentage: '',
      description: ''
    });
    setOpen(false); // Close the dialog after adding or updating
  };

  const handleEdit = (index) => {
    setTaxDetails(taxList[index]); // Populate form with the selected tax's details
    setEditIndex(index); // Set the index of the tax being edited
    setOpen(true); // Open the dialog to edit
  };

  const handleDelete = (index) => {
    const updatedList = taxList.filter((_, i) => i !== index); // Remove the selected tax
    setTaxList(updatedList);
    console.log("Deleted tax at index", index);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add Tax Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Tax' : 'Add Tax'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Tax Details' : 'Add Tax Details'}</DialogTitle>
        <DialogContent>
          <Paper sx={{ padding: "10px" , backgroundColor: "#f4ebfe"}}>
            <form>
              {/* Tax Name */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Tax Name</InputLabel>
                <Select
                  value={taxDetails.tax_name}
                  name="tax_name"
                  onChange={handleChange}
                  label="Tax Name"
                >
                  <MenuItem value="CGST">CGST</MenuItem>
                  <MenuItem value="SGST">SGST</MenuItem>
                  <MenuItem value="IGST">IGST</MenuItem>
                </Select>
              </FormControl>

              {/* Tax Percentage */}
              <TextField
                fullWidth
                label="Tax Percentage"
                name="tax_percentage"
                value={taxDetails.tax_percentage}
                onChange={handleChange}
                margin="normal"
                required
              />

              {/* Description */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={taxDetails.description}
                onChange={handleChange}
                margin="normal"
              />
            </form>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table to Display Tax Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tax Name</TableCell>
              <TableCell>Tax Percentage</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxList.map((tax, index) => (
              <TableRow key={index}>
                <TableCell>{tax.tax_name}</TableCell>
                <TableCell>{tax.tax_percentage}</TableCell>
                <TableCell>{tax.description}</TableCell>
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
