import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function sub(e) {
        e.preventDefault();
    }

    return <div>

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
        >
            <Grid item>
                <form onSubmit={sub}>
                    <Stack>
                        <TextField value={username}
                            onChange={({ target: { value } }) => setUsername(value)}
                            placeholder='Username'
                            required
                        />
                        <TextField value={password}
                            onChange={({ target: { value } }) => setPassword(value)}
                            placeholder='Password'
                            required
                        />
                        <Button type='submit' variant='contained'>Submit</Button>
                    </Stack>
                </form>
            </Grid>
        </Grid>

    </div>
}