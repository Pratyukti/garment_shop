import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function FinancialYearForm() {
  const [financialYearDetails, setFinancialYearDetails] = useState({
    startDate: '',
    endDate: '',
    status: 'Active',
    financialYearName: '',
    description: ''
  });

  const [financialYearList, setFinancialYearList] = useState([]);
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // State for the delete confirmation dialog
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    // Automatically generate the financial year name based on the selected start and end dates
    if (financialYearDetails.startDate && financialYearDetails.endDate) {
      const startYear = new Date(financialYearDetails.startDate).getFullYear();
      const endYear = new Date(financialYearDetails.endDate).getFullYear();
      setFinancialYearDetails({
        ...financialYearDetails,
        financialYearName: `${startYear}-${endYear}`
      });
    }
  }, [financialYearDetails.startDate, financialYearDetails.endDate]);

  const handleChange = (e) => {
    setFinancialYearDetails({
      ...financialYearDetails,
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

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });

    if (editIndex !== null) {
      const updatedList = [...financialYearList];
      updatedList[editIndex] = financialYearDetails;
      setFinancialYearList(updatedList);
      console.log("Updated", financialYearDetails);
    } else {
      setFinancialYearList([...financialYearList, financialYearDetails]);
      console.log("Added", financialYearDetails);
    }

    setLoading({ ...loading, add: false });
    setFinancialYearDetails({
      startDate: '',
      endDate: '',
      status: 'Active',
      financialYearName: '',
      description: ''
    });
    setOpen(false);
  };

  const handleEdit = (index) => {
    setFinancialYearDetails(financialYearList[index]);
    setEditIndex(index);
    setOpen(true);
  };

  // Open delete confirmation dialog
  const handleOpenDeleteConfirm = (index) => {
    setDeleteIndex(index);
    setOpenDeleteConfirm(true);
  };

  // Confirm delete and remove the item from the list
  const handleDelete = () => {
    const updatedList = financialYearList.filter((_, i) => i !== deleteIndex);
    setFinancialYearList(updatedList);
    console.log("Deleted financial year at index", deleteIndex);
    setOpenDeleteConfirm(false);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Financial Year' : 'Add Financial Year'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{backgroundColor:'#f9dff5'}}>{editIndex !== null ? 'Edit Financial Year' : 'Add Financial Year'}</DialogTitle>
        <DialogContent style={{backgroundColor:'#f9dff5'}}>
          <Paper sx={{ padding: "10px" , backgroundColor: "#f9dff5"}} elevation={0}>
            <form>
              {/* Start Date */}
              <TextField
                fullWidth
                label="Financial Year Start Date"
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={financialYearDetails.startDate}
                onChange={handleChange}
                margin="normal"
                required
              />

              {/* End Date */}
              <TextField
                fullWidth
                label="Financial Year End Date"
                name="endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={financialYearDetails.endDate}
                onChange={handleChange}
                margin="normal"
                required
              />

              {/* Status */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={financialYearDetails.status}
                  name="status"
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>

              {/* Financial Year Name (Auto-generated) */}
              <TextField
                fullWidth
                label="Financial Year Name"
                name="financialYearName"
                value={financialYearDetails.financialYearName}
                InputProps={{
                  readOnly: true
                }}
                margin="normal"
              />

              {/* Description */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={financialYearDetails.description}
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

      {/* Table to Display Financial Year Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Financial Year Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financialYearList.map((year, index) => (
              <TableRow key={index}>
                <TableCell>{year.financialYearName}</TableCell>
                <TableCell>{year.startDate}</TableCell>
                <TableCell>{year.endDate}</TableCell>
                <TableCell>{year.status}</TableCell>
                <TableCell>{year.description}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleOpenDeleteConfirm(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)}>
        <DialogTitle>Delete Financial Year</DialogTitle>
        <DialogContent>Are you sure you want to delete this financial year?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
