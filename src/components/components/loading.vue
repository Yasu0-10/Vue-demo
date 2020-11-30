<template>
 <div class="poSp-u-mdModel">
  <el-dialog :visible.sync="visibleType" width="20%" :before-close="handleClose">
   <div align="center">专项任务正在下发中~</div>
    <div class="modi-zs-loadArea">
      <!-- <img src="../../assets/loading.gif"/> -->
     <img src="@/assets/loading.gif"/>
    </div>
    <span slot="footer" class="modal-footer"></span>
  </el-dialog>
 </div>
</template>
<script>
export default {
  name: 'ajModelBox',
  props: ['visible'],
  model: {
    prop: 'value',
    event: 'eventShow'
  },
  computed: {
    visibleType: {
      get: function () {
        return this.visible
      },
      set: function () {

      }
    }
  },
  data () {
    return {
      // f_loading: ''
    }
  },
  mounted () {

  },
  methods: {
    handleClose (done) {
      this.$emit('eventShow', false)
      done()
    }
  }
}
</script>
