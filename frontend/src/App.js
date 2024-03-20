import './App.css';

import Manager from './Pages/Manager';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Ticket from './Pages/Ticket';
import TicketInfo from './Pages/TicketInfo';

import { ThemeProvider } from '@emotion/react';
import theme from './theme';

import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getToken } from './Utils/auth';
import getAlert from './Utils/errorAlerts';

import SnackBar from '@mui/material/Snackbar';

function App() {

  const [isManager, setIsManager] = useState(getToken() !== null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackCode, setSnackCode] = useState();

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          {!isManager && <Route path='login' element={<Login setIsManager={setIsManager} {...{ setSnackCode, setSnackOpen }} />} />}

          <Route path='ticket/:id' element={<TicketInfo />} />
          <Route path='ticket' element={<Ticket {...{ setSnackCode, setSnackOpen }} />} />

          <Route path="*" element={isManager ? <Manager setIsManager={setIsManager} {...{ setSnackCode, setSnackOpen }} /> : <Main />} />
        </Routes>
        <SnackBar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={handleClose}
          message={getAlert(snackCode)}
        />
      </ThemeProvider>

    </BrowserRouter>

  );
}

export default App;
