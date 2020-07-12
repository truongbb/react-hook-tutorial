import React from 'react'

// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// component
import Calculator from './components/Calculator'

const App = () => {
  return (
    <div className='App'>
      <div className='title'>
        <h1>Calculator</h1>
      </div>
      <Calculator />
    </div>
  )
}

export default App
