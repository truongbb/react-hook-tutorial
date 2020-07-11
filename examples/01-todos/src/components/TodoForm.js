import React from 'react'

// components
import { Row, Form, Input, Col } from 'reactstrap'

// utils
import { notNullAndEmptyString } from '../utils/StringUtils'
import { validArray } from '../utils/ArrayUtils'

const TodoForm = props => {

  const addTodo = event => {
    if (event.which === 13 || event.keyCode === 13) {
      event.preventDefault()
      const newTodo = event.target.value
      event.target.value = ''
      if (!notNullAndEmptyString(newTodo)) {
        return
      }
      props.addTodo(newTodo)
    }
  }

  const changeStatusAllTasks = isChecked => props.changeStatusAllTasks(isChecked)

  return (
    <React.Fragment>
      <Row className='w-60 mb-5 pb-5 ml-3'>
        <Col>
          <Form>
            <Row>
              <Col md={1} style={{ marginRight: '-20px', paddingRight: '0px' }}>
                <Input type="checkbox" onChange={e => changeStatusAllTasks(e.target.checked)} key={-1} className={!validArray(props.todos) && 'd-none'} />
              </Col>
              <Col md={10}>
                <Input type="text" placeholder="What need to be done?" onKeyPress={e => addTodo(e)} />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  )

}

export default TodoForm
