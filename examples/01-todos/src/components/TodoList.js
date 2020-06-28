import React from 'react'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

const TodoList = () => {

  return (
    <React.Fragment>
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoFooter />
    </React.Fragment>
  )

}

export default TodoList
