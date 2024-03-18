import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import SnackBar from '@mui/material/Snackbar';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '../API/buildingsAPI';
import { saveToken } from '../Utils/auth';

export default function Login({ setIsManager }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigate();

    const [snackOpen, setSnackOpen] = useState(false);

    function handleClose(_, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    }

    async function sub(e) {
        e.preventDefault();
        try {
            saveToken(await login({ username, password }));
            setIsManager(true);
            nav("/");
        }
        catch (err) {
            setSnackOpen(true);
        }
    }

    return <Container sx={{ marginTop: '3%' }}>

        <SnackBar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            message='Some is broken, try again'
        />

        <form onSubmit={sub}>
            <Stack>
                <Typography align='center'>Sign in</Typography>
                <TextField value={username}
                    onChange={({ target: { value } }) => setUsername(value)}
                    label='Username'
                    required
                    margin='dense'
                />
                <TextField value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    label='Password'
                    required
                    margin='dense'
                />
                <Button type='submit' variant='contained'>Submit</Button>
            </Stack>
        </form>

    </Container>
}