<template>
  <div class="login">
    <el-card class="box-card">
      <!-- 头部区域 -->
      <div slot="header" class="card-header">
        <span>管理员登录</span>
      </div>
      <!-- 头部区域 -->

      <!-- 表单区域 -->
      <div class="form-wrap">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表单区域 -->
    </el-card>
  </div>
</template>

<script>
import { CODE_SUCCESS } from 'utils/code'
import { checkLogin } from 'network/api/auth'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setLogin']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleLogin()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleLogin() {
      const loading = this.$loading({
        lock: true,
        text: '正在登陆中...'
      })
      checkLogin(this.ruleForm).then(res => {
        const data = res.data
        const { code } = data
        if (code === CODE_SUCCESS) {
          this.handleLoginSuccess(data)
        } else {
          this.handleLoginFailure(data)
        }
        loading.close()
      }).catch(() => {
        loading.close()
        this.handleLoginFailure()
      })
    },
    handleLoginSuccess(data) {
      this.setLogin(true) // 修改登陆状态
      sessionStorage.setItem('admin_user', JSON.stringify(data.data))
      sessionStorage.setItem('admin_token', data.token)
      this.$router.push('/home')
    },
    handleLoginFailure() {
      // this.resetForm('ruleForm')
      this.$message.error('错了哦，登录失败！')
    }
  }
}
</script>

<style>
  .login{
    height: 100%;
    background-color:#2C3E50;
  }
  .login .box-card{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 450px;
    transform: translate(-50%, -50%);
  }
  .login .box-card .card-header{
    font-weight: bold;
    text-align: center;
  }
</style>
