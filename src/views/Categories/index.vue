<template>
<div class="categories">
    <Splide :options="options" class="splide">
      <SplideSlide>
        <div class="teste">TESTE</div>
      </SplideSlide>
      <SplideSlide>
        <div class="teste">TESTE</div>
      </SplideSlide>
      <SplideSlide>
        <div class="teste">TESTE</div>
      </SplideSlide>
    </Splide>

    <Splide :options="options" class="splide">
      <SplideSlide>
        <div class="teste">TESTE</div>
      </SplideSlide>
      <SplideSlide>
        <div class="teste">TESTE</div>
      </SplideSlide>
      <SplideSlide>
        <div class="teste">TESTE</div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent } from 'vue';

export default defineComponent( {
  components: {
    Splide,
    SplideSlide,
  },

  setup() {
    const options = {
      type         : 'loop',
      autoplay     : false,
      perPage      : 8,
      perMove      : 1,
      focus        : 'center',
    };

    return { options };
  },
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
    min-height: 100vh;
    width: 100%;
  }
</style>