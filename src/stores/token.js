import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useTokenStore = defineStore('token',()=>{
    const token =ref('');//在pinia中定义的数据都不需要.value可以直接使用
    const setToken = (newToken)=>{
        token.value=newToken;
    }
    const removeToken = ()=>{
        token.value='';
    }
    return {
        token ,setToken,removeToken
    }
        },
    {
        persist: true
    }
);
