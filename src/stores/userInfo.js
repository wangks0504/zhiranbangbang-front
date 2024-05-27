import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUserInfoStore = defineStore('userInfo',()=>{
    const userInfo = ref({});
    const setUserInfo = (newInfo)=>{
        userInfo.value=newInfo;
    }
    const removeUserInfo = () =>{
        userInfo.value= {};
    }
    return{
        userInfo,setUserInfo,removeUserInfo
    }


},

{
    persist: true
})