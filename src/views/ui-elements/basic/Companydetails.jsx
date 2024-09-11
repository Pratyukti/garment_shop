import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

const Companydetails = () => {
  const [companyDetails, setCompanyDetails] = useState({
    company_name: '',
    gst:'',
    phone_number: '',
    email: '',
    address: ''
  });

  const [loading, setLoading] = useState({
    add: false,
    save: false,
    update: false,
    delete: false
  });

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });
    // Simulate add logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Added", companyDetails);
    setLoading({ ...loading, add: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, save: true });
    // Simulate save logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saved", companyDetails);
    setLoading({ ...loading, save: false });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, update: true });
    // Simulate update logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Updated", companyDetails);
    setLoading({ ...loading, update: false });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, delete: true });
    // Simulate delete logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Deleted", companyDetails);
    setLoading({ ...loading, delete: false });
  };

  return (
    <Box 
      sx={{ 
        maxWidth: '100%', 
        padding: 2, 
        backgroundColor: '#eeeaef',  // Light background color
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: 'blue' }}
            onClick={handleAdd}
            disabled={loading.add}  // Disable button when loading
          >
            {loading.add ? <CircularProgress size={24} /> : "Add"}
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: 'sky' }}
            onClick={handleSubmit}
            disabled={loading.save}  // Disable button when loading
          >
            {loading.save ? <CircularProgress size={24} /> : "Save"}
          </Button>
          
          <Button
            variant="contained"
            color="success"
            sx={{ backgroundColor: 'green' }}
            onClick={handleUpdate}
            disabled={loading.update}  // Disable button when loading
          >
            {loading.update ? <CircularProgress size={24} /> : "Update"}
          </Button>
          
          <Button
            variant="contained"
            color="error"
            sx={{ backgroundColor: 'red' }}
            onClick={handleDelete}
            disabled={loading.delete}  // Disable button when loading
          >
            {loading.delete ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Companydetails;