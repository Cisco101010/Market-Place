import React, { useState, useRef, useEffect } from 'react';
import { Typography, Box, Button, TextField, Grid, Link, Snackbar, Alert, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Login() {
    const { loginUser, error } = useAuth();
    const history = useHistory();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const isMounted = useRef(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        
        localStorage.setItem('email', data.email);

        setLoading(true); 

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const responseMessage = await loginUser(data);
            if (isMounted.current) {
                if (responseMessage && responseMessage.msg === 'Código de verificación enviado a tu correo electrónico.') {
                    history.push('/verifytoken');
                } else if (responseMessage && responseMessage.msg === 'Logged in!') {
                    history.push('/');
                } else {
                    setOpenSnackbar(true);
                }
            }
        } catch (e) {
            if (isMounted.current) {
                setOpenSnackbar(true);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false); 
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <Box
            sx={{
                marginTop: 4, 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: '0 0 25px rgba(0, 128, 0, 0.6)', 
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'glow 1.5s infinite alternate', 
                }}
            >
                
                <Box
                    sx={{
                        m: 1,
                        width: 80,
                        height: 80,
                        borderRadius: '50%', 
                        bgcolor: '#4CAF50', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ArrowDropDownIcon sx={{ color: 'white', fontSize: 50 }} />
                </Box>
                <Typography component="h1" variant="h5" sx={{ mt: 2, color: '#4CAF50' }}>
                    Silk Road
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        mt: 3,
                    }}
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!error}
                        helperText={error ? error : ''}
                        InputProps={{
                            sx: {
                                borderRadius: 2,  
                                border: '1px solid #ddd', 
                            },
                        }}
                        InputLabelProps={{
                            shrink: true, 
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        helperText={error ? error : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 2,  
                                border: '1px solid #ddd',  
                            },
                        }}
                        InputLabelProps={{
                            shrink: true, 
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            color: 'white',
                            bgcolor: '#4CAF50', 
                            '&:hover': {
                                bgcolor: '#45a049', 
                            },
                        }}
                        disabled={loading} 
                    >
                        {loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CircularProgress size={20} sx={{ color: 'white' }} />
                                <Typography sx={{ ml: 1, color: 'white', fontSize: '0.875rem' }}>Iniciando sesión...</Typography>
                            </Box>
                        ) : (
                            'Iniciar sesión'
                        )}
                    </Button>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Link
                                href="/register"
                                variant="body2"
                                sx={{
                                    mt: 2,
                                    fontSize: '0.875rem',
                                    color: '#4CAF50', 
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: '#45a049', 
                                    },
                                }}
                            >
                                No tienes una cuenta? Regístrate
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href="/forgot-password" 
                                variant="body2"
                                sx={{
                                    mt: 1,
                                    fontSize: '0.875rem',
                                    color: '#4CAF50',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: '#45a049', 
                                    },
                                }}
                            >
                                Olvidé mi contraseña
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {error || 'Ha ocurrido un error al iniciar sesión.'}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}