import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import AutoComplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addTicket, getBuildingWithContaining } from '../API/buildingsAPI';

export default function Ticket({setSnackCode, setSnackOpen}) {

    const [objects, setObjects] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    const nav = useNavigate();

    const [id, setId] = useState();

    const timer = useRef();
    const field = useRef();

    const INPUT_TIMEOUT = 400;

    function inputStop({ target: { value } }) {
        clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            if (value !== field.current && value)
                getBuildingWithContaining(value).then(data => setObjects(data
                    .map(obj => { return { label: obj.title, id: obj.id } })
                )).catch((err) => {
                    setSnackCode(err.response?.status);
                    setSnackOpen(true);
                });

            field.current = value;
        }, INPUT_TIMEOUT);
    }

    async function sub(e) {
        e.preventDefault();
        try {
            let res = await addTicket({ ...Object.fromEntries(new FormData(e.target)), buildingId: selectedId });
            setId(res.id);
        }
        catch (err) {
            setSnackCode(err.response?.status);
            setSnackOpen(true);
        }
    }

    return <Container>
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
        <Dialog
            open={id != null}
        >
            <DialogTitle>Ticket is success added</DialogTitle>
            <DialogContent>

                <Typography>
                    Your ticket can be accessed by link: <Link
                        sx={{ cursor: 'pointer' }}
                        onClick={({ target }) => {
                            navigator.clipboard.writeText(target.textContent);
                        }}
                    >{`${process.env.REACT_APP_DOMAIN_NAME}/ticket/${id}`}
                    </Link> (click to copy to clipboard)
                </Typography>

                <Button
                    onClick={() => nav("/")}
                    variant='contained'
                >OK</Button>
            </DialogContent>
        </Dialog>
    </Container >

}