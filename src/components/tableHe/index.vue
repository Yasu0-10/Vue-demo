<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        sortable
        label="数值 1">
      </el-table-column>
      <el-table-column
        prop="amount2"
        sortable
        label="数值 2">
      </el-table-column>
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3">
      </el-table-column>
    </el-table>

    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [{
				id: '12987122',
				name: '王小虎',
				amount1: '234',
				amount2: '3.2',
				amount3: 10
			}, {
				id: '12987123',
				name: '王小虎',
				amount1: '165',
				amount2: '4.43',
				amount3: 12
			}, {
				id: '12987124',
				name: '王小虎',
				amount1: '324',
				amount2: '1.9',
				amount3: 9
			}, {
				id: '12987125',
				name: '王小虎',
				amount1: '621',
				amount2: '2.2',
				amount3: 17
			}, {
				id: '12987126',
				name: '王小虎',
				amount1: '539',
				amount2: '4.1',
				amount3: 15
			}]
		};
	},
	methods: {
		// arraySpanMethod({ row, column, rowIndex, columnIndex }) {
		// 	if (rowIndex % 2 === 0) {
		// 		if (columnIndex === 0) {
		// 			return [1, 2];//rowspan,columnspan 即跨一行两列
		// 		} else if (columnIndex === 1) {
		// 			return [0, 0]; //0行0列
		// 		}
		// 	}
		// },

		// objectSpanMethod({ row, column, rowIndex, columnIndex }) {
		// 	if(columnIndex == 0){ //第0列开始（实际第一列）
		// 		if(rowIndex % 2 == 0){ //开始的行数，此处是偶数行（不计标题，即标题下第一行行号是0）
		// 			return [2, 1];//合并，向下向右，2行1列。1代表不变，0代表不显示，1以上代表多行/列
		// 		}else{
		// 			return [0, 0];//奇数行 则该行列都不显示
		// 		}
		// 	}
		// },
		objectSpanMethod({ row, column, rowIndex, columnIndex }){
			if(columnIndex == 0){
				if(rowIndex % 2 == 0){
					return [2, 1];
				}else{
					return [0, 0];
				}
			}
		},
		arraySpanMethod({row, col, rowIndex, columnIndex}){
			if(rowIndex % 2 == 0){
				if(columnIndex == 0){
					return [1, 2];
				}else if(columnIndex == 1){
					return [0, 0];
				}
			}
		}
	}
};
</script>