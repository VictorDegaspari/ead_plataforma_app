<template>
  <div class="favorites">

    <div class="d-flex m-5" style="flex-direction:column; align-items:center" v-if="favorites.courses.length === 0">
      <h2>Nenhum curso adicionado como favorito ;(</h2>
      <img :src="empty" alt="empty" width="300">
    </div>

  </div>
</template>

<script>
export default {
  data: () => {
    return {
      empty: require('@/assets/empty.svg'),
      // EXEMPLO
      favorites: {
        courses: [] 
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>