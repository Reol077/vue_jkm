<template>
  <div id="Register">
    <div class="box">
      <el-steps :active="active_index - 0" simple style="margin-top: 20px">
        <el-step
          v-for="(item,index) of stepParams"
          :key="index"
          :title="item.title"
          :icon="item.icon"
          :status="item.status"
          :class="stepSuc.includes(index) ? 'stepSuc':'stepErr'"
          @click.native="handleStep(index)"
        />
      </el-steps>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="formBox">
        <div class="info" v-if="active==1">
          <el-form-item prop="id" label="工号">
            <el-input v-model="form.id" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </div>
        <div class="info" v-if="active==2">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="emailCode" label="验证码">
            <el-input v-model="form.emailCode" style="width:60%" placeholder="请输入验证码"></el-input>
            <el-button
              style="float:right"
              @click="getEmailCode"
              :disabled="!canClick"
            >{{getCodeTitle}}</el-button>
          </el-form-item>
        </div>
        <div class="info" v-if="active==3">
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="off"
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="form.checkPass"
              autocomplete="off"
              placeholder="请再次输入验证码"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="role">
            <el-radio-group v-model="form.role">
              <el-radio label="老师"></el-radio>
              <el-radio label="学生"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" style="width:100%">注册</el-button>
          </el-form-item>
        </div>
        <el-button style="margin-top: 12px;" @click="pre" v-if="active>1">上一步</el-button>
        <el-button style="margin-top: 12px; float:right" @click="next('form')" v-if="active<3">下一步</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WebsiteRegister",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      canClick: true,
      totalTime: 60,
      getCodeTitle: "获取验证码",
      active_index: 0,
      active: 1,
      stepSuc: [0],
      stepParams: [
        {
          title: "身份",
          icon: "el-icon-edit",
          status: "process"
        },
        {
          title: "邮箱",
          icon: "el-icon-edit",
          status: "wait"
        },
        {
          title: "步骤三",
          icon: "el-icon-edit",
          status: "wait"
        }
      ],
      form: {
        id: "",
        name: "",
        email: "",
        emailCode: "",
        password: "",
        checkPass: "",
        role: ""
      },
      rules: {
        id: [{ required: true, message: "请输入工号", trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        emailCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getEmailCode() {
      this.$refs.form.validateField("email", valid => {
        if (!valid) {
          this.verificationCode();
          let url = "http://localhost:8080/userEmailCode";
          let param = {};
          param.email = this.form.email;
          axios({
            url: url,
            method: "post",
            params: param // params中的参数是通过地址栏传参
          })
            .then(res => {
              this.$message({
                message: "已发送验证码",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                message: "请求超时，请检查网络",
                type: "error"
              });
            });
        }
      });
    },
    verificationCode() {
      if (!this.canClick) return;
      this.canClick = false;
      this.getCodeTitle = this.totalTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.getCodeTitle = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.getCodeTitle = "重新发送验证码";
          this.totalTime = 60;
          this.canClick = true;
        }
      }, 1000);
    },
    submitForm() {
      if (this.form.role === "老师") {
        this.form.role = "teacher";
      } else {
        this.form.role = "student";
      }
      let isPassed = false;
      this.$refs.form.validateField(
        ["email", "emailCode", "id", "name", "password", "role"],
        valid => {
          if (!valid) {
            isPassed = true;
          } else {
            this.$message({
              message: "填写有误",
              type: "error"
            });
            return false;
          }
        }
      );
      if (isPassed) {
        let params = {};
        params.email = this.form.email;
        params.emailCode = this.form.emailCode;
        params.id = this.form.id;
        params.name = this.form.name;
        params.password = this.form.password;
        params.role = this.form.role;
        console.log(params);
        let url = "http://localhost:8080/userRegister";
        axios({ url: url, method: "post", params: params })
          .then(res => {
            if (res.data.success) {
              this.$message({
                message: "注册成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.message,
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
      }
    },
    handleStatus() {
      switch (this.active_index) {
        case 0:
          this.stepParams[0].status = "process";
          this.stepParams[1].status = "wait";
          this.stepParams[2].status = "wait";
          break;
        case 1:
          this.stepParams[0].status = "success";
          this.stepParams[1].status = "process";
          this.stepParams[2].status = "wait";
          break;
        case 2:
          this.stepParams[0].status = "success";
          this.stepParams[1].status = "success";
          this.stepParams[2].status = "process";
          break;
        default:
          this.stepParams[0].status = "process";
          this.stepParams[1].status = "wait";
          this.stepParams[2].status = "wait";
          break;
      }
    },
    next(data) {
      this.$refs[data].validate(valid => {
        if (valid) {
          if (this.active++ > 3) this.active = 1;
          this.stepSuc.push(++this.active_index);
          this.handleStatus();
        }
      });
    },
    pre() {
      if (this.active-- < 2) this.active = 1;
      if (--this.active_index === 0) {
        this.active_index = 0;
        this.handleStatus();
      }
    }
  }
};
</script>

<style scoped>
.formBox {
  margin-top: 20px;
}
.box {
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 420px;
  overflow: hidden;
  padding: 40px;
}
</style>