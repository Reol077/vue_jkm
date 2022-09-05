<template>
  <div id="box">
    <el-col :span="3" class="navbox">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item @click="information">
          <i class="el-icon-user-solid"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item @click="situation">
          <i class="el-icon-upload"></i>
          <span slot="title">上传情况</span>
        </el-menu-item>
      </el-menu>
    </el-col>

    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "personal",
  mounted() {
    this.information();
  },
  methods: {
    information() {
      this.$router.push({
        name: "information"
      });
    },
    situation() {
      this.$router.push({
        name: "situation"
      });
    }
  }
};
</script>

<style scoped>
#box {
  margin-top: 5%;
  padding-left: 10%;
}
</style>