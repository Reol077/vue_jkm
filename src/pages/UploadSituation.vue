<template>
  <div class="box">
    <el-table :data="tableData" height="250" border class="tablebox">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="situation" label="上传情况" width="180"></el-table-column>
      <el-table-column prop="file" label="上传文件"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "situation",
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style scoped>
.tablebox {
  width: 45%;
  margin-left: 5%;
}
</style>