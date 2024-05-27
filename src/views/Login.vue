<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage,ElMessageBox } from 'element-plus' //美化消息提示

const isRegister = ref(true);

const userInfo = reactive({
    username: '',
    password: '',
    rePassword: ''
})
const rePasswordValid = (rule, value, callback) => {
    if (value === null || value === '') {
        return callback(new Error('请再次输入密码'))
    }
    else if (userInfo.password !== value) {
        return callback(new Error('两次输入密码不一样'))
    }
}
const registerDataRules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '用户名的长度必须为5~16位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur' }
    ],
    rePassword: [
        { validator: rePasswordValid, trigger: 'blur' }
    ]
})
//添加路由自动跳转
import {useRouter} from 'vue-router'
const router = useRouter()
// 注册接口
import { userRegisterService } from '@/api/user.js'
const register = async () => {
    let result = await userRegisterService(userInfo);
    //    if(result.code === 0 ){
    //    alert (result.msg ? result.msg :'注册成功' )
    //    }
    //    else{
    //     alert (result.msg ? result.msg :'注册失败')
    //    } 
    ElMessage.success(result.msg ? result.msg : '注册成功')
    //借助路由完成跳转(注册不跳转)
}
// 登录接口
//设置token
import { useTokenStore } from "@/stores/token.js";
const tokenStore = useTokenStore();

import { userLoginService } from '@/api/user.js'
const login = async () => {
    let result = await userLoginService(userInfo);
    console.log(result.data)
    //   if(result.code === 0 ){
    //     alert (result.msg ? result.msg :'登录成功' )
    //    }
    //    else{
    //     alert (result.msg ? result.msg :'登录失败')
    //    }

    ElMessage.success(result.msg ? result.msg : '登录成功')
    tokenStore.setToken(result.data);
    // console.log('login'+tokenStore.token);
    // 登录成功跳转页面
     router.push('layout')
}
const forgotPassword = async (data) => {
  ElMessageBox.confirm(
      '忘了就忘了吧嘿嘿🤣👌?',
      '谁让你没长心',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {

        ElMessage({
          type: 'success',
          message: '猪脑袋连个密码都记不住',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '猪脑袋连个密码都记不住',
        })
      })
}
</script>
<template>
    <!-- 设置背景图片 -->
    <el-row class="login-page">
        <!-- <el-col :span="4" :offset=19 class="bgOffse"></el-col> -->
        <!--#######################网站头部设施################### -->


        <!--#######################网站头部设施################### -->

        <el-col :span="20" :offset=1 class="form">
            <!-- #########################登录窗口############################### -->
            <el-form :model="userInfo" size="large" label-width="auto" style="max-width: 400px" v-if="isRegister"
                :rules="registerDataRules">
                <!-- #########################登录窗口############################### -->
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <!-- 1 用户名输入框-->
                <el-form-item label="用户名" prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="userInfo.username" />
                </el-form-item>
                <!-- 2 密码输入框-->
                <el-form-item label="密码" prop="password">
                    <el-input :prefix-icon="Lock" placeholder="请输入密码" v-model="userInfo.password" />
                </el-form-item>
                <!-- 3 登录和取消按钮-->
                <el-form-item>
                    <el-button class="button" type="primary" @click="login">登陆</el-button>
                    <!-- <el-button>取消</el-button> -->
                </el-form-item>
                <!-- 记住我和忘记密码 -->
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false" @click="forgotPassword">忘记密码了嘛?</el-link>
                    </div>
                </el-form-item>
                <!-- 设置注册按钮进入到注册页面 -->
                <el-form-item class="flex">
                    <el-link type="info" :underline="true" @click="isRegister = false">
                        注册 →
                    </el-link>
                </el-form-item>
                <!-- #######################校验规则######################### -->


                <!-- #######################校验规则######################### -->
            </el-form>
            <!-- #########################注册窗口哦############################# -->
            <el-form :model="userInfo" size="large" label-width="auto" style="max-width: 400px" v-else
                :rules="registerDataRules">
                <!-- #########################注册窗口哦############################# -->

                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>

                <el-form-item label="用户名" prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入你要注册的用户名" v-model="userInfo.username" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input :prefix-icon="Lock" placeholder="请输入你的密码" v-model="userInfo.password" />
                </el-form-item>

                <el-form-item label="请再次输入密码" prop="rePassword">
                    <el-input :prefix-icon="Lock" placeholder="请在此输入你的密码" v-model="userInfo.rePassword" />
                </el-form-item>

                <el-form-item>
                    <el-button class="button" type="primary" @click="register">注册</el-button>
                    <!-- <el-button>取消</el-button> -->
                </el-form-item>
                <!-- 设置取消按钮返回登陆界面 -->
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true">
                        👈 取消
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<style  scoped>
.login-page {
    height: 101vh;
    background: url('@/assets/sources/Girl.png');
    background-size: cover;
}
.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    align-items: flex-start;
    position: relative;
    padding-left: 65%;
    width: 100%;

}

.flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.button {
    width: 100%;
}
</style>