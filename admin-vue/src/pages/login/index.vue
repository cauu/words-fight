<template>
  <section class="login-wrapper">
    <header-top />
    <div class="banner"></div>
    <div class="login-form">
      <Form
        :rules="ruleInline"
        ref="loginForm"
        :model="formData"
        >
        <Form-item
          prop="username"
          >
          <Input
            type="text"
            v-model="formData.username"
            placeholder="Username"
            >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item
          prop="password"
          >
          <Input
            type="password"
            v-model="formData.password"
            placeholder="Password"
            >
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Row style="text-align: center">
            <Button type="primary" @click="onSubmit">登陆</Button>
            <Button type="ghost" @click="toRegister" style="margin-left:8px">注册</Button>
          </Row>
        </Form-item>
      </Form>
    </div>
  </section>
</template>

<style scoped>
  .banner {
    height: 300px;
    background: url('./assets/banner.png') center bottom/contain no-repeat;
    margin-bottom: 50px;
  }

  .login-wrapper {
    display: block;
    background: white;
    margin: 30px auto 20px;
    width: 92%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .login-form {
    margin: 0 auto;
    width: 20%;
  }
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import headerTop from '../../components/Header'

  import { login } from '../../services/auth'

  @Component({
    components: {
      headerTop
    }
  })
  export default class Login extends Vue {
    formData = {
      username: '',
      password: ''
    }

    ruleInline = {
      user: [
        { required: true, message: '请填写用户名', trigger: 'blur' } 
      ],
      password: [
        { required: true, message: '请填写密码', trigger: 'blur' },
        { type: 'string', min: 6, message: '密码长度不能小于6', trigger: 'blur' }
      ]
    }

    onSubmit() {
      const loginForm:any = this.$refs['loginForm']

      loginForm.validate(async (valid) => {
        if(valid) {
          try {
            const { result } = await login(this.formData)
            
            const { token, username } = result

            localStorage.setItem('token', `bearer ${token}`)

            this.$router.push({ path: '/book/list' })
          } catch(e) {
            this['$Message'].error(e.message)
          }
        }
      })
    }

    toRegister() {
    }
  }
</script>