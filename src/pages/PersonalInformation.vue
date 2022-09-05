<template>
  <div class="box">
    <el-descriptions title="个人简介" direction="vertical" :column="3" border>
      <el-descriptions-item label="工号">{{info.id}}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{info.name}}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{info.email}}</el-descriptions-item>
      <el-descriptions-item label="学院">{{info.department}}</el-descriptions-item>
      <el-descriptions-item label="班级">{{info.class}}</el-descriptions-item>
      <el-descriptions-item label="身份">{{info.role}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "information",
  data() {
    return {
      info: {}
    };
  },
  methods: {
    getinformation() {
      let url = "http://localhost:8080/information";
      axios.get(url).then(
        res => {
          let info = res.data;
          this.info = info;
        },
        err => {
          console.log("请求失败");
        }
      );
    }
  },
  created() {
    this.getinformation();
  }
};
</script>

<style scoped>
.box {
  margin-left: 5%;
  width: 70%;
}
</style>>
</style>