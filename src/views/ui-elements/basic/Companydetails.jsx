import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function SimplePaper() {
  const [companyDetails, setCompanyDetails] = useState({
    company_name: '',
    gst: '',
    phone_number: '',
    email: '',
    address: ''
  });

  const [companyList, setCompanyList] = useState([]);  // List to hold all company entries
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false);  // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the company being edited

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
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
      const updatedList = [...companyList];
      updatedList[editIndex] = companyDetails;
      setCompanyList(updatedList);
      console.log("Updated", companyDetails);
    } else {
      // Add logic
      setCompanyList([...companyList, companyDetails]);
      console.log("Added", companyDetails);
    }

    // Reset the form and state
    setLoading({ ...loading, add: false });
    setCompanyDetails({
      company_name: '',
      gst: '',
      phone_number: '',
      email: '',
      address: ''
    });
    setOpen(false);  // Close the dialog after adding or updating
  };

  const handleEdit = (index) => {
    setCompanyDetails(companyList[index]);  // Populate form with the selected company's details
    setEditIndex(index);  // Set the index of the company being edited
    setOpen(true);  // Open the dialog to edit
  };

  const handleDelete = (index) => {
    const updatedList = companyList.filter((_, i) => i !== index);  // Remove the selected company
    setCompanyList(updatedList);
    console.log("Deleted company at index", index);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2}}>
      {/* Add Company Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Company' : 'Add Company'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Company Details' : 'Add Company Details'}</DialogTitle>
        <DialogContent>
          <Paper sx={{ padding: "10px" , backgroundColor: "#f4ebfe"}}>
            <form>
              <TextField
                fullWidth
                label="Company Name"
                name="company_name"
                value={companyDetails.company_name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Company Registration Number/GST Number"
                name="gst"
                value={companyDetails.gst}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={companyDetails.phone_number}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={companyDetails.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Address"
                name="address"
                value={companyDetails.address}
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

      {/* Table to Display Company Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyList.map((company, index) => (
              <TableRow key={index}>
                <TableCell>{company.company_name}</TableCell>
                <TableCell>{company.gst}</TableCell>
                <TableCell>{company.phone_number}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.address}</TableCell>
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