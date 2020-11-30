<template>
  <div>
    <p @click='fn'>姓名:{{name}}</p>
    <p>性别:{{sex}}</p>
    <p>{{ageName}}:{{age}}</p>
  </div>
</template>
<script>
export default {
  name: 'progressBox',
  props: {
    name: {},
    sex: {},
    ageName: {},
    age: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      // name: 'zs'
    }
  },
  methods: {
    fn (e) {
      console.log(e)
    }
  }
}
</script>
