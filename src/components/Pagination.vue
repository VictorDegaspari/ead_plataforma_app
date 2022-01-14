<template>
<div class="pagination">
    <button class="btn active" @click.prevent="getPage(firstPageUrl)">Primeira página</button>
    <div v-for="link in links" :key="link.id">
        <button 
            class="btn not-active" 
            @click.prevent="getPage(link.url)"
            :class="{ 'active' : link.active }"
        >
            <span v-html="link.label"></span>
        </button>
    </div>
    <button class="btn active" @click.prevent="getPage(lastPageUrl)">Última página</button>
</div>
</template>

<script>
import api from '../api.js';

export default {
    props: {
        previousPage: Number,
        previousPageUrl: String,
        firstPageUrl: String,

        perPage: Number,
        totalPages: Number,
        currentPage: Number,

        nextPageUrl: Number,
        lastPage: Number,
        lastPageUrl: String,

        links: Array,

    },
    data() {
        return {

        }
    },
    methods: {
        async getPage(link){
            await api.post(link)
        }
    },
    mounted() {

    }

}
</script>

<style lang="scss" scoped>
    button {
        margin: 3px;
    }
    .pagination {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 35px;
        bottom: 10px;
    }
    .active {
        background: rgba(98, 0, 255, 0.76) !important;
        color: #ffff !important;

    }
    .not-active {
        background: rgba(255, 255, 255, 0.274);
        color: #151515;
    }
</style>