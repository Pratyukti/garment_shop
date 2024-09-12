import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';

const PrinterSetting = () => {
  const [printerSettings, setPrinterSettings] = useState({
    defaultPrinter: '',
    paperSize: '',
    printFormat: '',
    numberOfCopies: 1,
    margins: '',
    saveGlobally: false,
  });

  const [openPreview, setOpenPreview] = useState(false);

  const handleChange = (e) => {
    setPrinterSettings({
      ...printerSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setPrinterSettings({
      ...printerSettings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Printer Settings:', printerSettings);
    // Add your submit logic here
  };

  const handlePreviewOpen = () => {
    setOpenPreview(true);
  };

  const handlePreviewClose = () => {
    setOpenPreview(false);
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 2,
        
      }}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        {/* Default Printer TextField */}
        <Grid item xs={12}>
          <TextField
            label="Default Printer"
            name="defaultPrinter"
            fullWidth
            value={printerSettings.defaultPrinter}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Paper Size Select */}
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Paper Size</InputLabel>
            <Select
              name="paperSize"
              value={printerSettings.paperSize}
              onChange={handleChange}
              label="Paper Size"
            >
              <MenuItem value="A4">A4</MenuItem>
              <MenuItem value="A5">A5</MenuItem>
              <MenuItem value="Custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Print Format Select */}
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Print Format</InputLabel>
            <Select
              name="printFormat"
              value={printerSettings.printFormat}
              onChange={handleChange}
              label="Print Format"
            >
              <MenuItem value="Portrait">Portrait</MenuItem>
              <MenuItem value="Landscape">Landscape</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Number of Copies TextField */}
        <Grid item xs={12}>
          <TextField
            label="Number of Copies"
            name="numberOfCopies"
            type="number"
            fullWidth
            value={printerSettings.numberOfCopies}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Margins TextField */}
        <Grid item xs={12}>
          <TextField
            label="Margins"
            name="margins"
            placeholder="e.g., 10px 15px 10px 15px"
            fullWidth
            value={printerSettings.margins}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Save Globally Checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="saveGlobally"
                checked={printerSettings.saveGlobally}
                onChange={handleCheckboxChange}
              />
            }
            label="Save configuration globally"
          />
        </Grid>

        {/* Save and Preview Buttons */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Save Settings
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handlePreviewOpen}
          >
            Preview
          </Button>
        </Grid>
      </Grid>

      {/* Preview Modal */}
      <Dialog open={openPreview} onClose={handlePreviewClose}>
        <DialogTitle>Preview Printer Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1"><strong>Default Printer:</strong> {printerSettings.defaultPrinter}</Typography>
          <Typography variant="body1"><strong>Paper Size:</strong> {printerSettings.paperSize}</Typography>
          <Typography variant="body1"><strong>Print Format:</strong> {printerSettings.printFormat}</Typography>
          <Typography variant="body1"><strong>Number of Copies:</strong> {printerSettings.numberOfCopies}</Typography>
          <Typography variant="body1"><strong>Margins:</strong> {printerSettings.margins}</Typography>
          <Typography variant="body1"><strong>Save Globally:</strong> {printerSettings.saveGlobally ? 'Yes' : 'No'}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrinterSetting;
