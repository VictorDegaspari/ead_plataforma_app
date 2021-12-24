<template>
<div class="categories w-100">
    <header class="m-3">
      <button class="m-3 btn btn-dark" @click.prevent="showCreate = true" v-show="!showCreate">CRIAR CATEGORIA</button>
      <button class="btn btn-dark" @click="showCreate = false" v-show="showCreate">VOLTAR</button>
    </header>

    <div class="w-100 categories-list" v-if="!showCreate">
      <div style="margin:5px;" v-for="category in categories" :key="category.id">
        <Card :showDetails="false" :id="category.id" :title="category.title" :description="category.description" category="categoria" :color="category.color"/>
      </div>

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
        <input type="text" class="form-control" id="floatingInput" v-model="title" placeholder="Title">
        <label for="floatingInput">Título do curso:</label>
      </div>

      <h3 class="titles">Descrição</h3>
      <div class="form-floating mb-3 w-100">
        <input type="text" class="form-control" id="description" v-model="description" placeholder="Description">
        <label for="description">Descrição do curso:</label>
      </div>

      <h3 class="titles">Cor</h3>
      <div class="form-floating mb-3 w-100">
        <input type="color" id="URL" class="form-control" @change="updateEditorColor(color, 'color_1', $event)"  v-model="color" placeholder="URL do vídeo">
        <label for="URL">Cor da tag de categoria:</label>
      </div>

      <div class="d-flex w-100">
        <button style="background:#F50057; color: white" @click="showCreate = false" class="btn w-50">CANCELAR</button>
        <button style="background:#00BFA6; color: white" class="btn w-50">CRIAR</button>
      </div>
    </div>
    <img class="background" :src="moon" alt="cadastroCursos" v-if="!showCreate && categories.length > 0" height="1000">
    <img class="background" :src="course" alt="cadastroCurso" v-if="showCreate">
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Card from '../../components/Card.vue';

export default defineComponent( {
  components: {
    Card
  },

  data() {
    return { 
      showCreate: false,
      empty: require('@/assets/empty.svg'),
      course: require('@/assets/createCourse.svg'),
      moon: require('@/assets/moon.svg'),
      color: '',
      categories: [
        { id: 1, title: "Curso1", description:"Descrição", color: "#20C997" },
        { id: 3, title: "Curso2", description:"Descrição", color: "red" },
        { id: 4 , title: "Curso3", description:"Descrição", color: "green"},
        { id: 5 , title: "Curso4", description:"Descrição", color: "#D63384"},
        { id: 6, title: "Curso5", description:"Descrição", color: "#0DCAF0" },
        { id: 7 , title: "Curso6", description:"Descrição", color: "#E8AB55"},
        { id: 8, title: "Curso7", description:"Descrição", color: "purple" },
        { id: 9 , title: "Curso8", description:"Descrição", color: "red"},
        { id: 10 , title: "Curso9", description:"Descrição", color: "#6F42C1"},
      ],
      
    };
  },

  methods: {
    updateEditorColor(object, property, e) {
      this.color = e.target.value;
    },
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
</style>