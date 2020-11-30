<template>
    <div>
      <p>子页面标题：{{chi}}</p>
      <p>{{value}}</p>
        <p @click='log'>点击</p>
    </div>
</template>
<script>
export default {
	name: 'red',
	props: ['chi', 'value'],
	data () {
		return {};
	},
	methods: {
		log () {
			this.$emit('input', '33333');
		}
	}
};
</script>
