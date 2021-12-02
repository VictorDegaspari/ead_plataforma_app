<template>
<div class="card" style="width: 18rem;">
<img src="" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ description }}</p>
    <a @click="detailRedirect()" class="btn btn-primary" >Detalhes</a>
</div>
</div>
</template>

<script>
export default {
    props:{
        title: String,
        description: String,
        id: Number
    },
    data() {

	},
    methods: {
        detailRedirect() {
        this.$router.push(`/courses?id=${this.$props.id}`)

        }
    }
}
</script>

<style>

</style>