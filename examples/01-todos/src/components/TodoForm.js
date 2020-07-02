import React from 'react'

import { Row, Form, Input, Col } from 'reactstrap'

import { notNullAndEmptyString } from '../utils/StringUtils'

const TodoForm = props => {

  const addTodo = event => {
    if (event.which === 13 || event.keyCode === 13) {
      const newTodo = event.target.value
      if (!notNullAndEmptyString(newTodo)) {
        event.preventDefault()
        return
      }
      props.addTodo(newTodo)
      event.target.value = ''
      event.preventDefault()
    }
  }

  return (
    <React.Fragment>
      <Row className='w-60 mb-5 pb-5 ml-3'>
        <Col>
          <Form>
            <Row>
              <Col md={1} style={{ marginRight: '-20px', paddingRight: '0px' }}>
                <Input type="checkbox" />
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
