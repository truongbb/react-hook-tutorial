import React from 'react'

// constant
import { BUTTON_LIST } from '../constants/ButtonValue'

const Keyboard = props => {
  return (
    <div className='keyboard'>
      {
        BUTTON_LIST.map((item, index) => {
          return (
            <div className='row' key={index}>
              {
                item.map((subItem, subIndex) => {
                  return (
                    <div className='col-md-3'>
                      <input
                        type='button'
                        value={subItem}
                        key={subIndex}
                        className={'btn btn-default btn-block ' + (subItem === 'CE' ? 'ce-button' : subItem === '=' ? 'equal-button' : '')}
                        onClick={event => props.handleClickButton(event.target.value)}
                      />
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Keyboard
