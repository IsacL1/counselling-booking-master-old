import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import registerServiceRoom from './registerServiceRoom'
import queryString from 'query-string'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceRoom()
