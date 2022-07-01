import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
