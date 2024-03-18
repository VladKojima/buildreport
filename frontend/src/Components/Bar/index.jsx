import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import { deleteToken } from '../../Utils/auth';

export default function Bar({ setIsManager }) {
    return <AppBar position='static'>
        <Toolbar>
            <Link component={RouterLink} to="/" marginRight={2} color="primary.contrastText" variant='button' underline='none' onClick={() => { deleteToken(); setIsManager(false) }}>logout</Link>
        </Toolbar>

    </AppBar>

}