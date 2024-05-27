<script lang="ts" setup>
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import {ref} from 'vue'
const categorys = ref(
    [
      {
        "id": 3,
        "categoryName": "nihao",
        "categoryAlias": "wobuhao",
        "createTime": '1111-11-11 11:11:11',
        "updateTime": '1111-11-11 11:11:11'
      }
    ]
)
// 获取分类列表
import { ElMessage,ElMessageBox } from 'element-plus';
import { categoryListSerice,categoryAddService,categoryUpdateService,categoryDeleteService}from '@/api/category.js'
const categoryList = async ()=>{
   let result = await categoryListSerice();
   console.log()
  categorys.value=  result.data;
}
categoryList();

// dialog对话框添加分类列表
const dialogVisible = ref(false) ;
const dialogVisibleDelete = ref(false);
const categoryId = ref('');

const title = ref('')

const categoryData = ref({
  categoryName:  '',
  categoryAlias:  ''
})
const rules ={
  categoryName: [
    {required: true, message:'请输入分类名称',trigger: 'blur'},
    {min: 1,max: 10, message: '长度限制在5-10',tigger:'blur'}

  ],
  categoryAlias: [
    {required: true , message:'请输入分类别名', trigger: 'blur'},
    {min: 1,max: 20, message: '长度限制在5-10',tigger:'blur'}
  ]
}
const addCategory = async ()=>{
  let result = await categoryAddService(categoryData.value)
  ElMessage.success(result.msg? result.msg:'成功添加');
//   刷新分类页面
  categoryList();
  dialogVisible.value= false;
}
const updateCategory = async ()=>{
  let result = await categoryUpdateService(categoryData.value);
  ElMessage.success(result.msg?result.msg:'修改成功')
  categoryList();
  dialogVisible.value = false;
}
//######################################
const deleteCategory = async (row)=>{
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
          let result = await categoryDeleteService(row.id)
           console.log(row.id)
          // ElMessage.success('删除成功')

          ElMessage({
            type: 'success',
            message: '删除啦',
          })
          categoryList();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消啦',
          })
        })

}
//#############################
const showDialogEdit =(row)=>{
  dialogVisible.value=true;
  title.value='编辑分类'
  categoryData.value.categoryName=row.categoryName;
  categoryData.value.categoryAlias=row.categoryAlias;
  categoryData.value.id = row.id;
}
const showDialogAdd =()=>{
  dialogVisible.value=true;
  title.value='添加分类'
  categoryData.value.categoryName='';
  categoryData.value.categoryAlias=''
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>事件分类</span>
        <div>
          <el-button type="primary" @click="showDialogAdd">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column prop="id" label="序号" width="100"  />
      <el-table-column prop="categoryName" label="分类名称"  />
      <el-table-column prop="categoryAlias" label="分类别名" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />

      <el-table-column prop="" label="编辑" width="100">

          <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle plain @click="showDialogEdit(row)"/>

          <el-button type="danger" :icon="Delete" circle plain @click="deleteCategory(row)"/>
          </template>
      </el-table-column>


    </el-table>
  </el-card>
<!--  弹出对话框-->
  <el-dialog v-model="dialogVisible" :title="title" width="30%" class="el-dialog">
    <el-form :model="categoryData" label-width="100px" :rules="rules" style="padding-right: 30px">
      <el-form-item label="分类名称" prop="categoryName" >
        <el-input v-model="categoryData.categoryName" minlength="1" maxlength="15">

        </el-input>
      </el-form-item >
      <el-form-item label="分类别名" prop="categoryAlias">
        <el-input v-model="categoryData.categoryAlias" minlength="1" maxlength="15">

        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
        <span >
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="title=='添加分类'? addCategory(): updateCategory()"> 确认 </el-button>
        </span>
    </template>
  </el-dialog>
<!--  编辑对话框-->
<!--  <el-dialog v-model="dialogVisibleDelete" title="您确定要删除这个分类嘛" width="30%" class="el-dialog">-->
<!--    <template #footer>-->
<!--        <span >-->
<!--            <el-button @click="dialogVisibleDelete = false">取消</el-button>-->
<!--            <el-button type="primary" @click="deleteCategory()"> 确认 </el-button>-->
<!--        </span>-->
<!--    </template>-->
<!--  </el-dialog>-->


</template>
<style scoped>
.page-container {
  min-height: 100%;
  min-width: 106%;
  box-sizing: border-box;
  margin-right: 75px;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-dialog{
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 200px;
}
.categoryDialog{
  display: flex;
  border-radius: 20px;
  align-items: center;
}

</style>


