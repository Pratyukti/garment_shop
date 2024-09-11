import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

const Catagorymaster = () => {
  const [catagoryMaster, setCatagoryMaster] = useState({
    catagory_name: '',
    catagory_code:'',
    description: '',
    
  });

  const [loading, setLoading] = useState({
    add: false,
    save: false,
    update: false,
    delete: false
  });

  const handleChange = (e) => {
    setCatagoryMaster({
      ...catagoryMaster,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });
    // Simulate add logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Added", catagoryMaster);
    setLoading({ ...loading, add: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, save: true });
    // Simulate save logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saved", catagoryMaster);
    setLoading({ ...loading, save: false });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, update: true });
    // Simulate update logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Updated", catagoryMaster);
    setLoading({ ...loading, update: false });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, delete: true });
    // Simulate delete logic with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Deleted", catagoryMaster);
    setLoading({ ...loading, delete: false });
  };

  return (
    <Box 
      sx={{ 
        maxWidth: '100%', 
        padding: 2, 
        backgroundColor: '#f2eef2',  // Light background color
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <form>
        <TextField
          fullWidth
          label="Catagory Name"
          name="catagory_name"
          value={catagoryMaster.catagory_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Catagory Number"
          name="catagory_code"
          value={catagoryMaster.catagory_code}
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
          value={catagoryMaster.description}
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

export default Catagorymaster;