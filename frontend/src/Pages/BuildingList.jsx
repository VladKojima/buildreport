import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import SnackBar from '@mui/material/Snackbar';

import { useState, useEffect } from 'react';

import { addBuilding, getBuildingList } from '../API/buildingsAPI';
import useLoading from '../Hooks/useLoading';
import getAlert from '../Utils/errorAlerts';


export default function BuildingList() {

    const { isLoading, res, error } = useLoading(getBuildingList);

    const [data, setData] = useState([]);

    const [openD, setOpenD] = useState(false);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackCode, setSnackCode] = useState();

    const [lockForm, setLockForm] = useState(false);

    function handleClose(_, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    }

    useEffect(() => {
        if ((!isLoading && !error))
            setData(res);
    }, [isLoading]);

    async function add(e) {
        e.preventDefault();

        setLockForm(true);

        try {
            let res = await addBuilding(Object.fromEntries(new FormData(e.target)));

            setOpenD(false);

            setData([...data, { ...res, ticketCount: 0 }])
        }
        catch (err) {
            setSnackCode(err.response?.status)
            setSnackOpen(true);
        }
        finally {
            setLockForm(false);
        }
    }

    return <div>
        <Backdrop
            open={isLoading}
        >
            <CircularProgress color='primary' />
        </Backdrop>

        <SnackBar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            message={getAlert(snackCode)}
        />

        {!isLoading && !error && <>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            ['ID', 'Title', 'Address', 'Register date', 'Tickets\' count']
                                .map(title => <TableCell style={{ fontWeight: "bold" }}>{title}</TableCell>)
                        }
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(item => <TableRow>
                        {
                            [
                                item.id,
                                item.title,
                                item.address,
                                new Date(item.registerDate).toLocaleDateString(),
                                item.ticketCount
                            ].map(value => <TableCell>{value}</TableCell>)
                        }
                    </TableRow>)}
                </TableBody>
            </Table>

            <Fab color='primary' aria-label='add'
                sx={
                    {
                        position: 'fixed',
                        bottom: 10,
                        right: 10
                    }
                }
                onClick={() => setOpenD(true)}
            >
                <AddIcon />
            </Fab>
            <Dialog
                open={openD}
                onClose={() => {
                    if (!lockForm)
                        setOpenD(false);
                }}
            >
                <DialogTitle>Add building</DialogTitle>
                <DialogContent>
                    <form onSubmit={add}>
                        <Stack marginTop={1}>
                            <TextField
                                label='Title'
                                margin='dense'
                                required
                                name='title'
                            />
                            <TextField
                                label="Address"
                                margin='dense'
                                required
                                name='address'
                            />
                            <TextField

                                type='date'
                                margin='dense'
                                aria-placeholder=''
                                label="Register date"
                                required
                                name='registerDate'
                            />

                            <Button
                                variant='contained'
                                type='submit'
                                disabled={lockForm}
                            >Send</Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </>}

        {!isLoading && error && <Alert severity='error' variant='filled' sx={{ marginTop: '5px' }}>
            <AlertTitle>Error</AlertTitle>
            {getAlert(error.response?.status)}
        </Alert>}
    </div>
}