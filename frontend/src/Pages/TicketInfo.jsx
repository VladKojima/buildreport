import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove'

import { useParams } from 'react-router-dom';

import { getTicketById } from '../API/buildingsAPI';
import useLoading from '../Hooks/useLoading';
import getAlert from '../Utils/errorAlerts';

export default function TicketInfo() {
    const params = useParams();

    const { isLoading, res: ticket, error } = useLoading(() => getTicketById(params["id"]));

    const statusViews = {
        "OPEN": {

        },

        "RESOLVED": {
            icon: <CheckIcon />,
            color: "success"
        },

        "REFUSED": {
            icon: <RemoveIcon />,
            color: "error"
        }
    }

    return <Container sx={{ marginTop: '3%' }}>
        {
            isLoading && <>
                <CircularProgress color='primary' />
                <Typography severity='info'>Loading...</Typography>
            </>
        }

        {!isLoading && <>
            {
                error
                    ? <Alert severity='error'>
                        <AlertTitle>Error</AlertTitle>
                        {getAlert(error.response?.status)}
                    </Alert>
                    : <Alert severity='info' {...statusViews[ticket.status]}>
                        Ticket #{ticket.id}: "{ticket.title}" is {ticket.status}
                    </Alert>
            }

        </>}
    </Container>
}