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
        <input class="form-control" type="password" id="password" v-model="password"/>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button :disabled="loading" class="btn btn-primary" @click="login()">
          <Spinner width="30px" height="30px" v-if="loading"/> 
          <div v-else>Entrar</div>
        </button>
        <a class="redirect" @click="this.$router.push('/register')">Não possui conta? Registre-se agora!</a>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../../api.js';
import Spinner from '../../components/Spinner.vue';

export default {
  components: {
    Spinner
  },
  data() {
    return {
      Welcome: require('@/assets/register.svg'),
      email: null,
      password: null,
      loading: false
    }
  },
  methods:{

    async login() {
      try {
        this.loading = true;
        const user = await api.post('api/login', {email: this.email, password: this.password});
        localStorage.token = user.data.data.token;
        localStorage.user = await user.data.data;
        localStorage.setItem('user', JSON.stringify(user.data.data));
        window.dispatchEvent(new CustomEvent('updateToken', {
          detail: {
            token: user.data.data.token
          }})
        );
        this.$router.push('/home')
        this.loading = false;
        this.$toast.open({ message: 'Login realizado com sucesso!', type: 'success' })
        
      } catch (error) {
        this.loading = false;
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