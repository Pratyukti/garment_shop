import React, { useState, useRef } from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function Userdetails() {
  const [userDetails, setUserDetails] = useState({
    username: '',
    fullName: '',
    email: '',
    contactNumber: '',
    role: '',
    password: '',
    description: ''
  });

  const [userList, setUserList] = useState([]); // List to hold all user entries
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the user being edited

  const [confirmOpen, setConfirmOpen] = useState(false); // State to control confirmation dialog visibility
  const [deleteIndex, setDeleteIndex] = useState(null); // Track index of the user to be deleted

  // Refs for form fields
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const contactNumberRef = useRef(null);
  const roleRef = useRef(null);
  const passwordRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog when "Add User" button is clicked
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
      const updatedList = [...userList];
      updatedList[editIndex] = userDetails;
      setUserList(updatedList);
      console.log("Updated", userDetails);
    } else {
      // Add logic
      setUserList([...userList, userDetails]);
      console.log("Added", userDetails);
    }

    // Reset the form and state
    setLoading({ ...loading, add: false });
    setUserDetails({
      username: '',
      fullName: '',
      email: '',
      contactNumber: '',
      role: '',
      password: '',
      description: ''
    });
    setOpen(false); // Close the dialog after adding or updating
  };

  const handleEdit = (index) => {
    setUserDetails(userList[index]); // Populate form with the selected user's details
    setEditIndex(index); // Set the index of the user being edited
    setOpen(true); // Open the dialog to edit
  };

  const handleDeleteConfirmation = (index) => {
    setDeleteIndex(index); // Store the index of the item to be deleted
    setConfirmOpen(true); // Open the confirmation dialog
  };

  const handleDelete = () => {
    const updatedList = userList.filter((_, i) => i !== deleteIndex); // Remove the selected user
    setUserList(updatedList);
    console.log("Deleted user at index", deleteIndex);
    setConfirmOpen(false); // Close the confirmation dialog
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false); // Close the confirmation dialog without deleting
  };

  // Function to handle Enter key press
  const handleKeyPress = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (nextRef.current) {
        nextRef.current.focus(); // Focus on the next field
      }
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add User Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit User' : 'Add User'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{backgroundColor:'#f9dff5'}}>{editIndex !== null ? 'Edit User Details' : 'Add User Details'}</DialogTitle>
        <DialogContent style={{backgroundColor:'#f9dff5'}}>
          <Paper sx={{ padding: "10px" , backgroundColor: "#f9dff5"}} elevation={0}>
            <form>
              {/* User Name */}
              <TextField
                fullWidth
                label="User Name"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={usernameRef}
                onKeyDown={(e) => handleKeyPress(e, fullNameRef)}
              />

              {/* Full Name */}
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={userDetails.fullName}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={fullNameRef}
                onKeyDown={(e) => handleKeyPress(e, emailRef)}
              />

              {/* Email Address */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={userDetails.email}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={emailRef}
                onKeyDown={(e) => handleKeyPress(e, contactNumberRef)}
              />

              {/* Contact Number */}
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={userDetails.contactNumber}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={contactNumberRef}
                onKeyDown={(e) => handleKeyPress(e, roleRef)}
              />

              {/* Role */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Role</InputLabel>
                <Select
                  value={userDetails.role}
                  name="role"
                  onChange={handleChange}
                  label="Role"
                  inputRef={roleRef}
                  onKeyDown={(e) => handleKeyPress(e, passwordRef)}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </Select>
              </FormControl>

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={userDetails.password}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={passwordRef}
                onKeyDown={(e) => handleKeyPress(e, descriptionRef)}
              />

              {/* Description */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={userDetails.description}
                onChange={handleChange}
                margin="normal"
                inputRef={descriptionRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission on Enter key
                  }
                }}
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

      {/* Table to Display User Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contactNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.description}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirmation(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
