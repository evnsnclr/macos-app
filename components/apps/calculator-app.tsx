"use client"

import { useState } from "react"

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand
      case "-":
        return firstOperand - secondOperand
      case "*":
        return firstOperand * secondOperand
      case "/":
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  const handleEquals = () => {
    if (!operator || firstOperand === null) return

    const inputValue = Number.parseFloat(display)
    const result = calculate(firstOperand, inputValue, operator)

    setDisplay(String(result))
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(true)
  }

  const toggleSign = () => {
    setDisplay(String(-Number.parseFloat(display)))
  }

  const handlePercent = () => {
    const currentValue = Number.parseFloat(display)
    setDisplay(String(currentValue / 100))
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 p-4">
      {/* Display */}
      <div className="bg-gray-900 p-4 mb-4 rounded-lg">
        <div className="text-right text-white text-3xl font-light truncate">{display}</div>
      </div>

      {/* Keypad */}
      <div className="flex-1 grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button
          onClick={clearDisplay}
          className="bg-gray-500 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-700"
        >
          AC
        </button>
        <button
          onClick={toggleSign}
          className="bg-gray-500 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-700"
        >
          +/-
        </button>
        <button
          onClick={handlePercent}
          className="bg-gray-500 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-700"
        >
          %
        </button>
        <button
          onClick={() => handleOperator("/")}
          className="bg-orange-500 text-white rounded-full text-xl font-medium hover:bg-orange-600 active:bg-orange-700"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputDigit("7")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          7
        </button>
        <button
          onClick={() => inputDigit("8")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          8
        </button>
        <button
          onClick={() => inputDigit("9")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          9
        </button>
        <button
          onClick={() => handleOperator("*")}
          className="bg-orange-500 text-white rounded-full text-xl font-medium hover:bg-orange-600 active:bg-orange-700"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputDigit("4")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          4
        </button>
        <button
          onClick={() => inputDigit("5")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          5
        </button>
        <button
          onClick={() => inputDigit("6")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          6
        </button>
        <button
          onClick={() => handleOperator("-")}
          className="bg-orange-500 text-white rounded-full text-xl font-medium hover:bg-orange-600 active:bg-orange-700"
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputDigit("1")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          1
        </button>
        <button
          onClick={() => inputDigit("2")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          2
        </button>
        <button
          onClick={() => inputDigit("3")}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          3
        </button>
        <button
          onClick={() => handleOperator("+")}
          className="bg-orange-500 text-white rounded-full text-xl font-medium hover:bg-orange-600 active:bg-orange-700"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit("0")}
          className="col-span-2 bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500 text-left pl-6"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="bg-gray-700 text-white rounded-full text-xl font-medium hover:bg-gray-600 active:bg-gray-500"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="bg-orange-500 text-white rounded-full text-xl font-medium hover:bg-orange-600 active:bg-orange-700"
        >
          =
        </button>
      </div>
    </div>
  )
}
