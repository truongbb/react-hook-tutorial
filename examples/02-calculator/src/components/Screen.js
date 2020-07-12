import React from 'react'

const Screen = props => {
  return (
    <div className='screen'>
      <div className='screen-value'>
        <label>{props.screenText}</label>
      </div>
    </div>
  )
}

export default Screen
