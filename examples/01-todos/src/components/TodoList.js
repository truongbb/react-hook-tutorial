import React from 'react'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

import { validArray } from '../utils/ArrayUtils'

const TodoList = props => {

  const removeTodo = todoId => props.removeTodo(todoId)

  const completeTask = todoId => props.completeTask(todoId)

  return (
    <React.Fragment>
      {
        validArray(props.todos) &&
        props.todos.map((item, index) =>
          <TodoItem
            todo={item}
            key={index}
            removeTodo={removeTodo}
            completeTask={completeTask}
          />
        )
      }
      {
        validArray(props.todos) && <TodoFooter totalItem={props.todos.filter(task => !task.isDone).length} />
      }
    </React.Fragment>
  )

}

export default TodoList
