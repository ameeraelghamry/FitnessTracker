import React from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';

import './App.css';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import ExerciseDetail from './pages/ExerciseDetail';
import QuestionnairePage from './pages/Questionnairepage';
import Workouts from './pages/Workouts';

const App = () => {
    return (
        <Box width="400px" sx={{ width: { xl: '1488' } }} m="auto">


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
                <Route path="/Questionnairepage" element={< QuestionnairePage />} />
                <Route path="/Workouts" element={< Workouts />} />
            </Routes>


        </Box >
    )
}

export default App