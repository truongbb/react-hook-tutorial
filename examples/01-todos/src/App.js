import React from 'react'

// components
import { Container, Row, Col } from 'reactstrap'
import TodoForm from './components/TodoForm'

// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import TodoList from './components/TodoList'

function App() {
  return (
    <Container className='d-flex flex-column align-items-center my-5 py-5'>
      <Row>
        <Col>
          <h1>To dos</h1>
        </Col>
      </Row>

      <TodoForm />

      <TodoList />
    </Container>
  )
}

export default App
