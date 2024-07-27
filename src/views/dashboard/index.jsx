import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput, IconButton, } from '@mui/material';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { Box, style } from '@mui/system';
import { Formik, FieldArray } from 'formik';
// ==============================|| DEFAULT DASHBOARD ||============================== //
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
const GreenDiv = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  backgroundColor: 'green',
  borderRadius: '50%'
}));
const RedDiv = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  backgroundColor: 'red',
  borderRadius: '50%'
}));


const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [id , setId] = useState(null)
  const [current , setCurrent] = useState({})
  const navigate  =useNavigate()
  const handleClickOpen = (box) => {
    // console.log(box);
    setOpen(true);
    setId(box._id)
    setCurrent(box)

  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setLoading] = useState(true);
  const [box, setBox] = useState([])
  // console.log(box.boxName);
  var token = localStorage.getItem('auth')
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get('https://box-cricket-api.onrender.com/boxbyowner', {
      headers: {
        auth: token
      }
    })
      .then((res) => {
        console.log(res.data.data);
        setBox(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {

  })
  const handleDelete = (id) => {
    // console.log(id);
    axios.delete(`https://box-cricket-api.onrender.com/deletebox/${id}`)
      .then((res) => {
        // console.log(res);
        getData()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label="caption table">
                  {/* <caption>A basic table example with a caption</caption> */}
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell align="center">Box name</TableCell>
                      <TableCell align="center">Morning Price</TableCell>
                      <TableCell align="center">Night Price</TableCell>
                      <TableCell align="center">status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {box.map((el, i) => (

                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {el.boxName}
                        </TableCell>
                        <TableCell align="center">{el.boxName}</TableCell>
                        <TableCell align="center">
                          {el.opning.morning.morningPrice}
                        </TableCell>
                        <TableCell align="center">
                          {el.opning.night.nightPrice}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                              el.status === 'Pending' ? <RedDiv sx={{ marginRight: '5px' }} /> : <GreenDiv sx={{ marginRight: '5px' }} />
                            }

                            {el.status}
                          </Box>
                        </TableCell>
                        <TableCell align="right" width={'300px'}>
                          <Button onClick={() => navigate(`/utils/box-show/${el._id}`)} ><FaRegEye /></Button>
                          <Button onClick={() => handleDelete(el._id)}>Delete</Button>
                          <Button onClick={() => handleClickOpen(el)}>Edit</Button>
                        </TableCell>
                        {/* <TableCell align="right">
                        </TableCell> */}
                        <Dialog
                          fullScreen={fullScreen}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">
                            {"Update your box"}
                          </DialogTitle>
                          <DialogContent>
                            <Formik
                              initialValues={{
                                boxName:  current.boxName || '',
                                images: current.images || [],
                                contact: current.contact || [],
                                street: current.address?.street || '',
                                city: current.address?.city || '',
                                state: current.address?.state || '',
                                area: current.address?.area || '',
                                pinCode: current.address?.pinCode || '',
                                country: current.address?.country || '',  
                                morningPrice: current.opning?.morning?.morningPrice || '',
                                nightPrice: current.opning?.night?.nightPrice || ''
                              }}
                              onSubmit={(values, { resetForm }) => {
                                // console.log(values);

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
                                axios.put(`https://box-cricket-api.onrender.com/updatebox/${id}`, formValues, {
                                  headers: {
                                    auth: token,
                                    "Content-Type": "multipart/form-data"
                                  }
                                })
                                  .then((res) => {
                                    // console.log(res);
                                    resetForm()
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  })
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
                                        {/* <InputLabel htmlFor={`images[${index}]`}>Image {index + 1}</InputLabel> */}
                                        <input type="file" onChange={(e) => setFieldValue("images", e.target.files)} multiple />

                                      </FormControl>
                                    </Grid>

                                    <FormControl fullWidth margin="normal">
                                      <InputLabel htmlFor="contact">Contact</InputLabel>
                                      <OutlinedInput
                                        id="contact"
                                        type="number"
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

                                  <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                      Disagree
                                    </Button>
                                 
                                    <Button variant="contained" color="primary" type="submit" onClick={handleClose}  autoFocus>
                                      Submit
                                    </Button>
                                  </DialogActions>
                                </form>
                              )}
                            </Formik>
                          </DialogContent>

                        </Dialog>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
