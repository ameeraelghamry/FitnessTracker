import react from 'react';
import reactDom from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');

reactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);