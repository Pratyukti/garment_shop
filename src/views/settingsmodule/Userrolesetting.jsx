import React, { useState } from 'react';
import {
  TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem,
  Select, InputLabel, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel, Checkbox,
  DialogContentText
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function RoleForm() {
  const [roleDetails, setRoleDetails] = useState({
    roleName: '',
    userName: '',
    permissions: [],
    status: 'Active'
  });

  const [roleList, setRoleList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleDetails({
      ...roleDetails,
      [name]: value
    });
  };

  const handlePermissionsChange = (e) => {
    const { value, checked } = e.target;
    setRoleDetails((prevDetails) => {
      const permissions = checked
        ? [...prevDetails.permissions, value]
        : prevDetails.permissions.filter((permission) => permission !== value);
      return { ...prevDetails, permissions };
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

    if (editIndex !== null) {
      const updatedList = [...roleList];
      updatedList[editIndex] = roleDetails;
      setRoleList(updatedList);
    } else {
      setRoleList([...roleList, roleDetails]);
    }

    setRoleDetails({
      roleName: '',
      userName: '',
      permissions: [],
      status: 'Active'
    });
    setOpen(false);
  };

  const handleEdit = (index) => {
    setRoleDetails(roleList[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteConfirmation = (index) => {
    setDeleteIndex(index);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = () => {
    const updatedList = roleList.filter((_, i) => i !== deleteIndex);
    setRoleList(updatedList);
    setConfirmDeleteOpen(false);
    setDeleteIndex(null);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Role' : 'Add Role'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{backgroundColor:'#f9dff5'}}>{editIndex !== null ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent style={{backgroundColor:'#f9dff5'}}>
          <Paper sx={{ padding: '10px' ,backgroundColor:'#f9dff5'}}elevation={0}>
            <form>
              {/* Role Name (Select box) */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Role Name</InputLabel>
                <Select
                  value={roleDetails.roleName}
                  name="roleName"
                  onChange={handleChange}
                  label="Role Name"
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Salesperson">Salesperson</MenuItem>
                </Select>
              </FormControl>

              {/* User Name (TextField) */}
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                value={roleDetails.userName}
                onChange={handleChange}
                margin="normal"
                required
              />

              {/* Permissions (Select box with checkboxes) */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Permissions</InputLabel>
                <Select
                  multiple
                  value={roleDetails.permissions}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {['Module1', 'Module2', 'Module3'].map((permission) => (
                    <MenuItem key={permission} value={permission}>
                      <Checkbox
                        checked={roleDetails.permissions.includes(permission)}
                        onChange={handlePermissionsChange}
                        value={permission}
                      />
                      {permission}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Status (Radio button) */}
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  name="status"
                  value={roleDetails.status}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Active" control={<Radio />} label="Active" />
                  <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                </RadioGroup>
              </FormControl>
            </form>
          </Paper>
        </DialogContent>
        <DialogActions style={{backgroundColor:'#f9dff5'}}>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleAddOrUpdate} color="secondary">
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleList.map((role, index) => (
              <TableRow key={index}>
                <TableCell>{role.roleName}</TableCell>
                <TableCell>{role.userName}</TableCell>
                <TableCell>{role.permissions.join(', ')}</TableCell>
                <TableCell>{role.status}</TableCell>
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
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this role?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
