import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'


//css files
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
