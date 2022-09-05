<template>
  <div id="Forget">
    <div class="box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="emailCode" label="验证码" :inline="true">
          <el-input v-model="form.emailCode" style="width:65%"></el-input>
          <el-button style="float:right;width:30%" @click="getCode">{{code}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "WebsiteForget",
  data() {
    return {
      code: "获取验证码",
      form: {
        email: "",
        emailCode: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        emailCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /*请求服务器



          */
          this.$router.push({
            name: "reset"
          });
        } else {
          return false;
        }
      });
    },
    getCode() {
      this.code = "已发送";
    }
  }
};
</script>

<style scoped>
.box {
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 500px;
  padding: 50px;
}
</style>