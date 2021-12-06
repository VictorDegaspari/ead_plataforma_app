<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" style="cursor:default">
      EAD PLATAFORMA
      <!-- <img style="margin:0 10px" :src="profile" alt=""> -->
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li @click="setActive('/home'), this.$router.push('/home')" class="nav-item" :class="{ active:isActive('/home') }">
            <a class="nav-link" aria-current="page"> 
                Home
            </a>
        </li>
        <li @click="setActive('/courses'), this.$router.push('/courses')" class="nav-item" :class="{ active:isActive('/courses') }">
          <a class="nav-link">
            Cursos
          </a>
        </li>
        <li @click="setActive('/favorites'), this.$router.push('/favorites')" class="nav-item" :class="{ active:isActive('/favorites') }">
          <a class="nav-link">
            Favoritos
          </a>
        </li>
        <li @click="setActive('/categories'), this.$router.push('/categories')" class="nav-item" :class="{ active:isActive('/categories') }">
          <a class="nav-link">
            Categorias
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Opções
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item">Perfil</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item">Sair</a></li>
          </ul>
        </li>
      </ul>
      <div class="d-flex user" style="cursor:pointer">
        <p style="margin:0">Olá, {{ this.user?.name || 'usuário' }}</p>
        <img style="margin:0 10px" :src="profile" alt="">
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data: () => {
    return {
      profile: require('@/assets/icons/profile.svg'),
      activeItem: 'about',
      user:  null
    }
  },
  methods:{
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem // no need for Vue.set()
    }
  },
  mounted() {
    this.isActive(this.$route.path);
    this.setActive(this.$route.path);
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
</script>
<style scoped>
  li, a {
    text-decoration: none;
    color: #151515;
    cursor: pointer;
  }
  .active {
    border-bottom: 3px solid #00BFA6;
  }
  nav {
    padding-bottom:0 ;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9999;
  }
  img {
    height: 32px;
    width: 32px;
  }
  .user {
    align-items: center;
  }
</style>