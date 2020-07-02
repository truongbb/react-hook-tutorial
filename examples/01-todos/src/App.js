import React, { useState } from 'react'

// components
import { Container, Row, Col } from 'reactstrap'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = newTodo => setTodos([...todos, { id: todos.length, content: newTodo, isDone: false }])

  const removeTodo = todoId => {
    const filteredTodos = todos.filter(task => task.id !== todoId)
    setTodos(filteredTodos)
  }

  const changeTaskStatus = todoId => {
    const mapTodos = todos.map(task => {
      if (task.id === todoId) {
        task.isDone = !task.isDone
      }
      return task
    })
    setTodos(mapTodos)
  }

  const changeStatusAllTasks = isChecked => {
    const mapTodos = todos.map(task => {
      task.isDone = isChecked
      return task
    })
    setTodos(mapTodos)
  }

  const clearComplete = () => {
    const filteredTodos = todos.filter(task => !task.isDone)
    setTodos(filteredTodos)
  }

  return (
    <Container className='d-flex flex-column align-items-center my-5 py-5'>
      <Row>
        <Col>
          <h1>To dos</h1>
        </Col>
      </Row>

      <TodoForm
        addTodo={addTodo}
        changeStatusAllTasks={changeStatusAllTasks}
      />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        changeTaskStatus={changeTaskStatus}
        clearComplete={clearComplete}
      />
    </Container>
  )

}

export default App
