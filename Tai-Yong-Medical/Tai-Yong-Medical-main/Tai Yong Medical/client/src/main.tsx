import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/reset.css'
import Routing from './components/services/Routing'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)