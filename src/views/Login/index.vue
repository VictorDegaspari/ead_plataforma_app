<template>
  <div class="login">
    <div class="left"><img :src="Welcome" alt="Welcome"></div>
    <div class="right">
      <h1>EAD PLATAFORMA</h1>
      <div class="input-group mb-3 ">
        <label class="input-group-text" for="email">Email</label>
        <input class="form-control" id="email" v-model="email"/>
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text" for="password">Senha</label>
        <input class="form-control" id="password" v-model="password"/>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-primary" @click="login()">Entrar</button>
        <a class="redirect" @click="this.$router.push('/register')">Não possui conta? Registre-se agora!</a>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../../api.js';
export default {
  data() {
    return {
      Welcome: require('@/assets/register.svg'),
      email: null,
      password: null
    }
  },
  methods:{

    async login() {
      try {
        const user = await api.post('api/login', {email: this.email, password: this.password});
        localStorage.token = user.data.data.token
        this.$router.push('/home')
        this.$toast.open({ message: 'Login realizado com sucesso!', type: 'success' })
        
      } catch (error) {
        this.$toast.open({ message: 'E-mail ou senha inválidos. Por favor insira um válido.', type: 'error' })
        console.error(error)
      }
    },
    },
}
</script>

<style lang='scss' scoped>
.login {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  background: #e6e6e6;
  z-index: 99;
  h1 {
    font-weight: bold;
  }
}
.left, .right {
  width: 50%;
  height: 100vh;
}
.left,.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.right {
  padding: 20px;
  background: white;
}
.input-group {
  max-width: 445px;
}
@media (max-width: 768px){
  .left {
      display: none;
  }
  .right {
    width: 100%;
    justify-content: center
  }
}
.redirect {
  cursor: pointer;
  text-decoration: underline;
  color: rgb(0, 97, 216);
}
</style>