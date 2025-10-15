import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import HorizontalScrollbar from '../components/HorizontalScrollbar'

const Home = () => {
    const [bodyPart, setBodyPart] = useState('all')
    const bodyParts = [
        'all',
        'back',
        'cardio',
        'chest',
        'lower arms',
        'lower legs',
        'neck',
        'shoulders',
        'upper arms',
        'upper legs',
        'waist',
    ]

    return (
        <Box sx={{ mt: { lg: '35px', xs: '20px' }, p: '20px' }}>
            <Typography variant="h4" fontWeight="700" mb="20px">
                Explore by body part
            </Typography>

            <HorizontalScrollbar
                data={bodyParts}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
            />
        </Box>
    )
}

export default Home