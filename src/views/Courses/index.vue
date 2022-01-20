<template>
  <div class="course-page">
    <header class="m-3">
      <button class="btn btn-dark" @click="showCreate = true" v-show="!showCreate">ADICIONAR CURSO</button>
      <button class="btn btn-dark" @click="showCreate = false" v-show="showCreate">VOLTAR</button>
      <button v-show="this.$route.query.id" @click.prevent="this.$router.push('/courses')" class=" m--5 btn btn-dark">Voltar</button>
    </header>


    <div style="padding:20px" id="courses" v-if="!showCreate">
      <div class="d-flex" style="width:100%; flex-direction:column; align-items:center" v-if="courses?.length === 0">
        <h2>Nenhum curso cadastrado ;(</h2>
        <img :src="empty" alt="empty" width="300">
      </div>

      <div 
        style="display:flex; flex-direction:column; justify-content:center; align-items:center"
        v-for="course in courses" :key="course.id"
      >
            <Card 
              style="margin:5px; height:505px"
              class="scroll"
              textButton="Assistir"
              :id="course.id" 
              :title="course.name" 
              :description="course.detail" 
              :category="course?.categories[0]?.name" 
              :color="course?.categories[0]?.color"
              :showHeart="!course.users[0]?.pivot.admin ? true : false"
              :liked="course.users.length > 0 == user.id ? true : false"
              :showImage="true"
              @like="like($event)"
              :videoId="formatUrl(course.url)"
            />
      </div>
      <Pagination 
        :links="paginationLinks" 
        :lastPageUrl="paginationLastPage" 
        :firstPageUrl="paginationFirstPage"
        :previousPageUrl="paginationPreviousPage"
        :nextPageUrl="paginationNextPage"
        @pageChanged="pageChanged($event)"
      /> 
    </div>

    <div class="create d-flex" v-if="showCreate">
      <h1 style="text-align:center;" class="titles m-3">CADASTRO DE CURSO</h1>
      <h3 class="titles">Título</h3>
      <div class="form-floating mb-3 w-100">
        <input type="text" class="form-control" id="floatingInput" v-model="title" placeholder="Title">
        <label for="floatingInput">Título do curso:</label>
      </div>

      <h3 class="titles">Descrição</h3>
      <div class="form-floating mb-3 w-100">
        <input type="text" class="form-control" id="description" v-model="description" placeholder="Description">
        <label for="description">Descrição do curso:</label>
      </div>

      <h3 class="titles">Duração</h3>
      <div class="form-floating mb-3 w-100">
        <input type="text" id="time" v-mask="['##:##', '###:##']" class="form-control" v-model="time" placeholder="HH:mm">
        <label for="time">HH:mm</label>
      </div>

      <h3 class="titles">Categoria</h3>
      <select class="w-100" v-model="categoryId">
        <option v-for="category in categories" :value="category.id" :key="category.id">
          {{ category.name }}
        </option>
      </select>
      <!-- <a href=""><small>Cadastrar nova categoria</small></a> -->
      <h3 class="titles">URL</h3>
      <div class="form-floating mb-3 w-100">
        <input type="text" id="URL" class="form-control" v-model.trim="url" placeholder="URL do vídeo">
        <label for="URL">URL do vídeo:</label>
      </div>

      <div class="d-flex w-100">
        <button style="background:#F50057; color: white" @click="showCreate = false" class="btn w-50">CANCELAR</button>
        <button style="background:#00BFA6; color: white" class="btn w-50" @click.prevent="newCourse()">CRIAR</button>
      </div>
    </div>
    <img class="background" :src="moon" alt="cadastroCursos" v-if="!showCreate" height="1000">
    <img class="background" :src="course" alt="cadastroCurso" v-if="showCreate">
    <div class="loading" v-show="loading">
      <Spinner width="100px" height="100px"/> 
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Card from '../../components/Card.vue';
import Pagination from '../../components/Pagination.vue';
import Spinner from '../../components/Spinner.vue';
import api from '../../api.js';

export default defineComponent( {
  components: {
    Card,    
    Pagination,
    Spinner
  },
  
  data() {

    return {
      empty: require('@/assets/empty.svg'),
      course: require('@/assets/createCourse.svg'),
      moon: require('@/assets/moon.svg'),

      time: null,
      title: null,
      description: null,
      url: null,
      categoryId: null,

      courses: [],
      categories: [],
      showCreate: null,
      loading: false,
      error: false,
      user: {},
      paginationLinks: [],
      paginationLastPage: '',
      paginationFirstPage: '',
      paginationNextPage: '',
      paginationPreviousPage: ''
    }
  },
  methods:{
    showOption(course) {
      let id = parseInt(this.$route.query.id);
      if (id && id !== course) {
        return false;
      }
      return true;
    },

    async like(data) {

      try {
        api.post('api/attachCourse', { courseId: data['id'] }) 
      } catch (error) {
        console.error(error);
      }

    },

    async newCourse() {

      try {
        this.loading = true;
        let cursePayload = {
          name: this.title,
          detail: this.description,
          categoryId: this.categoryId,
          url: this.url,
          time: this.time,
          users_id: this.user.id
        };

        if (!cursePayload.name || !cursePayload.detail || !cursePayload.time || !cursePayload.categoryId || !cursePayload.url) {

          if (!cursePayload.name) this.error = true;
          if (!cursePayload.detail) this.error = true;
          if (!cursePayload.categoryId) this.error = true;

          this.$toast.open({ message: 'Preencha todos os campos', type: 'error' })
          this.loading = false;
          return;
        }
  
        await api.post('api/courses', cursePayload).then(() => {
          this.$toast.open({ message: 'curso criado com sucesso!', type: 'success' })
          this.description = '';
          this.title = '';
          this.time = '';
          this.loading = false;
          this.error = false;
        });
        
      } catch (error) {
        this.$toast.open({ message: 'erro ao criar curso', type: 'error' })
        this.loading = false;
        console.error(error);
      }
    },

    async coursesResource(page = 'api/courses?page=1') {

      try {
        this.loading = true;

        await api.get(page).then(resp => {

          let response = resp.data.data;

          this.courses = response.data
          this.paginationLinks = response.links;
          this.paginationFirstPage = response.first_page_url;
          this.paginationLastPage = response.last_page_url;
          this.paginationPreviousPage = response.prev_page_url;
          this.paginationNextPage = response.next_page_url;
          this.loading = false;
        });
        const categories = await api.get('api/categories');
        this.categories = categories.data.data.data;

      } catch (error) {
        this.loading = false;
        this.$toast.open({ message: 'erro ao carregar cursos', type: 'error' });
        console.error(error);

      }
    },

    async loggedUser() {

      try {

        const user = await api.get('api/loggedUser');
        this.user = user.data.data;

      } catch (error) {

        this.$toast.open({ message: 'erro ao carregar usuário', type: 'error' });
        console.error(error);

      }
    },

    pageChanged($value) {
      this.coursesResource($value);
    },

    formatUrl(url) {

      let formattedUrl = (url.match(/v=(.*$)/) || [])[1] || url;
      formattedUrl = formattedUrl.split("&")[0];

      return formattedUrl;
    }

  },
  mounted() {
    this.loggedUser();
    this.coursesResource();
  },

})
</script>

<style lang="scss" scoped>
  button { height: 50px }
  #courses {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    overflow: auto;
    flex-flow: row wrap;
    position: relative;
    height: 100%;
  }
  .m--5 {
    margin: 5px;
  }
  .course-page {
    padding: 0 0px;
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

  }
  .create {
    max-width: 800px;
    width: 100%;
    background: #051d3b;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: 2px solid #6C63FF;
    padding: 20px;
  }
  input, select {
    background: rgb(255, 255, 255);
    color: #151515;
    display: block;
    height: 57px;
    font-size: 18px;
    outline: 0px;
    border-width: 4px 0px;
    border-right-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-left-color: initial;
    border-image: initial;
    border-top-style: solid;
    border-top-color: transparent;
    border-bottom-style: solid;
    border-bottom-color: #6C63FF;
    padding: 12px;
    margin-bottom: 45px;
    resize: none;
    border-radius: 4px;
    transition: border-color 0.3s ease 0s;
  }
  .titles {
    width: 100%;
    text-align: left;
    color: white;
  }
  .background {
    position: fixed;
    z-index: -1;
    width: 100%;
    left: 0;
    top: 0;
  }
  .loading {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    background: #15151567;
  }
  .scroll {
    h5 {
      max-height: 93px;
      overflow-y: auto;
      &::-webkit-scrollbar-track
      {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
      }

      &::-webkit-scrollbar
      {
        width: 5px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb
      {
        border-radius: 5px;
        background-image: 
          -webkit-gradient(linear,
          left bottom,
          left top,
          color-stop(0.44, rgb(122,153,217)),
          color-stop(0.72, rgb(73,125,189)),
          color-stop(0.86, rgb(28,58,148)));
      }
    }
  }
</style>