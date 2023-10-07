<script setup>
import { ref } from 'vue'
import { addData, editData, getData } from '~/api'

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
      getData()
    })
    .catch(() => {
      // catch error
      console.log('catch error')
    })
}

const cancelForm = () => {
  loading.value = false
  emit('update:dialog', false)
}
</script>

<template>
  <el-drawer
    ref="drawerRef"
    :model-value="props.dialog"
    :title="controlButton"
    :before-close="cancelForm"
    direction="ltr"
    size="70%"
    class="demo-drawer"
  >
    <div>
      <el-form :model="form" class="input-value">
        <template v-for="(_, val) in form">
          <template v-if="val !== 'id'">
            <el-form-item :label="val" :label-width="formLabelWidth">
              <el-input v-model="form[val]" autocomplete="off" />
            </el-form-item>
          </template>
        </template>
      </el-form>
      <div>
        <el-button type="primary" :loading="loading" @click="handleSubmit()">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.input-value {
  margin-left: -35px;
  margin-bottom: 50px;
}
</style>
