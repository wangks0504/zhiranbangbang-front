//创建路由完成页面跳转
import { createRouter ,createWebHistory} from 'vue-router'//引用路由
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import UserInfo from "@/views/user/UserInfo.vue";
import UserAvatar from "@/views/user/UserAvatar.vue";
import UserResetPassword from "@/views/user/UserResetPassword.vue";
import CategoryController from "@/views/article/CategoryController.vue";
import EventController from "@/views/article/EventController.vue";
const routes = [
    {path: '' ,component:LoginVue},
    {path: '/login' ,component:LoginVue},
    {path: '/layout',component:LayoutVue,redirect:'/event' ,children:[
            {path: '/user/userInfo',component:UserInfo},
            // 用户信息子路由
            {path:'/user/updateAvatar',component:UserAvatar},
            // 用户头像子路由
            {path:'/user/updatePwd',component:UserResetPassword},
        //     更改密码子路由
            {path:'/category',component: CategoryController},
            {path:'/event',component: EventController }
        ]}
]
 const router = createRouter({
    history: createWebHistory(),
    routes: routes
 }  
)
export default router;