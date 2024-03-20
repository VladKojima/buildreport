import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useEffect, useState } from 'react';

import useLoading from '../Hooks/useLoading';
import { getTicketList, refuseTicket, resolveTicket } from '../API/buildingsAPI';
import getAlert from '../Utils/errorAlerts';

export default function TicketList({ setSnackCode, setSnackOpen }) {
    const [data, setData] = useState([]);

    const { isLoading, res, error } = useLoading(getTicketList);

    useEffect(() => {
        if ((!isLoading && !error))
            setData(res);
    }, [isLoading]);

    async function resolve(id) {
        try {
            await resolveTicket(id);

            setData(data.map(item => {
                if (item.id != id)
                    return item;

                return { ...item, status: 'RESOLVED' }
            }))
        }
        catch (err) {
            setSnackOpen(true);
        }
    }

    async function refuse(id) {
        try {
            await refuseTicket(id);

            setData(data.map(item => {
                if (item.id != id)
                    return item;

                return { ...item, status: 'REFUSED' }
            }))
        }
        catch (err) {
            setSnackCode(err.response?.status);
            setSnackOpen(true);
        }
    }

    return <div>

        <Backdrop
            open={isLoading}
        >
            <CircularProgress color='primary' />
        </Backdrop>

        {!isLoading && !error && <Table>
            <TableHead>
                <TableRow>
                    {
                        ['ID', 'Object', 'Email', 'Title', 'Desc', 'Date', 'Status']
                            .map(title => <TableCell style={{ fontWeight: "bold" }}>{title}</TableCell>)
                    }
                </TableRow>
            </TableHead>

            <TableBody>
                {data.map(item => <TableRow>
                    {
                        [
                            item.id,
                            item.buildingId,
                            item.email,
                            item.title,
                            item.description,
                            new Date(item.date).toLocaleDateString()
                        ]
                            .map(value => <TableCell>{value}</TableCell>)
                    }
                    <TableCell>
                        {item.status}
                        {item.status === "OPEN" && <>
                            <Button
                                variant='outlined'
                                color='primary'
                                style={{ marginLeft: 10 }}
                                onClick={() => resolve(item.id)}
                            >Resolve</Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                style={{ marginLeft: 3 }}
                                onClick={() => refuse(item.id)}
                            >Refuse</Button>
                        </>}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>}

        {!isLoading && error && <Alert severity='error' variant='filled' sx={{ marginTop: '5px' }}>
            <AlertTitle>Error</AlertTitle>
            {getAlert(error.response?.status)}
        </Alert>}
    </div>

}