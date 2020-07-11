import React, { useState, useEffect } from 'react'

// components
import { Container, Row, Col } from 'reactstrap'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// constants
import { ALL, ACTIVE, DONE } from './constants/StatusConstant'

function App() {

  const [todos, setTodos] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filterType, setFilterType] = useState('ALL')

  useEffect(() => {
    doFilter(filterType)
  }, [todos, filterType]) // watch state change

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
    if (filterType === DONE) {
      setFilterType(ALL)
    }
  }

  const doFilter = type => {
    setFilterType(type)
    const filteredTasks = todos.filter(task =>
      filterType === ALL
      || (filterType === ACTIVE && !task.isDone)
      || (filterType === DONE && task.isDone)
    )
    setFilteredTasks(filteredTasks)
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
        todos={todos}
        changeStatusAllTasks={changeStatusAllTasks}
      />
      <TodoList
        todos={filteredTasks}
        removeTodo={removeTodo}
        changeTaskStatus={changeTaskStatus}
        clearComplete={clearComplete}
        filterType={filterType}
        filterTodos={doFilter}
      />
    </Container>
  )

}

export default App
