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
import useCalculator from '../composable/useCalculator'
export default {
  setup () {
    const {
      buttons,
      isNumber,
      current,
      btnAction,
      concat,
      reset,
      result,
      btnResult
    } = useCalculator()

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
