<template>
  <!-- <div> -->
  <el-date-picker v-model="time"
    :type="type"
    :disabled="disabled"
    :format="format"
    :value-format="valueFormat"
    :placeholder="placeholder"
    :picker-options="pickerOptions"
    @focus="showPicker"
    @change="changeHandle"/>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'date-before-current',
  data () {
    return {
      time: '',
      svDate: null,
      pickerOptions: {
        disabledDate: date => {
          if (this.df === 'before') {
            return date.getTime() < this.currTime
          }
          return date.getTime() > this.currTime
        }
      }
    }
  },
  model: {
    prop: 'dateStr',
    event: 'change'
  },
  props: {
    dateStr: {
      type: String,
      default: ''
    },
    df: {
      type: String,
      default: 'after'
    },
    type: {
      type: String,
      default: 'datetime'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    placeholder: {
      type: String,
      default: '选择日期'
    },
    disabled: Boolean
  },
  computed: {
    currTime () {
      let date = this.svDate || new Date()
      return new Date(`${this.formatDate(date, 'YYYY/MM/DD')} 00:00:00`).getTime()
    }
  },
  watch: {
    dateStr: {
      immediate: true,
      handler (val) {
        this.time = val
      }
    }
  },
  methods: {
		getSvTime () {
      return new Promise((resolve) => {
        var xhr = new window.XMLHttpRequest()
        xhr.open('get', `/?r=${Math.random()}`)
        xhr.send()
        xhr.onreadystatechange = function () {
          let time = null
          if (xhr.readyState === 2) {
            time = xhr.getResponseHeader('Date')
            resolve(new Date(time))
          }
        }
      })
    },
		formatDate (arg, formater = 'YYYY-MM-DD') {
		  if (!arg) {
		    return ''
		  }
		  if (typeof arg === 'string') {
		    arg = arg.replace(/-/g, '/')
		  }
		  let d = new Date(arg)
		  function f (a) {
		    return a < 10 ? `0${a}` : a
		  }
		  let [year, month, date, hh, mm, ss] = [
		    d.getFullYear(),
		    f(d.getMonth() + 1),
		    f(d.getDate()),
		    f(d.getHours()),
		    f(d.getMinutes()),
		    f(d.getSeconds())
		  ]
		  // console.log(d, year, month, date, hh, mm, ss)
		  formater = formater.replace('YYYY', year)
		  formater = formater.replace('MM', month)
		  formater = formater.replace('DD', date)
		  formater = formater.replace('hh', hh)
		  formater = formater.replace('mm', mm)
		  formater = formater.replace('ss', ss)
		  return formater
		},
    requestSvTime () {
      return this.getSvTime().then(d => {
        this.svDate = d
        return d
      })
    },
		// 强制设置当前时间，组件外$refs调用
    setValue () {
      this.requestSvTime().then(d => {
        this.$emit('change', this.formatDate(d, 'YYYY-MM-DD hh:mm:ss'))
      })
    },
    showPicker (vm) {
			console.log(555);
      this.requestSvTime()
    },
    changeHandle (val) {
      this.setTime()
    },
    setTime () {
      let val = ''
      if (this.type === 'datetime' || this.valueFormat === 'yyyy-MM-dd') {
        val = this.time
      } else if (this.time) {
        val = `${this.time.split(' ')[0]} ${this.formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss').split(' ')[1]}`
      }
      this.$emit('change', val)
    }
  }
}
</script>
