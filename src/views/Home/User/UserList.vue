<template>
  <div class="user-list">
    <!-- 面包屑区域 -->
    <el-breadcrumb class="breadcrumb-nav" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->

    <!-- 搜索区域 -->
    <el-row :gutter="20" class="search-box">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click="handleSearchClick"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleAddClick">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 搜索区域 -->

    <div class="user-table">
      <!-- 表格区域 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
        >
        </el-table-column>
        <el-table-column
          label="日期"
          width="200px">
          <template slot-scope="scope">
            {{scope.row.date | moment}}
          </template>
        </el-table-column>
        <el-table-column label="是否禁用">
          <template slot-scope="scope">
            <el-switch
              @change="handleSwitchUser(scope.row)"
              v-model="scope.row.disabled"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑用户" placement="top">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEditUser(scope.$index, scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDeleteUser(scope.$index, scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格区域 -->
    </div>

    <!-- 分页区域 -->
    <div class="block pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 分页区域 -->

    <!-- 添加用户区域 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisibleAddUser" @close="closeUser">
      <el-form :model="addUser" :rules="userRules" ref="addUser">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="120px" prop="age">
          <el-input v-model="addUser.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="sex">
          <el-input v-model="addUser.sex" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAddUser">取 消</el-button>
        <el-button type="primary" @click="handleOkAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户区域 -->

    <!-- 用户编辑区域 -->
    <el-dialog title="编辑用户" :visible.sync="dialogVisibleEditUser">
      <el-form :model="editUser" :rules="userRules" ref="editUser">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="editUser.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="editUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="120px" prop="age">
          <el-input v-model="editUser.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="sex">
          <el-input v-model="editUser.sex" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelEditUser">取 消</el-button>
        <el-button type="primary" @click="handleOkEditUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户编辑区域 -->
  </div>
</template>

<script>
import { addUser, getUserList, updateUser, deleteUser } from 'network/api/user'
export default {
  name: 'UserList',
  data() {
    const validateEmail = (rule, value, callback) => {
      const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (reg.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的邮箱账号'))
    }
    const validateAge = (rule, value, callback) => {
      if (Number(value) >= 0 && Number(value) <= 150) {
        return callback()
      }
      callback(new Error('年龄在0到150之间'))
    }
    return {
      tableData: [],
      dialogVisibleAddUser: false,
      dialogVisibleEditUser: false,
      editUser: {},
      addUser: {
        username: '',
        password: '',
        email: '',
        age: '',
        sex: ''
      },
      currentIndex: 0,
      pagenum: 1,
      pagesize: 5,
      total: 5,
      query: '',
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // message
    message(type, message) {
      this.$message({
        type,
        message,
        showClose: true
      })
    },
    // 获取用户列表
    getUserList() {
      const query = this.query ? { username: this.query } : {}
      getUserList(this.pagenum, this.pagesize, query).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    // 用户面板搜索按钮
    handleSearchClick() {
      this.getUserList()
    },
    // 用户面板添加用户按钮
    handleAddClick() {
      this.dialogVisibleAddUser = true
    },
    // 用户面板编辑按钮
    handleEditUser(index, data) {
      this.editUser = { ...data }
      this.dialogVisibleEditUser = true
      this.currentIndex = index
    },
    // 用户面板删除用户按钮
    handleDeleteUser(index, user) {
      this.$confirm('是否永久删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(user).then(res => {
          const data = res.data
          if (data.code === 0) {
            this.message('success', '删除成功!')
            // this.tableData = this.tableData.filter((item, currentIndex) => currentIndex !== index)
            this.getUserList()
          } else {
            this.message('error', '删除失败!')
          }
        })
      }).catch(() => {
        this.message('info', '已取消删除')
      })
    },
    // 用户面板更改用户状态按钮
    handleSwitchUser(user) {
      updateUser(user).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.message('success', '用户状态更改成功!')
        } else {
          this.message('error', '用户状态更改失败!')
        }
      })
    },
    // 关闭添加用户
    closeUser() {
      this.$refs.addUser.resetFields()
    },
    // 添加用户面板取消按钮
    handleCancelAddUser() {
      this.dialogVisibleAddUser = false
    },
    // 添加用户面板确定按钮
    handleOkAddUser() {
      this.$refs.addUser.validate(valid => {
        if (valid) {
          addUser(this.addUser).then(res => {
            const data = res.data
            if (data.code === 0) {
              this.getUserList()
              this.message('success', '添加用户成功!')
            } else {
              this.message('error', '添加用户失败!')
            }
            this.dialogVisibleAddUser = false
          })
        } else {
          this.dialogVisibleAddUser = false
          return false
        }
      })
    },
    // 编辑用户面板取消按钮
    handleCancelEditUser() {
      this.dialogVisibleEditUser = false
      this.$refs.editUser.resetFields()
    },
    // 编辑用户面板确定按钮
    handleOkEditUser() {
      this.dialogVisibleEditUser = false
      updateUser(this.editUser).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.message('success', '用户信息更改成功!')
          this.$set(this.tableData, this.currentIndex, this.editUser)
        } else {
          this.message('error', '用户信息更改失败!')
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    }
  },
  watch: {
    query(newVal) {
      if (newVal === '') {
        this.getUserList()
      }
    }
  }
}
</script>

<style>
  .user-list{
    padding: 10px 15px;
    background-color: #fff;
  }
  .user-list .breadcrumb-nav{
    height: 60px;
    line-height: 60px;
  }
  .user-list .search-box{
    margin-bottom: 15px;
  }
  .user-list .user-table{
    overflow-y: auto;
    height: 314px;
  }
  .user-list .pagination-wrap.block{
    margin-top: 15px;
  }
</style>
