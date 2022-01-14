<template>
    <div class="login">
        <div class="left"><img :src="Welcome" alt="Welcome"></div>
        <div  class="right" style="background-color: white; padding: 50px">
            <h1>EAD PLATAFORMA</h1>
            <p style="margin-bottom: 0">Crie sua conta gratuita!</p>
            <p>Preencha corretamente os dados para a criação da sua conta.</p>
            <div class="input-group mb-3 ">
                <label class="input-group-text" for="name">* Nome Completo</label>
                <input 
                    type="text" 
                    v-model="name" 
                    class="form-control" 
                    id='name'
                    :class = "[ this.name.length != 0 ? 'active' : 'inactive' ]" 
                >
            </div>
            
            <div class="input-group mb-3 ">
                <label class="input-group-text" for="email">* Email</label>
                <input 
                    type="text" 
                    v-model="email" 
                    class="form-control"
                    id='email'
                    :class = "[ this.email.length != 0 ? 'active' : 'inactive' ]" 
                >
            </div>

            <div class="input-group mb-3 ">
                <label class="input-group-text" for="password">* Senha: </label>
                <input 
                    type="password" 
                    v-model="password" 
                    class="form-control"  
                    id='password' 
                    :class = "[ this.password ==  this.c_password  && this.password != '' ? 'active' : 'inactive' ]" 
                >
            </div>

            <div class="input-group mb-3 ">
                <label class="input-group-text" for="c_password">* Confirmar Senha:  </label> 
                <input 
                    type="password" 
                    v-model="c_password" 
                    class="form-control" 
                    id='c_password'
                    :class = "[ this.password == this.c_password && this.password != '' ? 'active' : 'inactive' ]" 
                >
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
                <button :disabled="loading" :class = "[ this.password == this.c_password && this.password != '' ? 'btn btn-success' : 'btn btn-danger']" @click="register"> 
                    <Spinner v-if="loading"/> 
                    <div v-else>Criar conta!</div>
                </button>
                <a class="redirect"  @click="this.$router.push('/')">Possui conta? Faça o login!</a>

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
            name: '',
            email: '',
            password: '',
            c_password: '',
            loading: false
        }
    },

    methods:{
        async register() {
            try {
                if (
                    this.name == '' ||
                    this.email == '' ||
                    this.password == '' ||
                    this.password != this.c_password
                ){
                    return this.$toast.open({ message: 'Preencha todos o campos', type: 'error' });
                }
                this.loading = true;
                const user = await api.post('api/register', {name: this.name, email: this.email, password: this.password, c_password: this.c_password});
                localStorage.token = user.data.data.token;
                localStorage.user = user.data.data;
                localStorage.setItem('user', JSON.stringify(user.data.data));
                window.dispatchEvent(new CustomEvent('updateToken', {
                    detail: {
                        token: user.data.data.token
                    }})
                );
                this.$router.push('/home');
                this.loading = false;
                this.$toast.open({ message: 'Conta criada com sucesso!', type: 'success' })
                
            } catch (error) {
                this.loading = false;
                this.$toast.open({ message: 'E-mail ou senha inválidos. Por favor insira um válido.', type: 'error' });
                console.error(error);
            }
        },
    },
}
</script>

<style lang='scss' scoped> 

.inactive{
    color : #F50057;
    border:1px solid #F50057;
}

.active{
    color: #00BFA6;
    border:1px solid #00BFA6;
}
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
.redirect {
    cursor: pointer;
    text-decoration: underline;
    color: rgb(0, 97, 216);
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
</style>