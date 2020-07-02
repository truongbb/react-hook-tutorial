import React from 'react'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

import { validArray } from '../utils/ArrayUtils'

const TodoList = props => {

  const removeTodo = todoId => props.removeTodo(todoId)

  const changeTaskStatus = todoId => props.changeTaskStatus(todoId)

  const countTotal = () => {
    if (!validArray(props.todos)) {
      return 0
    }
    return props.todos.filter(task => !task.isDone).length
  }

  const clearComplete = () => props.clearComplete()

  return (
    <React.Fragment>
      {
        validArray(props.todos) &&
        props.todos.map((item, index) =>
          <TodoItem
            todo={item}
            key={index}
            removeTodo={removeTodo}
            changeTaskStatus={changeTaskStatus}
          />
        )
      }
      {
        validArray(props.todos) && <TodoFooter totalItem={countTotal()} clearComplete={clearComplete} />
      }
    </React.Fragment>
  )

}

export default TodoList
