<script setup>
import { ref } from 'vue'
import { fx } from 'money'

fx.base = 'USD'
fx.rates = {
  CNY: 7.16,
  KRW: 1467.6,
  USD: 1,
}

const numCNY = ref()
const numUSD = ref()
const numKRW = ref()

const handleChangeCNY = (value) => {
  if (!value) {
    onClear()
  } else {
    numUSD.value = fx(value).from('CNY').to('USD')
    numKRW.value = fx(value).from('CNY').to('KRW')
  }
}
const handleChangeUSD = (value) => {
  if (!value) {
    onClear()
  } else {
    numCNY.value = fx(value).from('USD').to('CNY')
    numKRW.value = fx(value).from('USD').to('KRW')
  }
}
const handleChangeKRW = (value) => {
  if (!value) {
    onClear()
  } else {
    numCNY.value = fx(value).from('KRW').to('CNY')
    numUSD.value = fx(value).from('KRW').to('USD')
  }
}
const onClear = () => {
  numCNY.value = null
  numUSD.value = null
  numKRW.value = null
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>汇率换算</span>
        <el-button @click="onClear">Clear</el-button>
      </div>
    </template>

    <div>
      <p class="p-class">
        人民币
        <el-input-number
          v-model="numCNY"
          @input="handleChangeCNY"
          class="input-number"
        />
      </p>
      <p class="p-class">
        美金
        <el-input-number
          v-model="numUSD"
          @input="handleChangeUSD"
          class="input-number"
        />
      </p>
      <p class="p-class">
        韩元
        <el-input-number
          v-model="numKRW"
          @input="handleChangeKRW"
          class="input-number"
        />
      </p>
    </div>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.p-class {
  display: flex;
  align-items: center;
}
.input-number {
  position: absolute;
  width: auto;
  left: 90px;
  right: 20px;
}
.text {
  font-size: 14px;
}
</style>
