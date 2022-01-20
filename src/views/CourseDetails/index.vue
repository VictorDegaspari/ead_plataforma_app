/* eslint-disable no-unused-vars */
<template>
<div class="detail">
  <div class="container">
    <div class="loading" v-show="loading">
      <Spinner width="100px" height="100px"/> 
    </div>
    <YouTube 
      :src="`https://www.youtube.com/watch?v=${this.$route.query.url}`"
      @ready="onReady"
      ref="youtube"
      width="600"
      height="600"
    />
    <div class="background">
      <h2>Curso: {{ name }}</h2>
      <p>Detalhes: {{ detail }}</p>
    </div>
  </div>
</div>
</template>

<script>
import YouTube from 'vue3-youtube'
import { defineComponent } from 'vue'
import Spinner from '../../components/Spinner.vue';
import api from '../../api'

export default defineComponent({
    components: { YouTube, Spinner },
    data() {
      return {
        loading: false,
        detail: null,
        name: null,
        duration: null,
      }
    },
    methods: {
      onReady() {
        this.$refs.youtube.playVideo()
        this.loading = false;
      },

      async getCourseById() {

        try {
          this.loading = true;
          const course = await api.get(`api/courses/${this.$route.query.id}`);
          this.detail = course.data.data.detail;
          this.name = course.data.data.name;
          this.duration = course.data.data.time;

        } catch (error) {
          this.loading = false;
          console.error(error);
          this.$toast.open({ message: 'erro ao encontrar curso', type: 'error' })
        }
      }
    },
    mounted () {
      this.getCourseById();
    }
})
</script>

<style lang="scss" scoped>
  .detail {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
  }
  .background {
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: left;

  }
  .container {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: flex-start;
    padding: 20px;
    justify-content: center;
    background: white;
    max-width: 650px;
    height: 750px;
    flex: 0 1 80%;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    position: relative;
    z-index: 1;
    border-radius: 2px;
    transition: .3s cubic-bezier(.4,0,.2,1);
    transition-property: color,background-color;
    will-change: color,background-color;
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