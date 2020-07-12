import React, { useState } from 'react'

// components
import Screen from './Screen'
import Keyboard from './Keyboard'


const Calculator = () => {

  const [screenText, setScreenText] = useState('0')
  const [firstValue, setFirstValue] = useState(0)
  const [operation, setOperation] = useState('')
  const [tmpText, setTmpText] = useState('')

  const resetState = () => {
    setScreenText('0')
    setFirstValue(0)
    setOperation('')
    setTmpText('')
  }

  const handleClickButton = buttonValue => {
    switch (buttonValue) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '.':
        let txt = tmpText
        const tmp = txt.length > 20 ? txt : (txt += buttonValue)
        setScreenText(tmp)
        setTmpText(tmp)
        break
      case 'sin':
        let sinArgument = +(tmpText === '' ? '0' : tmpText)
        if (isNaN(sinArgument)) {
          alert('Sin function argument must be a number')
          resetState()
          return
        }
        setScreenText(Math.sin(sinArgument))
        setTmpText('')
        break
      case 'cos':
        let cosArgument = +(tmpText === '' ? '0' : tmpText)
        if (isNaN(cosArgument)) {
          alert('Cos function argument must be a number')
          resetState()
          return
        }
        setScreenText(Math.cos(cosArgument))
        setTmpText('')
        break
      case 'tan':
        let tanArgument = +(tmpText === '' ? '0' : tmpText)
        if (isNaN(tanArgument)) {
          alert('Tan function argument must be a number')
          resetState()
          return
        }
        if (tanArgument === 90) {
          setScreenText('Undefined')
          setTmpText('')
          return
        }
        setScreenText(Math.tan(tanArgument))
        setTmpText('')
        break
      case '=':
        let secondValue = +(tmpText === '' ? '0' : tmpText);
        let result = 0
        if (operation === '+') {
          result = firstValue + secondValue
        } else if (operation === '-') {
          result = firstValue - secondValue
        } else if (operation === '*') {
          result = firstValue * secondValue
        } else if (operation === '/') {
          if (secondValue === 0) {
            result = 'Infinity';
          }
          result = firstValue / secondValue
        }
        setScreenText(result)
        setFirstValue(result)
        setTmpText('')
        break
      case '+':
      case '-':
      case '*':
      case '/':
        if (tmpText === '') {
          setTmpText('0')
        }
        setFirstValue(+tmpText)
        setOperation(buttonValue)
        setTmpText('')
        break
      case 'CE':
        resetState()
        break
      default:
        break
    }
  }

  return (
    <div className='calculator'>
      <Screen screenText={screenText} />
      <Keyboard handleClickButton={handleClickButton} />
    </div>
  )

}

export default Calculator
