<template>
    <div id="home">
        <Carousel/>
        <div class="find-course">
            <div class="left">
                <img :src="Categories" alt="" srcset="">

            </div>
            <div class="right">
                <h1>Categorias Recomendadas</h1>
                <div class="m--5 categories" v-for="course in courses" :key="course.id">
                    <Card :id="course.id" :title="course.title" :description="course.description"/>
                </div>
                <a @click="this.$router.push('/categories')">Ver mais</a>
            </div>
        </div>
        <svg class="w-full transform -translate-y-1 scale-105" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 162"><path d="M1600 0v113.868c-91.328-1.407-173.577 60.877-297.907 45.57-124.33-15.308-103.654-33.11-207.373-63.606-69.147-20.33-143.387-20.33-222.72 0-56.554 17.89-114.692 23.901-174.415 18.036-89.585-8.798-84.69-15.89-199.92-48.532-89.414-25.328-211.396-25.328-247.427-27.283-68.21-3.7-151.622 9.683-250.238 40.15V0h1600z"></path></svg>
        <div class="courses-count">
            <ul class="ead-benefits-list">
                <li>
                    <img :src="Head" alt="" srcset="">
                    <h2>Saúde</h2>
                    <p>São milhares de cursos e novos lançamentos que tratam de saúde e bem-estar, além de atualizações e melhorias constantes.</p>
                </li>
                <li>
                    <img :src="Health" alt="" srcset="">
                    <h2>Tudo em um só lugar</h2>
                    <p>Cursos de excelência em um único lugar e o melhor de tudo é grátis!</p>
                </li>
                <li>
                    <img :src="Support" alt="" srcset="">
                    <h2>Suporte</h2>
                    <p>Te daremos todo o suporte e funcionalidades necessárias para melhor experiência possível!</p>
                </li>
            </ul>


        </div>
        <footer>
            <small>
                powered by
            </small>
            <img :src="Clinicarx" width="250" height="200"/>
        </footer>
    </div>
</template>

<script>
import Carousel from '../../components/Carousel.vue'
import Card from '../../components/Card.vue';

export default {
    components: {
        Carousel,
        Card
    },
    data() {
        return {
            Clinicarx: require('@/assets/clinicarx.svg'),
            Head: require('@/assets/icons/head.svg'),
            Health: require('@/assets/icons/health-point.svg'),
            Categories: require('@/assets/categories.svg'),
            Support: require('@/assets/icons/support.svg'),
            // EXEMPLO
            courses: [
              { id: 1, title: "CATEGORIA", description:"Descrição" },
              { id: 3, title: "CATEGORIA2", description:"Descrição" },
              { id: 4 , title: "CATEGORIA3", description:"Descrição"},
              { id: 5 , title: "CATEGORIA4", description:"Descrição"},
              { id: 6, title: "CATEGORIA5", description:"Descrição" },
              { id: 7 , title: "CATEGORIA6", description:"Descrição"},
              { id: 8, title: "CATEGORIA7", description:"Descrição" },
              { id: 9 , title: "CATEGORIA8", description:"Descrição"},
              { id: 10 , title: "CATEGORIA9", description:"Descrição"},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap');
* {
    font-family: 'Inter', sans-serif;
}
#home {
    background-repeat: no-repeat;
    min-width: 100%;
    border-radius: 6px;
    h1,footer {
        color: white;
    }
}
.w-full {
    fill: #2F2E41;
}
.find-course {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 300px;
    background: #2F2E41;
    padding: 20px;
    width: 100%;
}
.right, .left {
    flex-flow: row wrap;
    display: flex;
    align-items: center;
    width: 50%;
}
.right {
    h1 {
        width: 100%;
        margin-bottom: 20px;
    }
    a {
        width: 100%;
        color: rgb(48, 141, 255);
        cursor: pointer;
        text-decoration: underline;
        &:hover {
            color: rgb(0, 97, 216);

        }
    }
}
footer {
    min-height: 200px;
    width: 100%;
    background: black;
    display: flex;
    align-items: center;
    flex-direction: row;
    text-align: center;
    justify-content: center;
}
.m--5 {
margin: 5px;
}
.courses-count {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5em 0 7em;
}
.ead-benefits-list {
    list-style: none;
    -webkit-box-pack: justify;
    justify-content: space-between;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    li {
        background: white;
        margin-right: 60px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: -webkit-match-parent;
        box-shadow: 0px 15px 30px -10px rgb(130 130 130 / 50%);
        padding: 2em;
        border-radius: 10px;
        p {
            max-width: 324px;
            font-size: 18px;
            line-height: 1.4;
            text-align: left;
        }
        h2 {
            font-family: 'Proxima nova', sans-serif;
            margin: 0.7em 0 0.6em;
        }
    }
    img {
        height: 65px;
        border: none;
        max-width: 100%;
    }
}
@media (max-width: 768px){

    .left {
        display: none;
    }
    .right {
        width: 100%;
        justify-content: center
    }
}

</style>