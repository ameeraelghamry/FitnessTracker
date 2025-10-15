import React from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';

import './App.css';

import Home from './pages/HomePage';
import ExerciseDetail from './pages/ExerciseDetail';
import QuestionnairePage from './pages/Questionnairepage';

const App = () => {
    return (
        <Box width="400px" sx={{ width: { xl: '1488' } }} m="auto">
     

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
                 <Route path="/Questionnairepage" element={< QuestionnairePage/>} />
            </Routes>

          
        </Box >
    )
}

export default App