<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Calculadora</div>
          </q-card-section>
          <q-card-section >
            <div class="text-h5 text-grey-5 text-right">
              {{ concat + current }}
            </div>
            <div class="text-h3 text-right">
              {{ result }}
            </div>
          </q-card-section>
          <q-card-section class="bg-grey-4">
            <div class="row q-col-gutter-sm">
              <div
                class="col-3"
                v-for="( btn,index ) in buttons"
                :key="index">
                <q-btn
                  class="full-width text-h6"
                  :color="isNumber(btn) ? 'indigo' : 'grey-2'"
                  :text-color="isNumber(btn) ? 'white' : 'grey-8'"
                  @click="btnAction(btn)"
                  >
                  {{ btn }}
                </q-btn>
              </div>
              <div class="col-6">
                <q-btn class="full-width text-h6" color="indigo" @click="reset">
                  reset
                </q-btn>
              </div>
              <div class="col-6">
                <q-btn class="full-width text-h6" color="orange" @click="btnResult">
                  =
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import {
  evaluate
} from 'mathjs'
export default {
  setup () {
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
}
</script>
<style scoped>
.text-h5 {
  height:1.5rem
}

.text-h3 {
  height:2.5rem
}
</style>
