<script setup>
import { ref } from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {userPasswordUpdateService} from "@/api/user.js";
import { useUserInfoStore} from "@/stores/userInfo.js";
import {useTokenStore} from "@/stores/token.js";
import router from "@/router/index.js";
import {eventDeleteService} from "@/api/event.js";
const userInfoStore = useUserInfoStore();
const tokenStore = useTokenStore();
const passwordInfo = ref({
  oldPassword: "",
  newPassword: '',
  reNewPassword: ''
})
const rePasswordValid = (rule, value, callback) => {
  if (value === null || value === '') {
    return callback(new Error('请再次输入密码'))
  }
  else if (passwordInfo.value.newPassword !== value) {
    return callback(new Error('两次输入密码不一样'))
  }
}
const passwordRules = ref({
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 5, max: 16, message: '用户名的长度必须为5~16位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur' }
  ],
  reNewPassword: [
    { validator: rePasswordValid, trigger: 'blur' }
  ]
})

const reSetPassword =async () => {

  // ElMessage.success(result.msg?result.msg:'密码成功更改')
  ElMessageBox.confirm(
      '你真的想要更换密码嘛🤣👌?',
      '警告你奥',
      {
        confirmButtonText: '确定',
        cancelButtonText: '你看,又急',
        type: 'warning',
      }
  )
      .then(async () => {
        const params =  {
          old_pwd: passwordInfo.value.oldPassword,
          new_pwd: passwordInfo.value.newPassword,
          re_pwd: passwordInfo.value.reNewPassword
        }
        let result =await userPasswordUpdateService(params)

        // ElMessage.success(result.message?result.message:'删除成功')
        // ElMessage.success('删除成功')

        ElMessage({
          type: 'success',
          message: '密码更改成功',
        })
        userInfoStore.removeUserInfo();
        tokenStore.removeToken();
        await router.push('/login');
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '用户取消操作',
        })
      })
}
// 修改密码后推出登录并且清除数据
const afterUpdatePwd = async ()=>{


}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="passwordInfo" :rules="passwordRules" label-width="100px" size="large">
          <el-form-item label="原始密码" prop="oldPassword">
            <el-input v-model="passwordInfo.oldPassword" ></el-input>
          </el-form-item >
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordInfo.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="再次输入" prop="reNewPassword">
            <el-input v-model="passwordInfo.reNewPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reSetPassword">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
<style scoped>
.page-container {
  min-height: 100%;
  min-width: 106%;
  box-sizing: border-box;
  margin-right: 75px;
}
</style>

