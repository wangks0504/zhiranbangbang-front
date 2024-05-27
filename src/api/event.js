import instance from '@/utils/request.js'
export const eventListService = (params)=>{
   return  instance.get('/event',{params:params})
}
export const eventAddService = (eventModel)=>{
   return instance.post('/event/add',eventModel);
}
export const eventUpdateService = (eventModel)=>{
   return instance.put('/event/update',eventModel)
}
export const eventDeleteService =(eventId)=>{
   return instance.delete('/event/delete?id='+eventId);
}