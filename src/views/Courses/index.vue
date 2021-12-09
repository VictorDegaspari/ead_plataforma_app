<template>
  <div class="course-page">
    <header class="m-3">
      <button class="btn btn-dark" @click.prevent="showCreate = true"  v-show="!showCreate">ADICIONAR CURSO</button>
      <h1 style="color:#151515;" class="titles" v-show="showCreate">CADASTRO DE CURSO</h1>
      <button v-show="this.$route.query.id" @click.prevent="this.$router.push('/courses')" class=" m--5 btn btn-dark">Voltar</button>
    </header>
    <div id="courses" v-if="!showCreate">
      <div class="d-flex" style="flex-direction:column; align-items:center" v-if="courses?.length === 0">
        <h2>Nenhum curso cadastrado ;(</h2>
        <img :src="empty" alt="empty" width="300">
      </div>

      <div class="m--5" v-for="course in courses" :key="course.id">
        <Card :id="course.id" :title="course.title" :description="course.description" v-show="showOption(course.id)"/>
      </div>

    </div>

    <div class="create d-flex" v-if="showCreate">
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
        <input type="text" id="time" v-mask="['##:##', '###:##']" class="form-control" v-model="time" placeholder="00:00">
        <label for="time">00:00</label>
      </div>

      <h3 class="titles">Categoria</h3>
      <select class="w-100" name="" id=""></select>

      <h3 class="titles">URL</h3>
      <div class="form-floating mb-3 w-100">
        <input type="text" id="URL" class="form-control" v-model="url" placeholder="URL do vídeo">
        <label for="URL">URL do vídeo:</label>
      </div>

      <div class="d-flex w-100">
        <button style="background:#F50057; color: white" @click="showCreate = false" class="btn w-50">CANCELAR</button>
        <button style="background:#00BFA6; color: white" class="btn w-50">CRIAR</button>
      </div>
    </div>
    <img class="background" :src="moon" alt="cadastroCursos" v-if="!showCreate" height="1000">
    <img class="background" :src="course" alt="cadastroCurso" v-if="showCreate">
  </div>
</template>

<script>
import Card from '../../components/Card.vue';
import api from '../../api.js';

export default {
  components: {
      Card
  },
  
  data: () => {
    return {
      empty: require('@/assets/empty.svg'),
      course: require('@/assets/createCourse.svg'),
      moon: require('@/assets/moon.svg'),
      time: null,
      title: null,
      description: null,
      url: null,
      category: null,
      // EXEMPLO
      courses: [
        { id: 1, title: "Curso1", description:"Descrição" },
        { id: 3, title: "Curso2", description:"Descrição" },
        { id: 4 , title: "Curso3", description:"Descrição"},
        { id: 5 , title: "Curso4", description:"Descrição"},
        { id: 6, title: "Curso5", description:"Descrição" },
        { id: 7 , title: "Curso6", description:"Descrição"},
        { id: 8, title: "Curso7", description:"Descrição" },
        { id: 9 , title: "Curso8", description:"Descrição"},
        { id: 10 , title: "Curso9", description:"Descrição"},
      ],
      categories: [{ id: 1, title: "Curso1", description:"Descrição" }],
      showCreate: false
    }
  },
  methods:{
    showOption(course) {
      let id = parseInt(this.$route.query.id);
      if (id && id !== course) {
        return false
      }
      return true
    },
    async coursesResource() {
      try {
       const courses = await api.get('api/courses');
       console.log(courses)
        
      } catch (error) {
        console.error(error)
      }
    },
  },
  created() {
    this.coursesResource()

  },

}
</script>

<style lang="scss" scoped>
  button { height: 50px }
  #courses {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    max-height: 500px;
    /* overflow: auto; */
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
    padding: 16px;
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
</style>