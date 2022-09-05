<template>
  <div id="Login">
    <div class="box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工号" prop="id">
          <el-input v-model="form.id" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio label="老师"></el-radio>
            <el-radio label="学生"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model="form.verificationCode" style="width:50%" placeholder="请输入验证码"></el-input>
          <img
            :src="imgUrl"
            style="vertical-align: middle;margin-left:10%;cursor:pointer;"
            @click="getimageCode()"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" plain @click="forget" style="float:right;">忘记密码</el-button>
          <el-button type="info" plain @click="register" style="float:right;">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WebsiteLogin",
  data() {
    return {
      imgUrl: "",
      form: {
        id: "",
        password: "",
        role: "",
        verificationCode: ""
      },
      rules: {
        id: [{ required: true, message: "请输入工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getimageCode() {
      let url = "http://localhost:8080/userImageCode";
      axios.get(url, { responseType: "blob" }).then(res => {
        this.imgUrl = window.URL.createObjectURL(res.data);
      });
    },
    submitForm() {
      let isPassed = false;
      this.$refs.form.validate(valid => {
        if (valid) {
          isPassed = true;
        } else {
          return false;
        }
      });
      if (isPassed) {
        let params = {};
        params.id = this.form.id;
        params.password = this.form.password;
        params.role = this.form.role;
        if (params.role === "老师") {
          params.role = "teacher";
        } else if (params.role === "学生") {
          params.role = "student";
        }
        let url = "http://localhost:8080/userGetImageCode";
        axios.get(url).then(res => {
          if (this.form.verificationCode === res.data.data.imageCode) {
            url = "http://localhost:8080/userLogin";
            axios({
              method: "post",
              url: url,
              params: params
            })
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    message: "登录成功,即将跳转",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "用户名/密码错误",
                    type: "error"
                  });
                }
              })
              .catch(error => {
                this.$message({
                  message: "请求超时，请检查网络",
                  type: "error"
                });
              });
          } else {
            this.$message({
              message: "验证码有误",
              type: "error"
            });
          }
        });
      }
    },
    forget() {
      this.$router.push({
        name: "forget"
      });
    },
    register() {
      this.$router.push({
        name: "register"
      });
    }
  },
  created() {
    this.getimageCode();
  }
};
</script>

<style lang="less" scoped >
.margin {
  margin-left: 20px;
}
.box {
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 500px;
  padding: 50px;
}
</style>