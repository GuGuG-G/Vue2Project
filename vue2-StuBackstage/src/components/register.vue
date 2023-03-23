<template>
  <div class="login_container">
    <!-- 外框 -->
    <div class="login_box">
      <!-- 注册标题 -->
      <div class="title_box">
        <div class="title_register">注册账号</div>
        <el-button @click="login" class="btn_login">
          已有账号
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>

      <!-- 表单 -->
      <el-form
        ref="fromref"
        :model="ruleform"
        label-width="0px"
        class="sign"
        :rules="ruleLogin"
        status-icon
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
            type="password"
            v-model="ruleform.password"
            @keyup.enter.native="login"
            autocomplete="off"
          >
            <!-- class="el_password_input" -->
          </el-input>
        </el-form-item>

        <!-- 密码验证 -->
        <el-form-item prop="checkpassword">
          <el-input
            placeholder="请再次输入密码"
            prefix-icon="iconfont el-icon-key"
            type="password"
            v-model="ruleform.checkpassword"
            @keyup.enter.native="login"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button round type="success" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "../api/register";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleform.checkpassword !== "") {
          this.$refs.fromref.validateField("checkpassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleform.password) {
        console.log(this.ruleform);
        console.log(undefined === undefined);
        console.log(value !== this.ruleform.password);
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleform: {
        username: "",
        password: "",
        checkpassword: ""
      },
      // 校验数据是否合法
      ruleLogin: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 4,
            max: 8,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 4,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ],
        checkpassword: [
          { validator: validatePass2, trigger: "blur" },
          {
            min: 4,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //返回登录页面
    login: function() {
      this.$router.push("/");
    },
    // 表单提交预验证
    register() {
      this.$refs.fromref.validate(async val => {
        // 预验证失败阻止程序向下执行
        if (!val) return;
        // 预验证通过发送请求
        try {
          let { data: res } = await register({
            username: this.ruleform.username,
            password: this.ruleform.password
          });
        } catch (error) {
          if (error.response.status !== 200) {
            console.log("后台返回数据status" + error.response.status);
            return this.$message.error("注册失败");
          }
        }

        this.$message.success("注册成功");
        // 保存登录成功的token
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
}
.title_box {
  // text-align: center;
  position: relative;
  height: 100px;
  width: 100%;
  // background-color: rgb(236, 162, 162);
  .title_register {
    display: inline-block;
    position: relative;
    font-size: 30px;
    margin: 30px 0;
    // background-color: #bbd7f3;
  }
  .btn_login {
    // position: relative;
    position: absolute;
    margin-top: 35px;
    margin-left: 45px;
  }
}
.login_box {
  opacity: 0.95;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
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
    margin-top: 10px;
    padding: 0 20px;

    .btns {
      display: inline-block;
      justify-content: flex-end;
    }
  }
}
</style>
