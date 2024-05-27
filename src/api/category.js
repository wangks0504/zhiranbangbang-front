import instance from "@/utils/request.js";
import {useTokenStore} from "@/stores/token.js";

export const categoryListSerice =()=>{
    // const tokenStore= useTokenStore();
    // console.log('333' + tokenStore.token)
    const test = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjEsInVzZXJuYW1lIjoid2FuZ2tzMDUwNCJ9LCJleHAiOjE3MTM1ODgxODV9.D0qPqr938cP8ApKQFbll9kd1OHJ04HbqO8Ciwm7cyuc'
    // return  instance.get('/category',{headers: {'Authorization': tokenStore.token }});
    return  instance.get('/category');
}
export const categoryAddService=(categoryData)=>{

   return  instance.post('/category',categoryData)
}

export const  categoryUpdateService =(categoryData)=>{
    return instance.put('/category/update',categoryData);
}

export const categoryDeleteService = (categoryId)=>{
    return instance.delete('/category/delete?id='+categoryId);
}
