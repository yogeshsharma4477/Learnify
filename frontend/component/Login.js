import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { signIn } from 'next-auth/react';
import { Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff, Email, PhoneIphone } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Grid, Button, Container } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import Input from './Templates/Input';
function Login() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [alreadyHasAccount, setAlreadyHasAccount] = useState(true)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div>
            <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Typography variant="h4" component="div" gutterBottom>  Learnify </Typography>
                    <Grid item xs={12} textAlign={'center'}  >
                        <FormControl sx={{ width: '50ch' }} variant="outlined">
                            <Button variant="contained" onClick={() => signIn('google')}
                                style={{ backgroundColor: '#4285F4', color: 'white', textTransform: 'none', padding: '10px 15px', }} startIcon={<GoogleIcon />} >
                                Sign in with Google
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        <Input type='text' label='Username' icon={<AccountCircle />} />
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        <Input type={showPassword ? 'text' : 'password'} label='Password' icon={showPassword ? <VisibilityOff /> : <Visibility />} />
                    </Grid>
                    {
                        !alreadyHasAccount &&
                        <>
                            <Grid item xs={12} textAlign={'center'}>
                                <Input type='number' label='Phone' icon={<PhoneIphone />} />
                            </Grid>
                            <Grid item xs={12} textAlign={'center'}>
                                <Input type='email' label='Email' icon={<Email />} />
                            </Grid>
                        </>
                    }
                    <Grid item xs={12} textAlign={'center'}  >
                        <FormControl sx={{ width: '50ch' }} variant="outlined">
                            <Button variant="outlined" color="primary" >{alreadyHasAccount ? "Log in " : 'Sign up'} </Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" align="center"> {alreadyHasAccount ? "Don't have an account?" : " Already have an account?"}
                            <Button color="primary"
                                onClick={() => setAlreadyHasAccount(!alreadyHasAccount)}>
                                {alreadyHasAccount ? 'Sign up' : "Log in "}
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Login