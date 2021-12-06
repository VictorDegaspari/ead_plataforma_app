<template>
  <div><img :src="notFound" alt=""></div>
  <br>
  <h1>Ops! Página não encontrada</h1>
</template>

<script>
export default {
    data() {
        return {
            notFound: require('@/assets/notFound.svg'),
        }
    }
}
</script>