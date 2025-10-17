import React from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import ExerciseDetail from './pages/ExerciseDetail';
import QuestionnairePage from './pages/Questionnairepage';
import ProfilePage from './pages/ProfilePage';
import RoutinesPage from './pages/RoutinesPage';

const App = () => {
    return (
        <Box width="400px" sx={{ width: { xl: '1488' } }} m="auto">
     

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
                 <Route path="/Questionnairepage" element={< QuestionnairePage/>} />
                 <Route path="/ProfilePage" element={< ProfilePage/>} />
                    <Route path="/RoutinesPage" element={< RoutinesPage/>} />
            </Routes>

          
        </Box >
    )
}

export default App