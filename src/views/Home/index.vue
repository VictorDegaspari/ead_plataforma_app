<template>
  <div id="home"><Carousel/></div>
</template>

<script>
import Carousel from '../../components/Carousel.vue'
export default {
    components:{
        Carousel,
    }
}
</script>

<style scoped>
#home {
    background-repeat: no-repeat;
    min-width: 100%;
    border-radius: 6px;
}
</style>