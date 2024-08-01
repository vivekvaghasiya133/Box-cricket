import React, { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

function BoxShow() {
    const { id } = useParams()

    const [box , setBox] = useState([])
    const [morningSlot, setMorningSlot] = useState([])
    const [nightSlot, setNightSlot] = useState([])
    const [morningPrice, setMorningPrice] = useState(null)
    const [nightPrice, setNightPrice] = useState(null)
    const [order , setOrder] = useState([])

    useEffect(() => {
        getSlot()
        getOrder()
    }, [])

    const getOrder = () => {
        axios.get(`http://localhost:3000/getorderbybox/${id}`)
        .then((res)=>{
            console.log(res.data.data);
            setOrder(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const getSlot = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/getshifts/${id}`);
            setBox([res.data.data])
            const morningShifts = res.data.data.opning.morning;
            const nightShifts = res.data.data.opning.night;
            setMorningPrice(res.data.data.opning.morning.morningPrice);
            setNightPrice(res.data.data.opning.night.nightPrice);
            setMorningSlot(Object.entries(morningShifts));
            setNightSlot(Object.entries(nightShifts));
        } catch (err) {
            console.log(err);
        }
    };
    const handleSwitchChange = (time, checked, shift) => {
        // Update your state or perform any action needed with the exact key and checked value
        console.log(`Time: ${time}, Checked: ${checked}`);


        let value = { shiftType: shift, timeSlots: [time], newValue: checked }

        axios.post(`http://localhost:3000/bookshift/${id}`, value)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })


        setNightSlot(prevNightSlot => prevNightSlot.map(([t, v]) => t === time ? [t, checked] : [t, v]));
    };


    return (
        <MainCard title="Today Shift Status" >
            <Box>
              {box.map((el)=>(
                  <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
                      Box Name : {el.boxName}
                  </Typography>
              ))}

                <Grid container>
                    <Grid md={6} xs={12}>
                        <Box sx={{ width: '99%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6', marginTop: '10px' }}>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', fontWeight: '600' }}>Time</Box>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', textAlign: 'end', fontWeight: '600' }}>Status </Box>
                        </Box>
                        <Box sx={{ width: '99%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6' }}>

                            {morningSlot.map(([time, value], index) => {
                                if (time === 'morningPrice') {
                                    return null;
                                }
                                return (
                                    <Box
                                        key={index}
                                        sx={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'space-between', border: '1px solid #e6e6e6' }}
                                    >
                                        <Box>{time}</Box>
                                        <Box sx={{ textAlign: 'end' }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} checked={value} onChange={(e) => handleSwitchChange(time, e.target.checked, 'morning')} />}
                                                />
                                            </FormGroup>
                                        </Box>
                                    </Box>
                                );
                            })}

                        </Box>
                    </Grid>
                    <Grid md={6} xs={12}>
                        <Box sx={{ width: '99%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6', marginTop: '10px' }}>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', fontWeight: '600' }}>Time</Box>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', textAlign: 'end', fontWeight: '600' }}>Status </Box>
                        </Box>
                        <Box sx={{ width: '99%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6' }}>

                            {nightSlot.map(([time, value], index) => {
                                if (time === 'nightPrice') {
                                    return null;
                                }
                                return (
                                    <Box
                                        key={index}
                                        sx={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'space-between', border: '1px solid #e6e6e6' }}
                                    >
                                        <Box>{time}</Box>
                                        <Box sx={{ textAlign: 'end' }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} checked={value} onChange={(e) => handleSwitchChange(time, e.target.checked, 'night')} />}
                                                />
                                            </FormGroup>
                                        </Box>
                                    </Box>
                                );
                            })}

                        </Box>

                    </Grid>
                </Grid>


                <Typography sx={{ fontWeight: '600', fontSize: '16px' , marginTop:'30px'}}>
                    Order :
                </Typography>

                <Box sx={{overflowX:'auto'}}>
                    <table width={'100%'} id="table1" style={{ marginTop: '10px' }}>
                        <thead>
                            <tr align='center'>

                                <th>No</th>
                                <th>Time</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((el, i) => (
                                <tr align='center' key={i}>
                                    <td>{i + 1}</td>
                                    <td>{el.time}</td>
                                    <td>{el.name}</td>
                                    <td>{el.phone}</td>
                                    <td>{el.email}</td>
                                    <td>{el.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </Box>
        </MainCard>
    )
}

export default BoxShow
