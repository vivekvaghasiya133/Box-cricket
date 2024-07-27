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
import Stack from '@mui/material/Stack';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

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

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));



function BoxShow() {
    const { id } = useParams()


    const [morningSlot, setMorningSlot] = useState([])
    const [nightSlot, setNightSlot] = useState([])
    const [morningPrice, setMorningPrice] = useState(null)
    const [nightPrice, setNightPrice] = useState(null)

    useEffect(() => {
        getSlot()
    }, [])
    const getSlot = async () => {
        try {
            const res = await axios.get(`https://box-cricket-api.onrender.com/getshifts/${id}`);
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
    const handleSwitchChange = (time, checked) => {
        // Update your state or perform any action needed with the exact key and checked value
        console.log(`Time: ${time}, Checked: ${checked}`);
        // Example update logic
        setNightSlot(prevNightSlot => prevNightSlot.map(([t, v]) => t === time ? [t, checked] : [t, v]));
    };


    return (
        <MainCard title="Today Shift Status" >
            <Box>
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
                    Box Name :
                </Typography>

                <Grid container>
                    <Grid md={6} xs={12}>
                        <Box sx={{ width: '95%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6', marginTop: '50px' }}>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', fontWeight: '600' }}>Time</Box>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', textAlign: 'end', fontWeight: '600' }}>Status </Box>
                        </Box>
                        <Box sx={{ width: '95%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6' }}>

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
                                                    control={<IOSSwitch sx={{ m: 1 }} checked={value} onChange={(e) => handleSwitchChange(time, e.target.checked)} />}
                                                />
                                            </FormGroup>
                                        </Box>
                                    </Box>
                                );
                            })}

                        </Box>
                    </Grid>
                    <Grid md={6} xs={12}>
                        <Box sx={{ width: '95%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6', marginTop: '50px' }}>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', fontWeight: '600' }}>Time</Box>
                            <Box sx={{ width: '50%', padding: '10px', color: '#616161', textAlign: 'end', fontWeight: '600' }}>Status </Box>
                        </Box>
                        <Box sx={{ width: '95%', display: 'flex', flexWrap: 'wrap', border: '1px solid #e6e6e6' }}>

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
                                                    control={<IOSSwitch sx={{ m: 1 }} checked={value} onChange={(e) => handleSwitchChange(time, e.target.checked)} />}
                                                />
                                            </FormGroup>
                                        </Box>
                                    </Box>
                                );
                            })}

                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    )
}

export default BoxShow
