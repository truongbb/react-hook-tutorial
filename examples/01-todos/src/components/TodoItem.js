import React from 'react'
import { Row, Col, Input } from 'reactstrap'

import { BsX } from 'react-icons/bs'

const TodoItem = () => {
  return (
    <React.Fragment>
      <Row className='w-60 mb-3'>
        <Col md={1} className='text-center'>
          <Input type='checkbox' />
        </Col>
        <Col md={10}>
          <div className='item-content'>
            llldfsdfb
          </div>
        </Col>
        <Col md={1} className='text-right'>
          <button className='clear-task'><BsX /></button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default TodoItem
