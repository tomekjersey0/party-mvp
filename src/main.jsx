import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="629348600684-gip88lqo69dk4pv6a8rsd496qlvcb7vt.apps.googleusercontent.com">
    <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </GoogleOAuthProvider>
)
