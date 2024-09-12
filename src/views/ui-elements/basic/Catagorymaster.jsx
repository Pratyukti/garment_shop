// import React, { useState } from 'react';
// import { TextField, Button, Box, CircularProgress } from '@mui/material';

// const Catagorymaster = () => {
//   const [catagoryMaster, setCatagoryMaster] = useState({
//     catagory_name: '',
//     catagory_code:'',
//     description: '',
    
//   });

//   const [loading, setLoading] = useState({
//     add: false,
//     save: false,
//     update: false,
//     delete: false
//   });

//   const handleChange = (e) => {
//     setCatagoryMaster({
//       ...catagoryMaster,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     setLoading({ ...loading, add: true });
//     // Simulate add logic with delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log("Added", catagoryMaster);
//     setLoading({ ...loading, add: false });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading({ ...loading, save: true });
//     // Simulate save logic with delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log("Saved", catagoryMaster);
//     setLoading({ ...loading, save: false });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading({ ...loading, update: true });
//     // Simulate update logic with delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log("Updated", catagoryMaster);
//     setLoading({ ...loading, update: false });
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     setLoading({ ...loading, delete: true });
//     // Simulate delete logic with delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log("Deleted", catagoryMaster);
//     setLoading({ ...loading, delete: false });
//   };

//   return (
//     <Box 
//       sx={{ 
//         maxWidth: '100%', 
//         padding: 2, 
//         backgroundColor: '#f2eef2',  // Light background color
//         borderRadius: 2,
//         boxShadow: 1,
//       }}
//     >
//       <form>
//         <TextField
//           fullWidth
//           label="Catagory Name"
//           name="catagory_name"
//           value={catagoryMaster.catagory_name}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Catagory Number"
//           name="catagory_code"
//           value={catagoryMaster.catagory_code}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
      
        
//         <TextField
//           fullWidth
//           multiline
//           rows={4}
//           label="Description"
//           name="description"
//           value={catagoryMaster.description}
//           onChange={handleChange}
//           margin="normal"
//         />

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ backgroundColor: 'blue' }}
//             onClick={handleAdd}
//             disabled={loading.add}  // Disable button when loading
//           >
//             {loading.add ? <CircularProgress size={24} /> : "Add"}
//           </Button>
          
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ backgroundColor: 'sky' }}
//             onClick={handleSubmit}
//             disabled={loading.save}  // Disable button when loading
//           >
//             {loading.save ? <CircularProgress size={24} /> : "Save"}
//           </Button>
          
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ backgroundColor: 'green' }}
//             onClick={handleUpdate}
//             disabled={loading.update}  // Disable button when loading
//           >
//             {loading.update ? <CircularProgress size={24} /> : "Update"}
//           </Button>
          
//           <Button
//             variant="contained"
//             color="error"
//             sx={{ backgroundColor: 'red' }}
//             onClick={handleDelete}
//             disabled={loading.delete}  // Disable button when loading
//           >
//             {loading.delete ? <CircularProgress size={24} /> : "Delete"}
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default Catagorymaster;






import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
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
    const updatedList = categoryList.filter((_, i) => i !== index);  // Remove the selected category
    setCategoryList(updatedList);
    console.log("Deleted category at index", index);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add Category Button */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Category' : 'Add Category'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Category Details' : 'Add Category Details'}</DialogTitle>
        <DialogContent>
          <Paper sx={{ padding: "10px" }}>
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
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="primary" disabled={loading.add}>
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
