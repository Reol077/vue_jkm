<template>
  <div id="Reset">
    <div class="box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="id" label="工号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio label="老师"></el-radio>
            <el-radio label="学生"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordReset",
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
      form: {
        id: "",
        password: "",
        checkPass: "",
        role: ""
      },
      rules: {
        id: [{ required: true, message: "请输入工号", trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
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
    submitForm(formName) {
      if (this.form.role === "老师") {
        this.form.role = "teacher";
      } else {
        this.form.role == "student";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("重置成功");
          console.log(JSON.stringify(this.form));
        } else {
          console.log("重置失败");
          return false;
        }
      });
    },
  }
};
</script>

<style scoped>
.box {
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 500px;
  padding: 40px;
}
</style>