import React from 'react'

import { Row, Form, Input } from 'reactstrap'

const TodoForm = () => {

  const addTodo = event => {
    if (event.which === 13 || event.keyCode === 13) {
      alert(event.target.value)
      event.preventDefault()
    }
  }

  return (
    <React.Fragment>
      <Row className='w-60 mb-5 pb-5'>
        <Form className='w-100'>
          <Input type="text" placeholder="What need to be done?" onKeyPress={e => addTodo(e)} />
        </Form>
      </Row>
    </React.Fragment>
  )
}

export default TodoForm
