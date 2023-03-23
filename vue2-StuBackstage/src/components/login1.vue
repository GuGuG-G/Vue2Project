<template>
  <div class="login_container">
    <!-- 外框 -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="logo">
        <img src="../assets/touxiang.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        ref="formRef"
        :model="ruleform"
        label-width="0px"
        class="sign"
        :rules="ruleLogin"
      >
        <!-- 登录名 -->
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            prefix-icon="iconfont el-icon-user"
            v-model="ruleform.username"
          >
            <!-- class="el_user_input" -->
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="iconfont el-icon-key"
            show-password
            v-model="ruleform.password"
            @keyup.enter.native="login"
          >
            <!-- class="el_password_input" -->
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button round type="primary" @click="login2">登录</el-button>
          <el-button round type="success" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/login.js";

export default {
  data() {
    return {
      ruleform: {
        username: "admin",
        password: "123456"
      },
      // 校验数据是否合法
      ruleLogin: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //注册账号
    register: function() {
      this.$router.push("/register");
    },
    // 重置方法
    reset: function() {
      this.$refs.formRef.resetFields();
    },

    async login1() {
      let result = await login({
        username: this.form.username,
        password: this.form.password
      });
      if (result.status === 200) {
        console.log("登录成功");
        this.$router.push("/home");
      }
      if (result.status === 400) {
        console.log("登录失败");
      }
    },

    //表单提交预验证
    login2() {
      this.$refs.formRef.validate(async val => {
        // 预验证失败阻止程序向下执行
        if (!val) return;
        // 预验证通过发送请求
        try {
          let { data: res } = await login({
            username: this.ruleform.username,
            password: this.ruleform.password
          });
        } catch (error) {
          console.log(error);
          if (error.response.status !== 200) {
            console.log("后台返回数据:");
            return this.$message.error("登录失败");
          }
        }

        this.$message.success("登录成功");
        // 保存登录成功的token;
        // window.sessionStorage.setItem("token", res.data.token);
        // 跳转到home页面
        this.$router.push("/home");
      });
    }
  }
};
</script>

// 样式
<style lang="less" scoped>
.login_container {
  height: 100%;
  width: 100%;
  background-color: #bbd7f3;
  background-repeat: no-repeat;
  background-size: cover;
}

.login_box {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 310px;
  width: 520px;
  border-radius: 14px;
  background-color: #fff;
  text-align: center;
  .logo {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el_user_input {
    width: 90%;
    height: 50px;
  }
  .el_password_input {
    width: 90%;
  }
  .sign {
    margin-top: 100px;
    padding: 0 20px;

    .btns {
      margin-top: 10px;
      display: inline-block;
      justify-content: flex-end;
    }
  }
}
</style>
