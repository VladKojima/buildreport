import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import AutoComplete from '@mui/material/Autocomplete';
import SnackBar from '@mui/material/Snackbar';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addTicket, getBuildingWithContaining } from '../API/buildingsAPI';

export default function Ticket() {

    const [objects, setObjects] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    const nav = useNavigate();

    const [snackOpen, setSnackOpen] = useState(false);

    function handleClose(_, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    }

    const timer = useRef();
    const field = useRef();

    const INPUT_TIMEOUT = 400;

    function inputStop({ target: { value } }) {
        clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            if (value !== field.current && value)
                getBuildingWithContaining(value).then(data => setObjects(data
                    .map(obj => { return { label: obj.title, id: obj.id } })
                )).catch(() => setSnackOpen(true));
            field.current = value;
        }, INPUT_TIMEOUT);
    }

    async function sub(e) {
        e.preventDefault();
        try {
            await addTicket({ ...Object.fromEntries(new FormData(e.target)), buildingId: selectedId });
            nav('/');
        }
        catch (err) {
            setSnackOpen(true);
        }
    }

    return <Container>

        <SnackBar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            message='Some is broken, try again'
        />

        <form onSubmit={sub} sx={{ marginTop: '3%' }}>
            <Stack>
                <Typography align='center'>Ticket</Typography>
                <AutoComplete
                    options={objects}
                    renderInput={params => <TextField {...params}
                        placeholder="Begin enter title"
                        label="Object" required
                    />}
                    onInputChange={inputStop}
                    noOptionsText="No objects found"
                    onChange={(_, value) => setSelectedId(value.id)}
                />
                <TextField
                    label='Email'
                    type='email'
                    required
                    margin='dense'
                    name='email'
                />
                <TextField
                    label='Title'
                    required
                    margin='dense'
                    name='title'
                />
                <TextField
                    label='Desc'
                    required
                    margin='dense'
                    multiline
                    name='description'
                />
                <Button
                    type='submit'
                    variant='contained'
                >Submit</Button>
            </Stack>
        </form>
    </Container>

}