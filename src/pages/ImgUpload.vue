<template>
  <div id="box">
    <el-upload list-type="picture-card" :auto-upload="false">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ImgUpload",
  data() {
    return {
      imgs: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    downloadIamge(imgsrc, name) {
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png");

        var a = document.createElement("a");
        var event = new MouseEvent("click");
        a.download = name || "photo";
        a.href = url;
        a.dispatchEvent(event);
      };
      image.src = imgsrc;
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file.url);
      var name = new Date().getTime();
      this.downloadIamge(file.url, `${name}`);
    }
  }
};
</script>

<style scoped>
#box {
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 320px;
  padding: 40px;
}
</style>