<template>
  <div id="app">
    <div id="box">
      <template>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo nav-box"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          v-if="islogin === false"
        >
          <el-menu-item index="2" style="float:right;" @click="register">注册</el-menu-item>
          <el-menu-item index="1" style="float:right" @click="login" >登录</el-menu-item>
        </el-menu>
      </template>
      <template>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo nav-box"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          v-if="islogin === true"
        >
          <el-menu-item index="2" @click="upload" >上传</el-menu-item>
          <el-menu-item index="1" @click="personal" >个人中心</el-menu-item>
        </el-menu>
      </template>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      top: 1,
      activeIndex: "1",
      activeIndex2: "1",
      islogin: false
    };
  },
  mounted() {
    if (this.islogin === false) {
      this.login()
    } else {
      this.personal()
    }
  },
  methods: {
    islogintrue(){
      this.islogin = !this.islogin
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    upload() {
      this.$router.push({
        name: "upload"
      });
    },
    register() {
      this.$router.push({
        name: "register"
      });
    },
    login() {
      this.$router.push({
        name: "login"
      });
    },
    personal() {
      this.$router.push({
        name: "personal"
      });
    },
  }
};
</script>

<style scoped>
#box {
  width: 100%;
}
.nav-box {
  padding: 0 10%;
}
</style>
