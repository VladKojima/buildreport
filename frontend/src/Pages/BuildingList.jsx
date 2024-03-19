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

import { addBuilding, getBuildingList, editBuilding, removeBuilding } from '../API/buildingsAPI';
import useLoading from '../Hooks/useLoading';
import getAlert from '../Utils/errorAlerts';


export default function BuildingList() {

    const { isLoading, res, error } = useLoading(getBuildingList);

    const [data, setData] = useState([]);

    const [openD, setOpenD] = useState(false);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackCode, setSnackCode] = useState();

    const [lockForm, setLockForm] = useState(false);

    const [formFields, setFormFields] = useState({ id: null, title: '', address: '', registerDate: '' })

    const [editMode, setEditMode] = useState(false);

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
            let res = await addBuilding(formFields);

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

    async function openEdit(building) {
        setFormFields({...building, registerDate: new Date(building.registerDate).toLocaleDateString()});
        setEditMode(true);
        setOpenD(true);
    }

    async function edit(e) {
        e.preventDefault();

        setLockForm(true);

        try {
            await editBuilding(formFields);

            setOpenD(false);

            setData(data.map(item => {
                if (item.id !== formFields.id)
                    return item;

                return formFields;
            }))
        }
        catch (err) {
            setSnackCode(err.response?.status)
            setSnackOpen(true);
        }
        finally {
            setLockForm(false);
        }
    }

    async function remove(id) {
        try {
            await removeBuilding(id);

            setData(data.filter(item => item.id !== id));
        }
        catch (err) {
            setSnackCode(err.response?.status)
            setSnackOpen(true);
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
                            ['ID', 'Title', 'Address', 'Register date', 'Tickets\' count', '']
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
                                item.ticketCount,
                            ].map(value => <TableCell>{value}</TableCell>)
                        }
                        <TableCell>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => openEdit(item)}
                            >Edit</Button>

                            <Button
                                variant='outlined'
                                color='secondary'
                                sx={{ marginLeft: 3 }}
                                onClick={() => remove(item.id)}
                            >Delete</Button>
                        </TableCell>
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
                    <form onSubmit={editMode ? edit : add}>
                        <Stack marginTop={1}>
                            <TextField
                                label='Title'
                                margin='dense'
                                required

                                value={formFields.title}
                                onChange={({ target: { value } }) => setFormFields({ ...formFields, title: value })}
                            />
                            <TextField
                                label="Address"
                                margin='dense'
                                required

                                value={formFields.address}
                                onChange={({ target: { value } }) => setFormFields({ ...formFields, address: value })}
                            />
                            <TextField

                                type='date'
                                margin='dense'
                                label="Register date"
                                required

                                value={formFields.registerDate}
                                onChange={({ target: { value } }) => setFormFields({ ...formFields, registerDate: value })}
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