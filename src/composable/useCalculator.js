import { ref } from 'vue'
import {
  evaluate
} from 'mathjs'

const useCalculator = () => {
  const buttons = [7, 8, 9, '%', 4, 5, 6, '+', 1, 2, 3, '-', '.', 0, '/', '*']
  const isNumber = (value) => isNaN(value)
  const current = ref('')
  const concat = ref('')
  const result = ref('')
  const operatorClick = ref(true)

  const btnAction = (value) => {
    if (!isNumber(value)) {
      if (operatorClick.value) {
        current.value = ''
        operatorClick.value = false
      }
      current.value += value
    } else {
      executeOperation(value)
    }
  }

  const executeOperation = (value) => {
    if (value === '.') {
      if (current.value.indexOf('.') === -1) {
        if (operatorClick.value) {
          current.value = ''
          operatorClick.value = false
        }
        current.value += value
      }

      return true
    }
    if (value === '%') {
      if (current.value !== '') current.value = `${parseFloat(current.value) / 100}`
      return true
    }

    addArithmeticOperator(value)
  }

  const addArithmeticOperator = (value) => {
    if (!operatorClick.value) {
      concat.value += `${current.value} ${value} `
      current.value = ''
      operatorClick.value = true
    }
  }

  const btnResult = () => {
    result.value = evaluate(concat.value + current.value)
  }

  const reset = () => {
    current.value = ''
    concat.value = ''
    result.value = ''
  }
  return {
    buttons,
    isNumber,
    current,
    btnAction,
    concat,
    reset,
    result,
    btnResult
  }
}

export default useCalculator
