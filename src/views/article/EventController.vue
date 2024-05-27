<script setup>
//导入富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref } from 'vue'
import {ElMessage,ElMessageBox} from "element-plus";
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
//第一个搜索框中绑定的数据
const value = ref('')
//第二个搜索框中绑定的数据
const state = ref('')
const pageNum= ref(1)
const pageSize = ref(3)
const total = ref(20)
const resetSerchData= ()=>{
  value.value='';
  state.value='';
}
const onSizePage = (size)=>{
  pageSize.value= size;
  getEventList();
}
const onCurrentPage = (num)=>{
  pageNum.value= num;
  getEventList();
}
const categorys = ref([
  {
    "id": 3,
    "categoryName": "美食",
    "categoryAlias": "my",
    "createTime": "2023-09-02 12:06:59",
    "updateTime": "2023-09-02 12:06:59"
  },
  {
    "id": 4,
    "categoryName": "娱乐",
    "categoryAlias": "yl",
    "createTime": "2023-09-02 12:08:16",
    "updateTime": "2023-09-02 12:08:16"
  },
  {
    "id": 5,
    "categoryName": "军事",
    "categoryAlias": "js",
    "createTime": "2023-09-02 12:08:33",
    "updateTime": "2023-09-02 12:08:33"
  }
])

//用户搜索时选中的分类id
// const categoryId=ref('')
//文章列表数据模型
const events = ref([
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    "state": "草稿",
    "categoryId": 2,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    "state": "草稿",
    "categoryId": 2,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    "state": "草稿",
    "categoryId": 2,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
])
import {categoryDeleteService, categoryListSerice} from "@/api/category.js";
import {eventListService , eventAddService,eventUpdateService,eventDeleteService} from '@/api/event.js'
//获取事件种类
const getCategoryList = async ()=>{
  let result =await categoryListSerice();
  categorys.value = result.data;
}
getCategoryList();

const getEventList = async ()=>{
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    categoryId: value.value? value.value:null,
    state: state.value?state.value:null
  }
  console.log(value)
  console.log(params.categoryId, params.state);
  let result = await eventListService(params);
  total.value = result.data.tatal;//这里我后端也是这样写的不想改这个错误的单词了
  events.value=result.data.items;
  console.log(result.data.items);
  // 把显示的事件分类转换为分类名称给(刚开始没调用逗死我了我好像傻逼)
  for (let i = 0 ;i<events.value.length; i++){
    let event = events.value[i];
    for (let j = 0 ;j< categorys.value.length;j++){
      if (event.categoryId == categorys.value[j].id){
        event.categoryName = categorys.value[j].categoryName;
      }
    }
  }
}
getEventList();
// 抽屉##############################################################
const title =ref('');
import {Plus} from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const eventModel = ref({
  title: '',
  categoryId: '',
  coverImg: '',
  content:'',
  state:''
})
import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore();
const handleAvatarSuccess = (result)=>{
    eventModel.value.coverImg= result.data;
    console.log(result.data);
    console.log(eventModel.value.coverImg);
}
const eventAdd =async (clickState)=>{
  eventModel.value.state = clickState;
 let result =await  eventAddService(eventModel.value);
 ElMessage.success(result.message?result.message:'添加成功')
  visibleDrawer.value=false;
  // 刷新当前列表
  getEventList();
}
const eventEdit = async (row)=>{
  eventModel.value.id=row.id
  visibleDrawer.value=true
  title.value='编辑事件'
  eventModel.value.title = row.title;
  eventModel.value.categoryId = row.categoryId;
  eventModel.value.categoryImg = row.categoryImg;
  eventModel.value.content = row.content;
}
const eventUpdate =async (clickState) =>{
  eventModel.value.state= clickState;
  let result = await eventUpdateService(eventModel.value);
  ElMessage.success(result.message?result.message:'更新成功')
  console.log('更新')
  getEventList();
}
const eventDelete =async (row)=>{

  ElMessageBox.confirm(
      '你真的想要删除它嘛🤣👌?',
      '警告你奥',
      {
        confirmButtonText: '确定',
        cancelButtonText: '你看,又急',
        type: 'warning',
      }
  )
      .then(async () => {
        let result = await eventDeleteService(row.id);

        // ElMessage.success(result.message?result.message:'删除成功')
        // ElMessage.success('删除成功')

        ElMessage({
          type: 'success',
          message: '删除啦',
        })
        getEventList();
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消啦',
        })
      })
}
</script>
<template>
  <!--  头部内容-->
    <el-card class="page-container">
      <template #header>
        <div class="header">
          <span>事件管理</span>
          <div>
            <el-button type="primary" @click="visibleDrawer=true,title='添加事件'" >添加事件</el-button>
          </div>
        </div>
      </template>
      <el-form style="display: flex;flex-direction: row;">
        <el-form-item label="事件种类" style="padding-left: 20px">
          <el-select  v-model="value" placeholder="请选择" style="width: 240px" >
            <el-option
                v-for="c in categorys"
                :key="c.id"
                :label="c.categoryName"
                :value="c.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发表状态" style="padding-left: 20px">
          <el-select v-model="state" placeholder="请选择" style="width: 240px" >
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-left: 20px">
          <el-button @click="resetSerchData">重置</el-button>
          <el-button type="primary" @click="getEventList">搜索</el-button>
        </el-form-item>
      </el-form>
<!--      文章列表-->
      <el-table :data="events" style="width: 100%">
        <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
        <el-table-column label="分类" prop="categoryName"></el-table-column>
        <el-table-column label="发表时间" prop="createTime"> </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button :icon="Edit" circle plain type="primary" @click="eventEdit(row)"></el-button>
            <el-button :icon="Delete" circle plain type="danger" @click="eventDelete(row)"></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
      <div style="display: flex; justify-content: end; padding-top: 20px">
        <div ></div>
        <el-pagination
            v-model:current-page="pageNum"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="onSizePage"
            @current-change="onCurrentPage"
        />
      </div>
    </el-card>
<!--  事件编辑-->
  <!-- 抽屉 -->
  <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="70%">
    <!-- 添加文章表单 -->
    <el-form :model="eventModel" label-width="100px" >
      <el-form-item label="事件标题" >
        <el-input v-model="eventModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="事件分类">
        <el-select placeholder="请选择" v-model="eventModel.categoryId">
          <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件封面">

        <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                   action="/api/fileUpload/userImgUpload"
                   name="multipartFile"
                   :headers="{'authorization':tokenStore.token}"
                   :on-success="handleAvatarSuccess">
            →选择文件小于1MB的图片←
          <img v-if="eventModel.coverImg" :src="eventModel.coverImg" class="userImg" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <div class="editor">
          <quill-editor
              theme="snow"
              v-model:content="eventModel.content"
              contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="title=='添加事件'?eventAdd('已发布'):eventUpdate('已发布')">发布</el-button>
        <el-button type="info" @click="title=='添加事件'?eventAdd('草稿'):eventUpdate('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>



</template>
<style scoped>
.page-container{
  box-sizing: border-box;
  min-height: 100%;
  min-width: 106%;
  margin-right: 75px
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* 抽屉样式 */
.userImg{
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  height: 500px;
  :deep(.ql-editor) {
    min-height: 300px;
  }
}
</style>
