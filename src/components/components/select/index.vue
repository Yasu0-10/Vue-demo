<template>
<div class="selectWrap">
  <div class="select-wrapper">
    <!-- 输入框盒子，点击出现下拉框 -->
    <div class="select" @click = "triggerOption">
      <div class="select-content">{{selectContent.text}}</div>
      <div class="triangle-wrapper">
        <div id="triangle-down"></div>
      </div>
    </div>
    <!-- 下拉框 -->
    <div class="option-wrapper" style="display: none;">
      <div class="option-item"  v-for = "(item,index) in subject" :key="index" @mouseout="out($event)" @mouseover="move($event)" @click = "choose(item)">{{item.text}}</div>
    </div>
  </div>
</div>
</template>
<script>
export default{
  name: 'selectBox',
  model: {
    prop: 'value',
    event: 'changeSelect'
  },
  props: {
    // 盒子宽度
    selectWidth: {
      type: Number,
      default: 100
    },
    // 下拉选项
    subject: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 值
    value: {},
    // 默认选框文字
    selectContent: {
      type: Object,
      default: function () {
        return {value: 0, text: '请选择'}
      }
    }
  },
  mounted () {
    // 组件的宽度由传值决定
    document.querySelector('.selectWrap').style.width = this.selectWidth + 'px'
  },
  computed: {
    // 下拉框外盒子
    optionWrapper () {
      return document.querySelector('.option-wrapper')
    },
    // 输入框外盒子
    selectCon () {
      return document.querySelector()
    },
    // 下拉选项
    subjectList () {
      return document.getElementsByClassName('option-item')
    }
  },
  methods: {
    // 移入时排他的hover效果
    move (event) {
      for (var item of this.subjectList) {
        item.classList.remove('hover')
      }
      event.currentTarget.classList.add('hover')
    },
    // 移出时当前取消hover效果
    out (event) {
      event.currentTarget.classList.remove('hover')
    },
    // 点击输入框
    triggerOption () {
      // 切换下拉显示隐藏
      if (this.optionWrapper.style.display === 'none') {
        this.optionWrapper.style.display = 'block'
      } else {
        this.optionWrapper.style.display = 'none'
      }
      // 下拉框出现时，已被选中的添加hover效果其他去除
      for (var item of this.subjectList) {
        if (item.innerHTML === this.selectContent.text) {
          item.classList.add('hover')
        } else {
          item.classList.remove('hover')
        }
      }
    },
    // 选中下拉选项
    choose (item) {
      // 隐藏下拉框，然后将空对象传给父方法changeSelect
      // this.selectContent.text = item.text
      // this.selectContent.value = item.value;
      this.optionWrapper.style.display = 'none'
      this.$emit('changeSelect', item.text)
    }
  }
}
</script>
<style>
  .select{
    position: relative;
    overflow: hidden;
    padding-right: 10px;
    min-width: 80px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    border: 1px solid #000;
    cursor: default;
    font-size: 13px;
  }
  .select-content{
    text-align: left;
  }
  .triangle-wrapper{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 20px;
    background-color: #fff;
    cursor: default;
  }
  #triangle-down{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid #000;
  }
  .option-wrapper{
    position: relative;
    overflow: hidden;
    min-width: 80px;
    width: 100%;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
  }
  .option-item{
    min-width: 80px;
    height: 20px;
    line-height: 20px;
    padding-right: 10px;
    text-align: left;
    cursor: default;
  }
  .hover{
    background-color: rgb(30,144,255);
    color:#fff !important;
  }
</style>
