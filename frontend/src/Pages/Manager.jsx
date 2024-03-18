import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import BuildingList from './BuildingList';
import TicketList from './TicketList';

import { useState } from 'react';

import Bar from '../Components/Bar';

export default function Manager({ setIsManager }) {

    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [<BuildingList />, <TicketList />]

    return <Container sx={{'min-width': '100%'}}>
        <Bar setIsManager={setIsManager} />
        <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)}>
            <Tab label='buildings' />
            <Tab label='tickets' />
        </Tabs>
        {tabs[selectedTab]}
    </Container>
}