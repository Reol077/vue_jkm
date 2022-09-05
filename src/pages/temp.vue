<template>
  <div id="bdy">
    <Head />
    <div class="tbody">
      <el-steps :active="active" finish-status="success">
        <el-step title="上传头像"></el-step>
        <el-step title="个人信息"></el-step>
        <el-step title="专业信息"></el-step>
        <el-step title="证书信息"></el-step>
      </el-steps>
      <!-- 个人信息 -->
      <el-form ref="form" :model="form" label-width="80px">
        <div class="info" v-if="active==1">
          <el-form-item label="上传头像" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="info" v-if="active==2">
          <el-form-item label="真实姓名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tell">
            <el-input type="text" v-model="form.tell" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="indentity">
            <el-input type="text" v-model="form.indentity" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="info" v-if="active==3">
          <el-form-item label="专长领域:" prop="area">
            <br />
            <el-checkbox-group v-model="form.area" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in form.cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="从业资质:" prop="quality">
            <br />
            <el-radio-group v-model="form.quality">
              <el-radio :label="0">国家二级咨询师</el-radio>
              <el-radio :label="1">国家三级咨询师</el-radio>
              <el-radio :label="2">注册系统咨询师</el-radio>
              <el-radio :label="3">注册系统督导师</el-radio>
              <el-radio :label="4">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="info" v-if="active==4">
          <el-form-item label="证书编号" prop="number">
            <el-input type="text" v-model="form.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="从业年限" prop="time">
            <el-input type="text" v-model="form.time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="个人简介" prop="instroduce">
            <el-input type="text" v-model="form.instroduce" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">申请入驻</el-button>
          </el-form-item>
        </div>
        <el-button style="margin-top: 12px;" @click="next" v-if="active<4">下一步</el-button>
        <el-button style="margin-top: 12px;" @click="pre" v-if="active>1">上一步</el-button>
      </el-form>
    </div>
  </div>
</template>
<style>
.tbody {
  width: 80%;
  margin-left: 10%;
  margin-top: 2%;
}
/* 表单 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<script>
//表单js代码
import Head from "../../components/common/Head";
import axios from "axios";
import Qs from "qs";
import router from "../../router/router.js";
const cityOptions = [
  "婚姻家庭",
  "情绪管理",
  "恋爱心理",
  "个人成长",
  "人际关系",
  "心理健康",
  "职场心理",
  "亲子教育",
  "性心理"
];
export default {
  components: {
    Head
  },
  data() {
    return {
      active: 1,
      form: {
        area: ["个人成长"],
        checkAll: false,
        cities: cityOptions,
        isIndeterminate: true,
        quality: 0,
        imageUrl: "",
        username: "",
        tell: "",
        indentity: "",
        number: "",
        instroduce: "",
        time: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //this.form.checkedCities获取多选框的内容   zxs[this.form.radio]  this.form.imageUrl
      //开始提交 在这里进行跨域请求
      this.axios({
        method: "post",
        url: "/api/PsychoSys/tuser.action",
        data: Qs.stringify(this.form)
      })
        .then(res => {
          this.$router.push("/tinfo");
        })
        .catch(function(err) {
          console.log(err);
        });
      /*在这里进行跨域请求*/
      //开始提交
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleCheckAllChange(val) {
      this.form.area = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.form.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.form.cities.length;
    },
    next() {
      if (this.active++ > 3) this.active = 1;
    },
    pre() {
      if (this.active-- < 2) this.active = 1;
    }
  }
};
//表单js代码
</script>