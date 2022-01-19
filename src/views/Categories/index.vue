<template>
<div class="categories w-100">
    <header class="m-3">
      <button class="m-3 btn btn-dark" @click.prevent="showCreate = true" v-show="!showCreate">CRIAR CATEGORIA</button>
      <button class="btn btn-dark" @click="showCreate = false" v-show="showCreate">VOLTAR</button>
    </header>

    <div class="w-100 categories-list" v-if="!showCreate">
      <div style="margin:5px;" v-for="category in categories" :key="category.id">
        <Card 
          :showHeart="false" 
          :showDetails="false" 
          :id="category.id" 
          :title="category.name" 
          :description="category.description" 
          category="categoria" 
          :color="category.color"
        />
      </div>
      <Pagination 
        :links="paginationLinks" 
        :lastPageUrl="paginationLastPage" 
        :firstPageUrl="paginationFirstPage"
        :previousPageUrl="paginationPreviousPage"
        :nextPageUrl="paginationNextPage"
        @categoryEmit="categoryEmit($event)"
      /> 

      <div id="courses">
        <div class="d-flex" style="flex-direction:column; align-items:center" v-if="categories?.length === 0">
          <h2>Nenhuma categoria cadastrada ;(</h2>
          <img :src="empty" alt="empty" width="300">
        </div>
      </div>
    </div>

    <div class="create d-flex" v-if="showCreate">
      <h1 style="text-align:center;" class="titles m-3">CADASTRO DE CATEGORIA</h1>

      <h3 class="titles">Título</h3>
      <div class="form-floating mb-3 w-100">
        <input 
          type="text" 
          class="form-control" 
          :class="{ 'error': titleError }"
          @change="titleError = false"
          id="floatingInput" 
          v-model="title" 
          placeholder="Title"
        >
        <label for="floatingInput">Título do curso:</label>
      </div>

      <h3 class="titles">Descrição</h3>
      <div class="form-floating mb-3 w-100">
        <input 
          type="text" 
          class="form-control" 
          :class="{ 'error': descriptionError }" 
          id="description" 
          v-model="description" 
          placeholder="Description"
          @change="descriptionError = false"
        >
        <label for="description">Descrição do curso:</label>
      </div>

      <h3 class="titles">Cor</h3>
      <div class="form-floating mb-3 w-100">
        <input type="color" id="URL" class="form-control" @change="updateEditorColor(color, 'color_1', $event)"  v-model="color" placeholder="URL do vídeo">
        <label for="URL">Cor da tag de categoria:</label>
      </div>

      <div class="d-flex w-100">
        <button style="background:#F50057; color: white" @click="showCreate = false" class="btn w-50">CANCELAR</button>
        <button :disabled="loading" style="background:#00BFA6; color: white" class="btn w-50" @click.prevent="newCategory()">
            <Spinner width="30px" height="30px" v-if="loading"/> 
            <div v-else>CRIAR</div>
        </button>
      </div>
    </div>
    <img class="background" :src="moon" alt="cadastroCursos" v-if="!showCreate && categories.length > 0" height="1000">
    <img class="background" :src="course" alt="cadastroCurso" v-if="showCreate">
    
    <div class="loading" v-show="loading">
      <Spinner width="100px" height="100px"/> 
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Card from '../../components/Card.vue';
import Spinner from '../../components/Spinner.vue';
import Pagination from '../../components/Pagination.vue';
import api from '../../api.js';

export default defineComponent( {
  components: {
    Card,
    Spinner,
    Pagination
  },

  data() {
    return { 
      showCreate: false,
      empty: require('@/assets/empty.svg'),
      course: require('@/assets/createCourse.svg'),
      moon: require('@/assets/moon.svg'),
      color: '#000000',
      title: '',
      description: '',
      categories: [],
      descriptionError: false,
      titleError: false,
      loading: false,
      paginationLinks: [],
      paginationLastPage: '',
      paginationFirstPage: '',
      paginationNextPage: '',
      paginationPreviousPage: ''
    };
  },

  methods: {
    updateEditorColor(object, property, e) {
      this.color = e.target.value;
    },

    async newCategory() {

      try {
        this.loading = true;
        let categoryPayload = {
          name: this.title,
          description: this.description,
          color: this.color
        };

        if (!categoryPayload.name || !categoryPayload.description) {

          if (!categoryPayload.name) this.titleError = true;
          if (!categoryPayload.description) this.descriptionError = true;

          this.$toast.open({ message: 'Preencha todos os campos', type: 'error' })
          this.loading = false;
          return;
        }
  
        await api.post('api/categories', categoryPayload).then(() => {
          this.$toast.open({ message: 'categoria criada com sucesso!', type: 'success' })
          this.description = '';
          this.title = '';
          this.loading = false;
        });
        
      } catch (error) {
        this.$toast.open({ message: 'erro ao criar categoria', type: 'error' })
        this.loading = false;
        console.error(error);
      }
    },

    async showCategories(page = 'api/categories?page=1') {

      try {
        this.loading = true;
        await api.get(page).then(resp => {

          let response = resp.data.data;

          this.categories = response.data
          this.paginationLinks = response.links;
          this.paginationFirstPage = response.first_page_url;
          this.paginationLastPage = response.last_page_url;
          this.paginationPreviousPage = response.prev_page_url;
          this.paginationNextPage = response.next_page_url;
          this.loading = false;
        });
        
      } catch (error) {
        this.$toast.open({ message: 'erro ao carregar categorias', type: 'error' })
        this.loading = false;
        console.error(error);
      }
    },

    categoryEmit($value) {
      this.showCategories($value);
    }
  },
  mounted() {
    this.showCategories();
  }
} );
</script>

<style lang="scss" scoped>
  .teste {
    width: 200px;
    height: 200px;
    background: white;
    box-shadow: 0px 15px 30px -10px rgb(130 130 130 / 50%);
    border-radius: 8px;
    margin-top: 20px;
  }
  .categories {
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background: #151515; */
  }
    .course-page {
    padding: 0 0px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

  }
  .create {
    max-width: 800px;
    width: 100%;
    background: #051d3b;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
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
    position: absolute;
    z-index: -1;
    width: 100%;
  }
  .error {
    border-bottom-color: #ff4949;
  }
  .categories-list {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    max-height: 100%;
    overflow-y: auto;
    flex-flow: row wrap;
    position: relative;
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
</style>