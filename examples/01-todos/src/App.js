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
    const filterTodos = todos.filter(task => task.id !== todoId)
    console.log(filterTodos)
    setTodos(filterTodos)
  }

  const completeTask = todoId => {
    todos.forEach(task => {
      if (task.id === todoId) {
        task.isDone = !task.isDone
        return
      }
    })
    setTodos(todos)
  }

  return (
    <Container className='d-flex flex-column align-items-center my-5 py-5'>
      <Row>
        <Col>
          <h1>To dos</h1>
        </Col>
      </Row>

      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        completeTask={completeTask}
      />
    </Container>
  )

}

export default App
