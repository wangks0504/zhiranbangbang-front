<script setup>
import{reactive, toRefs} from 'vue';
import {
  Operation,
  MessageBox,
  CopyDocument
} from '@element-plus/icons-vue'
const state = reactive({
    squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})
const { circleUrl, squareUrl, sizeList } = toRefs(state)
// 顶部状态栏
import {userInfoService} from "@/api/user.js";
import { useUserInfoStore} from '@/stores/userInfo.js'
import {useTokenStore} from "@/stores/token.js";
const tokenStore = useTokenStore();
const userInfoStore = useUserInfoStore();
const getUserInfo = async ()=>{
  let result =await userInfoService();
  userInfoStore.setUserInfo(result.data);
  console.log(userInfoStore.userInfo)
}
getUserInfo();
//下拉菜单栏被点击后执行操作
import router from '@/router/index.js'
import {ElMessage, ElMessageBox} from "element-plus";
const userCommand = (command)=>{
  if (command === 'layout') {
    // alert('推出登录')
    ElMessageBox.confirm(
        '确定退推腿褪颓蜕出嘛?',
        '警告你奥',
        {
          confirmButtonText: '确定',
          cancelButtonText: '你看,又急',
          type: 'warning',
        }
    )
        .then(async () => {
          tokenStore.removeToken();
          userInfoStore.removeUserInfo();
         await router.push('login');

          // ElMessage.success(result.message?result.message:'删除成功')
          // ElMessage.success('删除成功')
          ElMessage({
            type: 'success',
            message: '退出登录成功',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '用户取消了退出登录',
          })
        })
  }else{
    router.push('/user/'+command);
  }
}
</script>
<template>
  <div class="common-layout">
    <el-container class="common-layout">
<!--      ######################头部#####################-->
      <el-header class="header-shadow">
<!--        >-->
        <!-- #####################头像及下拉菜单################# -->
        <el-row class="ver-layout">
          <!-- ######################1######################## -->
          <el-col :span="6" :offset="0">
            <div class="center-stater">HELLO：<strong>{{userInfoStore.userInfo.username}}</strong></div>
          </el-col>
<!--            <el-text  type="info">Danger</el-text>-->
            <el-col :span="6" :offset="12" class="hor-layout" >
              <el-dropdown router @command="userCommand">
                <span class="el-dropdown-link">
                   <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar shape="square" :size="43" :src="userInfoStore.userInfo.userPic?userInfoStore.userInfo.userPic: squareUrl" />
                </div>
                   </div>
                </span>
                <template #dropdown >
                  <el-dropdown-menu>
                    <el-dropdown-item command="userInfo">基本信息</el-dropdown-item>
                    <el-dropdown-item command="updateAvatar">更换头像</el-dropdown-item>
                    <el-dropdown-item command="updatePwd">重置密码</el-dropdown-item>
                    <el-dropdown-item divided command="layout">退出登录</el-dropdown-item>
                    <el-dropdown-item divided command="最漂亮的不过于此嘛哈哈">啦啦啦啦</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

          </el-col>
        </el-row>
      </el-header>
<!--     ##########################主体部分##########################-->
      <el-container>
<!--        <el-aside width="200px" class="main-page">-->
          <el-aside width="200px" class="common-layout main-page">
            <div class="aside-logo"></div>
            <!--             注意这里需要打开路由 -->
            <el-menu active-text-color="#909399" background-color="transparent" text-color="#262727"
                     router>

              <el-menu-item index="/category">
                <el-icon><CopyDocument /></el-icon>
                <span>事件分类</span>
              </el-menu-item>

              <el-menu-item index="/event">
                <el-icon><MessageBox /></el-icon>
                <span>事件管理</span>
              </el-menu-item>
          <!--可展开的选项菜单-->
              <el-sub-menu >
                <template #title>
                  <el-icon><Operation /></el-icon>
                  <span>个人中心</span>
                </template>
                <el-menu-item-group title="Group One">
                  <el-menu-item index="1-1">还没想好加什么</el-menu-item>
                  <el-menu-item index="1-2">可以做个情侣空间感觉</el-menu-item>
                </el-menu-item-group>

                <el-menu-item index="/user/userInfo">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>基本资料</span>
                </el-menu-item>
                <el-menu-item index="/user/updateAvatar">
                  <el-icon>
                    <Crop />
                  </el-icon>
                  <span>更换头像</span>
                </el-menu-item>
                <el-menu-item index="/user/updatePwd">
                  <el-icon>
                    <EditPen />
                  </el-icon>
                  <span>重置密码</span>
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-aside>
<!--          左侧状态按钮-->
<!--          <div class="aside-button">-->
<!--            <el-icon><EditPen /></el-icon>-->
<!--            <el-button color="#626aef"  plain class="aside-button-1">事件管理</el-button>-->

<!--            <el-button color="#626aef"  plain class="aside-button-2">事件种类管理</el-button>-->
<!--          </div>-->
<!--          <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"-->
<!--                   router>-->
<!--            <el-menu-item >-->
<!--              <el-icon>-->
<!--                <Management />-->
<!--              </el-icon>-->
<!--              <span>文章分类</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item >-->
<!--              <el-icon>-->
<!--                <Promotion />-->
<!--              </el-icon>-->
<!--              <span>文章管理</span>-->
<!--            </el-menu-item>-->
<!--            </el-menu>-->

<!--        </el-aside>-->
        <el-container>
          <!--      main-->
          <el-main class="content-layout">
<!--            <div style="width: 1300px; height: 800px;border: 2px solid #060611;">-->
<!--              内容展示区-->
<!--            </div>-->
            <router-view></router-view>
          </el-main>
          <!--      页尾-->
          <el-footer :span="12" :offset="20" >
            知然帮帮个人单体项目 ©2024 Created by 王世强 (感谢来自于黑马程序员的SpringBoot教程)
          </el-footer>
        </el-container>

      </el-container>


    </el-container>
  </div>

</template>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}
.main-page {
  //height: 5vh;
  background: url('@/assets/sources/Nessy.png');
  //background-size: ;
}
.header-shadow{
  box-shadow: 0 4px 10px -1px rgba(31, 22, 22, 0.39),0 2px 4px -1px rgba(0,0,0,0.2);
}
.bottom-shadow{
  box-shadow: 0 3px 6px -1px rgba(31, 22, 22, 0.39),0 3px 6px -1px rgba(0,0,0,0.2);
}
.common-layout{
  height: 95vh;
}
.aside-button{
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-content: center;
  height: 100vh;
}
.aside-logo{
  height: 100px;
  background: url('@/assets/sources/YGB-removebg.png');
  background-size: cover;

}
.demo-basic--circle{
  marigin-right: 10px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.hor-layout{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    padding-top: 8px;
    padding-right: 10px;
}
.center-stater{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 9px;
}
.ver-layout{
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.content-layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 10px;
  padding-left: 100px;
}
.el-footer{
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}

</style>