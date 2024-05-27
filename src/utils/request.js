//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';//配置代理 实现跨域请求
const instance = axios.create({baseURL})
import { ElMessage } from 'element-plus'//对提示框的美化
//添加请求拦截器
import {useTokenStore} from '@/stores/token.js'

// 创建一个 Axios 实例的拦截器
instance.interceptors.request.use(
    (config) => {
        // config 参数是请求的配置对象，包括请求的URL、HTTP方法、headers等
        const tokenStore = useTokenStore(); // 使用Pinia的store，这里假设存储了token
        if (tokenStore.token) {
            // 如果token存在于store中
            config.headers.Authorization = tokenStore.token; // 把token添加到请求头的Authorization字段
        }
        return config; // 返回修改后的config对象，继续执行请求
    },

    (err) => {
        // 这是一个错误处理函数，它在请求发出前遇到错误时被调用
        // promise.reject(err)应该改为Promise.reject(err)来返回一个拒绝状态的Promise
        return Promise.reject(err); // 拒绝这个Promise，这将被Axios的catch处理
    }
);

import router from '@/router'
//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        if(result.data.code === 0) {
            return result.data;
        }
        ElMessage.error(result.data.msg? result.data.msg : '服务异常')
        return Promise.reject(result.data);
    },
    err=>{
        if (err.response.status === 401){
            ElMessage.error('请先登录')
            router.push('/login');
        }
        ElMessage.error('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;