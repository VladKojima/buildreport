import Container from '@mui/material/Container';
import Typography from '@mui/material/Container';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTicketById } from '../API/buildingsAPI';

export default function TicketInfo() {
    const params = useParams();

    const [ticket, setTicket] = useState();

    useEffect(() => {
        getTicketById(params['id']).then(res => setTicket(res));
    }, []);

    return <Container sx={{ marginTop: '3%' }}>
        {ticket && <Typography>
            Your ticket #{ticket.id}: "{ticket.title}" is {ticket.status}
        </Typography>}
    </Container>
}