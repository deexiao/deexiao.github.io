import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBudgetStore = defineStore('store', () => {
  const currTab = ref('每月定期支出')

  const budgetTable = ref([])
  const budgetTableEcharts = ref([])

  const foodTable = ref([])
  const foodTableEcharts = ref([])

  const budgetForm = ref({
    Name: '',
    Price: '',
  })
  const foodForm = ref({
    Name: '',
    Price: '',
    Date: '',
  })

  const monthPriceAll = ref(0)
  const foodPriceAll = ref(0)

  const budgetEchartsData = ref({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: 'Traffic Sources',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: budgetTableEcharts,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  })

  const foodEchartsData = ref({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: 'Traffic Sources',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: foodTableEcharts,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  })

  return {
    currTab,
    budgetTable,
    budgetTableEcharts,
    foodTable,
    foodTableEcharts,
    budgetForm,
    foodForm,
    monthPriceAll,
    foodPriceAll,
    budgetEchartsData,
    foodEchartsData,
  }
})
