<template>
  <div class="course-page">
    <div style="padding:20px" id="courses">
      <div class="d-flex" style="width:100%; flex-direction:column; align-items:center" v-if="user.courses?.length  === 0">
        <h2>Nenhum curso adicionado como favorito ;(</h2>
        <img :src="empty" alt="empty" width="300">
      </div>
      <div 

      
        style="display:flex; flex-direction:column; justify-content:center; align-items:center"
        v-for="course in courses" :key="course.id" 
      >

            <Card 
              style="margin:5px; height:505px"
              class="scroll"
              v-if="course.users[0]?.pivot"
              textButton="Assistir"
              :id="course.id" 
              :title="course.name" 
              :description="course.detail" 
              :category="course?.categories[0]?.name" 
              :color="course?.categories[0]?.color"
              :admin="course.users[0]?.pivot.admin ? true : false"
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


    <img class="background" :src="moon" alt="cadastroCursos" v-if="user.courses?.length > 0" height="1000">
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
      coursesFavorites: [],
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
    async like(data) {

      try {
       await api.post('api/attachCourse', { courseId: data['id'] }) 
         this.coursesResource();
         this.loggedUser();
          
      } catch (error) {
        console.error(error);
      }

    },

    async coursesResource(page = 'api/courses?page=1') {

      try {

        await api.get(page).then(resp => {
          let response = resp.data.data;


          this.courses = response.data

          this.paginationLinks = response.links;
          this.paginationFirstPage = response.first_page_url;
          this.paginationLastPage = response.last_page_url;
          this.paginationPreviousPage = response.prev_page_url;
          this.paginationNextPage = response.next_page_url;
        });
      } catch (error) {
        this.$toast.open({ message: 'erro ao carregar cursos', type: 'error' });
        console.error(error);

      }
    },

    async loggedUser() {

      try {

        const user = await api.get('api/loggedUser');
        this.user = user.data.data;
        this.coursesFavorites = this.user.courses;

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