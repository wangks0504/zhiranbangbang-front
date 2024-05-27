// 注册用户接口
import instance from "@/utils/request.js"
import { install } from "element-plus";
export const userRegisterService =(registerInfo)=>{
    const params = new URLSearchParams();
    for(let key in registerInfo){
        params.append(key,registerInfo[key])
    }
   return instance.post('/user/register',params);
}
// 登录用户接口
export const userLoginService = (loginInfo)=>{
    const params = new URLSearchParams();
    for (let key in loginInfo)
    {
        params.append(key,loginInfo[key])
    }
   return instance.post('user/login',params);
}
//获取用户详细信息
export const userInfoService = ()=>{
    return instance.get('/user/userInfo')
}
export const userInfoUpdateService = (userInfos)=>{
    return instance.put('/user/update',userInfos)
}
export const userPicUpdateService = (userPicUrl)=>{
    const params= new URLSearchParams()
    params.append('avatarUrl',userPicUrl);
    return instance.patch('/user/updateAvatar',params)
}
export const userPasswordUpdateService = (params)=>{

    return instance.patch('/user/updatePwd',params)
}
