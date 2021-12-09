<template>
  <div class="course-page">
    <header class="m-5">
      <button class="btn btn-dark">Criar novo curso</button>
      <button v-show="this.$route.query.id" @click="this.$router.push('/courses')" class=" m--5 btn btn-dark">Voltar</button>
    </header>
    <div id="courses">

      <div class="d-flex" style="flex-direction:column; align-items:center" v-if="courses?.length === 0">
        <h2>Nenhum curso cadastrado ;(</h2>
        <img :src="empty" alt="empty" width="300">
      </div>

      <div class="m--5" v-for="course in courses" :key="course.id">
        <Card :id="course.id" :title="course.title" :description="course.description" v-show="showOption(course.id)"/>
      </div>

    </div>

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
      ]
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

<style scoped>
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
    padding-top: 20px;
    min-height: 100vh;
    padding-bottom: 20px;

  }
</style>