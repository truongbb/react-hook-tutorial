import React from 'react'

// components
import { Row, Col, Badge } from 'reactstrap'

// constants
import { ALL, ACTIVE, DONE } from '../constants/StatusConstant'

const TodoFooter = props => {

  const clearComplete = () => props.clearComplete()

  const filterTodos = type => props.filterTodos(type)

  return (
    <React.Fragment>
      <Row className='w-60 mt-5 d-flex align-items-baseline'>
        <Col md={3}>
          <span>{props.totalItem} items left</span>
        </Col>
        <Col md={6} className='d-flex justify-content-around'>
          <span className='filter-option cursor-pointer' onClick={() => filterTodos(ALL)}>
            <Badge color={props.filterType === ALL ? 'primary' : 'secondary'}>All</Badge>
          </span>
          <span className='filter-option cursor-pointer' onClick={() => filterTodos(ACTIVE)}>
            <Badge color={props.filterType === ACTIVE ? 'primary' : 'secondary'}>Active</Badge>
          </span>
          <span className='filter-option cursor-pointer' onClick={() => filterTodos(DONE)}>
            <Badge color={props.filterType === DONE ? 'primary' : 'secondary'}>Done</Badge>
          </span>
        </Col>
        <Col md={3}>
          <span className='cursor-pointer hover-red' onClick={clearComplete}>Clear complete</span>
        </Col>
      </Row>
    </React.Fragment>
  )

}

export default TodoFooter
