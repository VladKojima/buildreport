import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import AutoComplete from '@mui/material/Autocomplete';
import { useRef, useState } from 'react'

import { getBuildingWithStarts } from '../API/buildingsAPI';

export default function Ticket() {

    const [data, setData] = useState({ object: null, title: '', desc: '', email: '' });

    function sub(e) {
        e.preventDefault();
    }

    const [objects, setObjects] = useState([]);

    const timer = useRef();
    const field = useRef();

    const INPUT_TIMEOUT = 400;

    function inputStop({ target: { value } }) {
        clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            if (value !== field.current && value)
                getBuildingWithStarts(value).then(data=>setObjects(data
                    .map(obj=>{return {label: obj.title, id: obj.id}})
            ));
            field.current = value;
        }, INPUT_TIMEOUT);
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
                        <Typography align='center'>Ticket</Typography>
                        <AutoComplete options={objects}
                            renderInput={params => <TextField {...params} label="Begin enter title" />}
                            onInputChange={inputStop}
                            noOptionsText="No objects found"
                        />
                        <TextField value={data.email}
                            onChange={({ target: { value } }) => setData({ ...data, email: value })}
                            placeholder='Email'
                            required
                            margin='dense'
                        />
                        <TextField value={data.title}
                            onChange={({ target: { value } }) => setData({ ...data, title: value })}
                            placeholder='Title'
                            required
                            margin='dense'
                        />
                        <TextField value={data.desc}
                            onChange={({ target: { value } }) => setData({ ...data, desc: value })}
                            placeholder='Desc'
                            required
                            margin='dense'
                            multiline
                        />
                        <Button type='submit' variant='contained'>Submit</Button>
                    </Stack>
                </form>
            </Grid>
        </Grid>
    </div>
}