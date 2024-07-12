<script setup>
import { ref } from 'vue'
import { addData, editData, getData } from '~/api'
import { supabase } from '~/lib/supabaseClient'
import { fx } from 'money'
import { checkboxGroupEmits } from 'element-plus'
import moment from 'moment'

fx.base = 'USD'
fx.rates = {
  CNY: 7.26,
  JPY: 159.68,
  USD: 1,
}
const drawerRef = ref()
const loading = ref(false)

const emit = defineEmits([
  'updatePageData',
  'update:dialog',
  'update:groupButtonName',
])
const props = defineProps([
  'tableName',
  'controlButton',
  'dialog',
  'groupButtonName',
  'form',
  'editID',
  'tableData',
])

const handleSubmit = () => {
  if (loading.value) return

  let form = {}

  if (props.form.PaidTableShow || props.form.PaidTableShow === '') {
    delete props.form.PaidTableShow
  }
  if (props.form.Payer || props.form.Payer === '') {
    delete props.form.Payer
  }

  for (let o in props.form) {
    form[o] = props.form[o]
  }

  if (props.form.PaidBy === 'CNY') {
    form.PaidBy = 'CNY'
  }
  if (props.form.PaidBy === 'USD') {
    form.Paid = fx(form.Paid).from('USD').to('CNY')
    form.PaidBy = 'USD'
  }
  if (props.form.PaidBy === 'JPY') {
    form.Paid = fx(form.Paid).from('JPY').to('CNY')
    form.PaidBy = 'JPY'
  }

  if (
    props.form.Date === null ||
    !props.form.Info ||
    !props.form.Type ||
    !props.form.Group ||
    props.form.Group.length === 0 ||
    !props.form.Paid ||
    !props.form.Owner
  ) {
    ElMessage.error('Please Enter All')
    return
  }

  ElMessageBox.confirm('Do you want to submit?')
    .then(async () => {
      loading.value = true
      props.controlButton === 'Add'
        ? await addData(props.tableName, form)
        : await editData(props.tableName, form, props.editID)
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

const cancelForm = () => {
  loading.value = false
  emit('update:dialog', false)
}

const handleDelete = async () => {
  ElMessageBox.confirm('Do you want to submit?')
    .then(async () => {
      await supabase.from(props.tableName).delete().eq('id', props.form.id)
      await supabase
        .from('travel-log')
        .insert([
          {
            Date: moment().format('MM-DD h:mm a'),
            Type: 'Delete',
            Log: props.form,
          },
        ])
        .select()
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

const groupClick = (form) => {
  if (form.Group && form.Group.length === 4) {
    emit('update:groupButtonName', '清空')
  }
  if (props.groupButtonName === '清空') {
    delete form.Group
    emit('update:groupButtonName', '全选')
  } else {
    form['Group'] = ['张秋禾', '大华', '班长']
    emit('update:groupButtonName', '清空')
  }
}

const onPaidChoose = (e) => {
  console.log(e.target.value)
}
</script>

<template>
  <el-drawer
    ref="drawerRef"
    :model-value="props.dialog"
    :title="controlButton"
    :before-close="cancelForm"
    direction="ltr"
    size="86%"
    class="demo-drawer"
  >
    <div>
      <el-form
        :model="form"
        class="input-value"
        :label-position="left"
        :label-width="auto"
      >
        <el-form-item label="Date" style="margin-top: -15px">
          <el-date-picker
            v-model="form['Date']"
            type="date"
            placeholder="Pick a day"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="Info">
          <el-input v-model="form['Info']" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Type">
          <el-radio-group v-model="form['Type']">
            <el-radio label="🏨">🏨</el-radio>
            <el-radio label="🍽️">🍽️</el-radio>
            <el-radio label="🎫">🎫</el-radio>
            <el-radio label="🚖">🚖</el-radio>
            <el-radio label="🧲">🧲</el-radio>
            <el-radio label="🤿">🤿</el-radio>
            <el-radio label="🚢">🚢</el-radio>
            <el-radio label="🚍">🚍</el-radio>
            <el-radio label="⛽️">⛽️</el-radio>
            <el-radio label="👮">👮</el-radio>
            <el-radio label="🚄">🚄</el-radio>
            <el-radio label="其它">其它</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Paid By">
          <el-radio-group v-model="form['Owner']">
            <div class="owner-style">
              <el-radio label="张秋禾">张秋禾</el-radio>
              <el-radio label="大华">大华</el-radio>
              <el-radio label="班长">班长</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Paid For">
          <el-button
            @click="groupClick(form)"
            size="small"
            style="margin-top: 5px; margin-bottom: 5px"
            >{{ props.groupButtonName }}</el-button
          >
          <el-checkbox-group v-model="form['Group']" class="group-style">
            <el-checkbox label="张秋禾" name="type" />
            <el-checkbox label="大华" name="type" />
            <el-checkbox label="班长" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="Amount">
          <el-radio-group v-model="form['PaidBy']" @input="onPaidChoose">
            <el-radio label="CNY">CNY</el-radio>
            <el-radio label="USD">USD</el-radio>
            <el-radio label="JPY">JPY</el-radio>
          </el-radio-group>
          <el-input v-model="form['Paid']" autocomplete="off" />
        </el-form-item>
      </el-form>

      <div class="btn">
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          @click="handleSubmit()"
          >{{ loading ? 'Submitting ...' : 'Submit' }}</el-button
        >
        <el-button
          size="small"
          type="danger"
          :loading="loading"
          @click="handleDelete()"
          >{{ loading ? 'Deleting ...' : 'Delete' }}</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.btn {
  margin-top: -10px;
}
.input-value {
  margin-bottom: 30px;
}
.group-style {
  display: flex;
  flex: 1;
}
.owner-style {
  display: flex;
  flex: 1;
}
</style>
