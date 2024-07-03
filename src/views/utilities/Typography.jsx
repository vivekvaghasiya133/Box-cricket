import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Formik, FieldArray } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput, IconButton, Grid } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

// import { Token } from '@mui/icons-material';
// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => {
  var token = localStorage.getItem('auth')
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
          area : '',
          pinCode: '',
          country: '',
          morningPrice:'',
          nightPrice :''
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);

          let formValues = new FormData()
          formValues.append("boxName", values.boxName)
           for (let i = 0; i < values.images.length; i++) {
            formValues.append('images', values.images[i]);
          }
          formValues.append("contact", values.contact)
          formValues.append("street", values.street)
          formValues.append("city", values.city)
          formValues.append("state", values.state)
          formValues.append("area", values.area)
          formValues.append("pinCode", values.pinCode)
          formValues.append("country", values.country)
          formValues.append("morningPrice", values.morningPrice)
          formValues.append("nightPrice", values.nightPrice)
          axios.post('http://localhost:3000/addbox', formValues, {
            headers: {
              auth: token,
              "Content-Type": "multipart/form-data"
            }
          })
            .then((res) => {
              console.log(res);
              resetForm()
            })
            .catch((err) => {
              console.log(err);
            })
        }}
      >
        {({ errors, values, touched, setFieldValue,handleBlur, handleChange, handleSubmit }) => (
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
                {/* <FieldArray name="images">
                  {({ push, remove }) => (
                    <Box>
                      {values.images.map((_, index) => (
                        <FormControl fullWidth margin="normal" key={index}>
                  
                          <OutlinedInput
                            id={`images[${index}]`}
                            type="file"
                            name={`images[${index}]`}
                            onBlur={handleBlur}
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                values.images[index] = fileReader.result;
                                handleChange(event);
                              };
                              fileReader.readAsDataURL(file);
                            }}
                            label={`Image ${index + 1}`}
                          />
                          <IconButton onClick={() => remove(index)}>
                            <DeleteIcon />
                          </IconButton>
                          {touched.images && errors.images && (
                            <FormHelperText error id={`helper-text-images-${index}`}>
                              {errors.images[index]}
                            </FormHelperText>
                          )}
                        </FormControl>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => push('')}
                        startIcon={<AddIcon />}
                      >
                        Add Image
                      </Button>
                    </Box>
                  )}
                </FieldArray> */}
                <FormControl fullWidth margin="normal">
                  {/* <InputLabel htmlFor={`images[${index}]`}>Image {index + 1}</InputLabel> */}
                  <input type="file" onChange={(e) => setFieldValue("images", e.target.files)} multiple />
            
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
                <InputLabel htmlFor="street">Area</InputLabel>
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
                <InputLabel htmlFor="country">morningPrice</InputLabel>
                <OutlinedInput
                  id="morningPrice"
                  type="text"
                  value={values.morningPrice}
                  name="morningPrice"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="morningPrice"
                />
                {touched.morningPrice && errors.morningPrice && (
                  <FormHelperText error id="helper-text-country">
                    {errors.morningPrice}
                  </FormHelperText>
                )}
              </FormControl>


              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="country">nightPrice</InputLabel>
                <OutlinedInput
                  id="nightPrice"
                  type="text"
                  value={values.nightPrice}
                  name="nightPrice"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="nightPrice"
                />
                {touched.nightPrice && errors.nightPrice && (
                  <FormHelperText error id="helper-text-country">
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
    </MainCard>
  )
};

export default Typography;






