<script setup>
import { ref } from 'vue'
import { fx } from 'money'

fx.base = 'USD'
fx.rates = {
  CNY: 6.92,
  JPY: 58.5,
  USD: 1,
}

const numCNY = ref()
const numUSD = ref()
const numPHP = ref()

const handleChangeCNY = (value) => {
  if (!value) {
    onClear()
  } else {
    numUSD.value = fx(value).from('CNY').to('USD')
    numPHP.value = fx(value).from('CNY').to('JPY')
  }
}
const handleChangeUSD = (value) => {
  if (!value) {
    onClear()
  } else {
    numCNY.value = fx(value).from('USD').to('CNY')
    numPHP.value = fx(value).from('USD').to('JPY')
  }
}
const handleChangePHP = (value) => {
  if (!value) {
    onClear()
  } else {
    numCNY.value = fx(value).from('JPY').to('CNY')
    numUSD.value = fx(value).from('JPY').to('USD')
  }
}
const onClear = () => {
  numCNY.value = null
  numUSD.value = null
  numPHP.value = null
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
        比索
        <el-input-number
          v-model="numPHP"
          @input="handleChangePHP"
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
