<template>
  <div>
    <el-dialog
      title="上传图片"
      :visible.sync="uploadDialogVisible"
      width="60%"
      :modal-append-to-body="false"
      append-to-body
      @close="onClose">
      <el-upload
        action="/upload/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleOnSuccess"
        :file-list="fileList">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false"
               append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "upload-image",
    data() {
      return {
        uploadDialogVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        callback: null,
        fileList: []
      }
    },
    methods: {
      open(callback, url = false) {
        this.callback = callback
        if (url) {
          this.fileList.push({
            name: url,
            url
          })
        }
        this.uploadDialogVisible = true
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleOnSuccess(response, file, fileList) {
        this.callback(file.url)
        this.uploadDialogVisible = false
      },
      onClose() {
        this.fileList = []
      }
    }
  }
</script>

<style scoped>

</style>
