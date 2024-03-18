import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Ticket from './Pages/Ticket';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import Manager from './Pages/Manager';
import { useState } from 'react';
import { getToken } from './Utils/auth';
import TicketInfo from './Pages/TicketInfo';

function App() {

  const [isManager, setIsManager] = useState(getToken() !== null);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          {!isManager && <Route path='login' element={<Login setIsManager={setIsManager} />} />}

          <Route path='ticket/:id' element={<TicketInfo />} />
          <Route path='ticket' element={<Ticket />} />

          <Route path="*" element={isManager ? <Manager setIsManager={setIsManager} /> : <Main />} />
        </Routes>
      </ThemeProvider>

    </BrowserRouter>

  );
}

export default App;
