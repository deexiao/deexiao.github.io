<script setup>
import { ref } from 'vue'
import { addData, editData, getData } from '~/api'
import { supabase } from '~/lib/supabaseClient'
import { fx } from 'money'

fx.base = 'USD'
fx.rates = {
  CNY: 7.2742,
  IDR: 15362.2584,
  SGD: 1.3635,
  USD: 1,
}
const exchangeRadio = ref(1)

const drawerRef = ref()
const loading = ref(false)

const formLabelWidth = '80px'

const emit = defineEmits(['updatePageData', 'update:dialog'])
const props = defineProps([
  'tableName',
  'controlButton',
  'dialog',
  'form',
  'editID',
  'tableData',
])

const handleSubmit = () => {
  if (loading.value) return

  let form = {}
  for (let o in props.form) form[o] = props.form[o]
  if (exchangeRadio.value === 2) {
    form.Paid = fx(form.Paid).from('USD').to('CNY')
  }
  if (exchangeRadio.value === 3) {
    form.Paid = fx(form.Paid).from('IDR').to('CNY')
  }
  if (exchangeRadio.value === 4) {
    form.Paid = fx(form.Paid).from('SGD').to('CNY')
  }

  ElMessageBox.confirm('Do you want to submit?')
    .then(async () => {
      loading.value = true
      props.controlButton === 'Add'
        ? addData(props.tableName, form)
        : editData(props.tableName, form, props.editID)
      loading.value = false
      drawerRef.value.close()
      emit('update:dialog', false)
      emit('updatePageData')
      getData('Indonesia')
      exchangeRadio.value = 1
    })
    .catch((e) => {
      // catch error
      console.log('catch error', e)
    })
}

const cancelForm = () => {
  loading.value = false
  emit('update:dialog', false)
  exchangeRadio.value = 1
}

const handleDelete = async () => {
  ElMessageBox.confirm('Do you want to submit?')
    .then(async () => {
      await supabase.from(props.tableName).delete().eq('id', props.form.id)
      loading.value = false
      drawerRef.value.close()
      emit('update:dialog', false)
      emit('updatePageData')
      getData('Indonesia')
    })
    .catch((e) => {
      // catch error
      console.log('catch error', e)
    })
}
</script>

<template>
  <el-drawer
    ref="drawerRef"
    :model-value="props.dialog"
    :title="controlButton"
    :before-close="cancelForm"
    direction="ltr"
    size="78%"
    class="demo-drawer"
  >
    <div>
      <el-form :model="form" class="input-value">
        <el-form-item
          label="Date"
          :label-width="formLabelWidth"
          style="margin-top: -15px"
        >
          <el-date-picker
            v-model="form['Date']"
            type="date"
            placeholder="Pick a day"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="Info" :label-width="formLabelWidth">
          <el-input v-model="form['Info']" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Type" :label-width="formLabelWidth">
          <el-radio-group v-model="form['Type']">
            <el-radio label="🏨">🏨</el-radio>
            <el-radio label="🍽️">🍽️</el-radio>
            <el-radio label="🎫">🎫</el-radio>
            <el-radio label="🚖">🚖</el-radio>
            <el-radio label="✈️">✈️</el-radio>
            <el-radio label="🧲">🧲</el-radio>
            <el-radio label="🤿">🤿</el-radio>
            <el-radio label="🚢">🚢</el-radio>
            <el-radio label="🚍">🚍</el-radio>
            <el-radio label="⛽️">⛽️</el-radio>
            <el-radio label="👮">👮</el-radio>
            <el-radio label="其它">其它</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Group" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form['Group']">
            <el-checkbox label="萧笛" name="type" />
            <el-checkbox label="张秋禾" name="type" />
            <el-checkbox label="吴世杰" name="type" />
            <el-checkbox label="李树叶" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="Paid" :label-width="formLabelWidth">
          <el-radio-group v-model="exchangeRadio">
            <el-radio :label="1">CNY</el-radio>
            <el-radio :label="2">USD</el-radio>
            <el-radio :label="3">IDR</el-radio>
          </el-radio-group>
          <el-input v-model="form['Paid']" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Owner" :label-width="formLabelWidth">
          <el-radio-group v-model="form['Owner']">
            <el-radio label="萧笛">萧笛</el-radio>
            <el-radio label="张秋禾">张秋禾</el-radio>
            <el-radio label="吴世杰">吴世杰</el-radio>
            <el-radio label="李树叶">李树叶</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" :loading="loading" @click="handleSubmit()">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</el-button>
        <el-button type="danger" :loading="loading" @click="handleDelete()">{{
          loading ? 'Deleting ...' : 'Delete'
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.input-value {
  margin-left: -35px;
  margin-bottom: 30px;
}
</style>
