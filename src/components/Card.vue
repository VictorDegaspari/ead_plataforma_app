<template>
<div class="card" style="width: 18rem;">
<!-- <img src="" class="card-img-top" alt="..."> -->
<div class="card-body" @click="detailRedirect()">
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ description }}</p>
</div>
</div>
</template>

<script>
export default {
    props:{
        title: String,
        description: String,
        textButton: {type: String, default:"Detalhes"},
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

<style lang='scss' scoped>
.card-title {
    font-weight: bold;
}
.card {
    color: #e5f1ff;
    transition : 0.7s;
    cursor: pointer;
    border-top-color: rgb(13, 77, 156);
    border-top-style: solid;
    border-top-width: 0.03em;
    border-right-color: rgb(13, 77, 156);
    border-right-style: solid;
    border-right-width: 0.03em;
    border-bottom-color: rgb(13, 77, 156);
    border-bottom-style: solid;
    border-bottom-width: 0.03em;
    border-left-color: rgb(13, 77, 156);
    border-left-style: solid;
    border-left-width: 0.03em;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    -webkit-transition: .3s;
    transition: .3s;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    background-color: #051d3b;
    box-shadow: 0.31em 0.37em 0.87em 0.87em rgb(0 0 0 / 4%);
    &:hover{
        border-top-color: rgb(48, 141, 255);
        border-top-style: solid;
        border-top-width: 1px;
        border-right-color: rgb(48, 141, 255);
        border-right-style: solid;
        border-right-width: 1px;
        border-bottom-color: rgb(48, 141, 255);
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-left-color: rgb(48, 141, 255);
        border-left-style: solid;
        border-left-width: 1px;
        border-image-source: initial;
        border-image-slice: initial;
        border-image-width: initial;
        border-image-outset: initial;
        border-image-repeat: initial;
        margin-top: -20px;
    }
    h5 {
            display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    }
    p {
        line-height: 1.4;
        font-size: .75rem;
    }
}
.details {
    background: #2F2E41;
    color: white;
}

</style>