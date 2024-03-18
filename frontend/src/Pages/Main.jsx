import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Link as RouterLink } from 'react-router-dom';

export default function Main() {

    return <Container sx={{ marginTop: '3%' }}>
        <Stack alignItems={'center'}>
            <Typography>
                Hello
            </Typography>

            <Link marginTop={2}
                component={RouterLink}
                to="/login"
            >
                <Button variant="contained">Authorize</Button>
            </Link>

            <Link marginTop={3}
                component={RouterLink}
                to="/ticket"
            >
                <Button variant="contained">Write ticket</Button>
            </Link>
        </Stack>
    </Container>
}