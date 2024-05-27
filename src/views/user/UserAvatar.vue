<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {ref} from 'vue'

import { useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore();
import {useTokenStore} from "@/stores/token.js";
import {userPicUpdateService} from "@/api/user.js";

const tokenStore = useTokenStore();
//用户头像地址
const userPicUrl= ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')
const handleAvatarSuccess = (result)=>{
  // ElMessage.success('上传成功')
  userPicUrl.value= result.data;
}
const updateUserAvatar = async ()=>{
  let result =await userPicUpdateService(userPicUrl.value);
  ElMessage.success('上传成功')
}
const setUserPic = ()=>{
  userInfoStore.userInfo.userPic? userPicUrl.value=userInfoStore.userInfo.userPic:userPicUrl;
}
setUserPic();
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>更换头像</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                   action="/api/fileUpload/userImgUpload"
                   name="multipartFile"
                   :headers="{'authorization':tokenStore.token}"
                   :on-success="handleAvatarSuccess">
          →选择文件小于1MB的图片←
<!--          <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">-->
<!--            选择图片-->
<!--          </el-button>-->
<!--          <img v-if="imgUrl" :src="imgUrl" class="userImg" />-->
          <img  :src="userPicUrl" width="200px" />
<!--          <el-icon v-else class="avatar-uploader-icon">-->
<!--            <Plus />-->
<!--          </el-icon>-->
        </el-upload>
        <br />

        <el-button type="success" :icon="Upload" size="large" @click="updateUserAvatar">
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  min-width: 106%;
  box-sizing: border-box;
  margin-right: 75px;
}
.userImg{
  width: 200px;
}
</style>