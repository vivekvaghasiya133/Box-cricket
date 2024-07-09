import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Formik, FieldArray } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput, IconButton, Grid } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

// import { Token } from '@mui/icons-material';
// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => {
  const token = localStorage.getItem('auth');
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal } = state;

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <MainCard title="Add Your Box" secondary={<SecondaryAction />}>
      <h1>My Form</h1>
      <Formik
        initialValues={{
          boxName: '',
          images: [],
          contact: '',
          street: '',
          city: '',
          state: '',
          area: '',
          pinCode: '',
          country: '',
          morningPrice: '',
          nightPrice: ''
        }}
        onSubmit={(values, { resetForm }) => {
          // console.log(values);

          let formValues = new FormData();
          formValues.append("boxName", values.boxName);
          for (let i = 0; i < values.images.length; i++) {
            formValues.append('images', values.images[i]);
          }
          formValues.append("contact", values.contact);
          formValues.append("street", values.street);
          formValues.append("city", values.city);
          formValues.append("state", values.state);
          formValues.append("area", values.area);
          formValues.append("pinCode", values.pinCode);
          formValues.append("country", values.country);
          formValues.append("morningPrice", values.morningPrice);
          formValues.append("nightPrice", values.nightPrice);
          
          axios.post('http://localhost:3000/addbox', formValues, {
            headers: {
              auth: token,
              "Content-Type": "multipart/form-data"
            }
          })
            .then((res) => {
              // console.log(res);
              resetForm();
              setError(null); // Clear the error if submission is successful
              setSnackbarOpen(true); // Show success message
            })
            .catch((err) => {
              // console.log(err.response.data, "Error");
              setError(err.response.data.message);
              setSnackbarOpen(true); // Open Snackbar on error
            });
        }}
      >
        {({ errors, values, touched, setFieldValue, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="boxName">Box Name</InputLabel>
                  <OutlinedInput
                    id="boxName"
                    type="text"
                    value={values.boxName}
                    name="boxName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Box Name"
                  />
                  {touched.boxName && errors.boxName && (
                    <FormHelperText error id="helper-text-boxName">
                      {errors.boxName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <input
                    type="file"
                    onChange={(e) => setFieldValue("images", e.target.files)}
                    multiple
                  />
                </FormControl>
              </Grid>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="contact">Contact</InputLabel>
                <OutlinedInput
                  id="contact"
                  type="text"
                  value={values.contact}
                  name="contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="contact"
                />
                {touched.contact && errors.contact && (
                  <FormHelperText error id="helper-text-contact">
                    {errors.contact}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="street">Street</InputLabel>
                <OutlinedInput
                  id="street"
                  type="text"
                  value={values.street}
                  name="street"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Street"
                />
                {touched.street && errors.street && (
                  <FormHelperText error id="helper-text-street">
                    {errors.street}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="area">Area</InputLabel>
                <OutlinedInput
                  id="area"
                  type="text"
                  value={values.area}
                  name="area"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Area"
                />
                {touched.area && errors.area && (
                  <FormHelperText error id="helper-text-area">
                    {errors.area}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="city">City</InputLabel>
                <OutlinedInput
                  id="city"
                  type="text"
                  value={values.city}
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="City"
                />
                {touched.city && errors.city && (
                  <FormHelperText error id="helper-text-city">
                    {errors.city}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="state">State</InputLabel>
                <OutlinedInput
                  id="state"
                  type="text"
                  value={values.state}
                  name="state"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="State"
                />
                {touched.state && errors.state && (
                  <FormHelperText error id="helper-text-state">
                    {errors.state}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="pinCode">Pin Code</InputLabel>
                <OutlinedInput
                  id="pinCode"
                  type="text"
                  value={values.pinCode}
                  name="pinCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Pin Code"
                />
                {touched.pinCode && errors.pinCode && (
                  <FormHelperText error id="helper-text-pinCode">
                    {errors.pinCode}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="country">Country</InputLabel>
                <OutlinedInput
                  id="country"
                  type="text"
                  value={values.country}
                  name="country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Country"
                />
                {touched.country && errors.country && (
                  <FormHelperText error id="helper-text-country">
                    {errors.country}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="morningPrice">Morning Price</InputLabel>
                <OutlinedInput
                  id="morningPrice"
                  type="text"
                  value={values.morningPrice}
                  name="morningPrice"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Morning Price"
                />
                {touched.morningPrice && errors.morningPrice && (
                  <FormHelperText error id="helper-text-morningPrice">
                    {errors.morningPrice}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="nightPrice">Night Price</InputLabel>
                <OutlinedInput
                  id="nightPrice"
                  type="text"
                  value={values.nightPrice}
                  name="nightPrice"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Night Price"
                />
                {touched.nightPrice && errors.nightPrice && (
                  <FormHelperText error id="helper-text-nightPrice">
                    {errors.nightPrice}
                  </FormHelperText>
                )}
              </FormControl>

            </Grid>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackbarOpen}
          onClose={handleClose}
          message={error ? `${error}` : 'Box added successfully!'}
          key={vertical + horizontal}
        />
      </Box>
    </MainCard>
  );
};

export default Typography;
