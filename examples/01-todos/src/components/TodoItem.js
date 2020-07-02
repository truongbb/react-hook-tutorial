import React from 'react'
import { Row, Col, Input } from 'reactstrap'

import { BsX } from 'react-icons/bs'

const TodoItem = props => {

  const removeTodo = todoId => props.removeTodo(todoId)

  const completeTask = todoId => props.completeTask(todoId)

  return (
    <React.Fragment>
      <Row className='w-60 mb-3'>
        <Col md={1} className='text-center'>
          <Input type='checkbox' onChange={() => completeTask(props.todo.id)} key={props.todo.id} />
        </Col>
        <Col md={10}>
          <div className={'item-content' + (props.todo.isDone && ' text-strick-out')}>
            {props.todo.content}
          </div>
        </Col>
        <Col md={1} className='text-right'>
          <button className='clear-task' onClick={() => removeTodo(props.todo.id)}><BsX /></button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default TodoItem
