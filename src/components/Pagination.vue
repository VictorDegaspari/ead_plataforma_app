<template>
<div class="pagination">
    <button class="btn active" :disabled="!previousPageUrl" @click.prevent="emitPath(firstPageUrl)">Primeira página</button>
    <div v-for="link in links" :key="link.id">
        <button 
            class="btn not-active" 
            @click.prevent="emitPath(link.url)"
            :class="{ 'active' : link.active }"
            :disabled="!link.url"
        >
            <span v-html="link.label"></span>
        </button>
    </div>
    <button class="btn active"  :disabled="!nextPageUrl" @click.prevent="emitPath(lastPageUrl)">Última página</button>
</div>
</template>

<script>

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
        emitPath(link){
            this.$emit('pageChanged', link);
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
        @media (max-width: 800px) {
            margin-top: 10px;
            width: 100%;
            position: relative !important;
        }
    }
    .active {
        background: #151515 !important;
        color: #ffff !important;

    }
    .not-active {
        background: #ffff;
        color: #151515;
    }
</style>