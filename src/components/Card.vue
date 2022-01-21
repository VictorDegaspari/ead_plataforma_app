<template>
<div class="card" style="width: 18rem;" :style="style">
  <div class="card-body">
    <img :src="`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`" width="250" alt="" v-if="showImage">
    <small class="category" :style="categoryStyle">{{ category }}</small>
    <h5 class="card-title">{{ title }}</h5>
    <p style="margin:5px" class="card-text" v-if="showDescription">{{ description }}</p>

    <div class="flex">
      <div class="main-content">
        <div style="display:flex">
            <img v-if="admin" :src="edit" alt="" width="30" class="edit" @click.prevent="this.$router.push(`/edit?id=${id}`)">
            <input v-if="showHeart && !admin" type="checkbox" class="checkbox" :id="id" :checked="liked"/>
            <label v-if="showHeart && !admin" :for="id" style="width:65px">
            <svg class="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg"  v-if="showHeart && !admin" @click="$emit('like', {id: id, liked: liked })">
                <g class="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
                <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" class="heart" fill="#AAB8C2"/>
                <circle class="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

                <g class="grp7" opacity="0" transform="translate(7 6)">
                    <circle class="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
                    <circle class="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
                </g>

                <g class="grp6" opacity="0" transform="translate(0 28)">
                    <circle class="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
                    <circle class="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
                </g>

                <g class="grp3" opacity="0" transform="translate(52 28)">
                    <circle class="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
                    <circle class="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
                </g>

                <g class="grp2" opacity="0" transform="translate(44 6)">
                    <circle class="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
                    <circle class="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
                </g>

                <g class="grp5" opacity="0" transform="translate(14 50)">
                    <circle class="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
                    <circle class="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
                </g>

                <g class="grp4" opacity="0" transform="translate(35 50)">
                    <circle class="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
                    <circle class="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
                </g>

                <g class="grp1" opacity="0" transform="translate(24)">
                    <circle class="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                    <circle class="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                </g>
                </g>
            </svg>
          </label>
          <img v-if="admin" :src="garbage" alt="" width="25" class="garbage" @click="showDeleteModal = true">
        </div>
      </div>
      <button style="width:100%" class="btn btn-light" v-if="showDetails" @click="this.$router.push(`/${redirectUrl}?id=${this.$props.id}&url=${videoId}`)">{{textButton}}</button>
    </div>
  </div>
  <div class="modal" v-show="showDeleteModal">
    <div class="modal-container">
      <h3 style="margin-bottom:15px">Realmente deseja excluir este curso?</h3>
      <div>
        <button class="btn btn-danger" @click.prevent="showDeleteModal = false">Cancelar</button>
        <button class="btn btn-success" @click.prevent="deleteCourse(id)" style="margin-left:15px">Excluir</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '../api.js';

export default {

  props:{
    title: String,
    description: String,
    category: { type: String, default:"category" },
    textButton: { type: String, default:"Detalhes" },
    showHeart: { type: Boolean, default: true},
    showDetails: { type: Boolean, default: true},
    showDescription: { type: Boolean, default: true},
    showImage: { type: Boolean, default: false},
    admin: { type: Boolean, default: false},
    color: { type: String, default: 'rgb(13, 77, 156)' },
    redirectUrl: { type: String, default: 'course-details' },
    id: Number,
    liked: Boolean,
    videoId: String
  },
  emits: ['like'],
  data() {
    
    return {
      edit: require('@/assets/icons/edit_10.svg'),
      garbage: require('@/assets/icons/lixeira.svg'),
      showDeleteModal: false
    }
	},
  computed: {
    style() {
      return 'border-color: ' + this.color;
    },
    categoryStyle(){ 
      return 'background: ' + this.color;
    },
  },
  methods: {
    async deleteCourse(courseId) {
      try {
        await api.delete(`api/courses/${courseId}`);
        this.showDeleteModal = false;
        this.$emit('courseDeleted')
        this.$toast.open({ message: 'curso excluído com sucesso!', type: 'success' });

      } catch(error) {
        this.showDeleteModal = false;
        this.$toast.open({ message: 'erro ao excluir curso', type: 'error' });

      }
    }
  }
}
</script>

<style lang='scss' scoped>
.card-title {
  font-weight: bold;
  height: 100%;
  margin-bottom: 0 !important;
}
.category {
  position: absolute;
  left: 10px;
  top: 0;
  padding: 3px;
  font-weight: bold;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 265px;
}
.card {
    color: #e5f1ff;
    cursor: pointer;
    border: 2px solid;
    -webkit-transition: .3s;
    transition: .3s;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    background-color: #051d3b;
    box-shadow: 0.31em 0.37em 0.87em 0.87em rgb(0 0 0 / 4%);
    h5 {
      display: block;
      margin-block-start: 1.33em;
      margin-block-end: 1.33em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      max-height: 93px;
      overflow-y: auto;

      &::-webkit-scrollbar-track
      {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
      }

      &::-webkit-scrollbar
      {
        width: 5px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb
      {
        border-radius: 5px;
        background-image: 
          -webkit-gradient(linear,
          left bottom,
          left top,
          color-stop(0.44, rgb(122,153,217)),
          color-stop(0.72, rgb(73,125,189)),
          color-stop(0.86, rgb(28,58,148)));
      }
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

.flex {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.main-content{display:flex; width:100px; height:100px;align-items:center; justify-content:center; text-align:center;}

h1{font-size:14px; font-weight:400; margin:10px 0 0 0; color:#888888;}

a{font-size:12px; font-weight:bold; margin-top:10px; display:inline-block; text-decoration:none; color:#008A68;}

svg{
  cursor:pointer; overflow:visible; width:60px;
  .heart{transform-origin:center; animation:animateHeartOut .3s linear forwards;}
  .main-circ{transform-origin:29.5px 29.5px;}
}

.checkbox{display:none;}

    .checkbox:checked + label svg{
    .heart{transform:scale(.2); fill:#E2264D; animation:animateHeart .3s linear forwards .25s;}
    .main-circ{transition:all 2s; animation:animateCircle .3s linear forwards; opacity:1;}
    .grp1{
      opacity:1; transition:.1s all .3s;
      .oval1{
        transform:scale(0) translate(0, -30px);
        transform-origin:0 0 0;
        transition:.5s transform .3s;}
      .oval2{
        transform:scale(0) translate(10px, -50px);
        transform-origin:0 0 0;
        transition:1.5s transform .3s;}
    }
    .grp2{
      opacity:1; transition:.1s all .3s;
      .oval1{
        transform:scale(0) translate(30px, -15px); 
        transform-origin:0 0 0;
        transition:.5s transform .3s;}
      .oval2{
        transform:scale(0) translate(60px, -15px); 
        transform-origin:0 0 0;
        transition:1.5s transform .3s;}
    }
    .grp3{
      opacity:1; transition:.1s all .3s;
      .oval1{
        transform:scale(0) translate(30px, 0px);
        transform-origin:0 0 0;
        transition:.5s transform .3s;}
      .oval2{
        transform:scale(0) translate(60px, 10px);
        transform-origin:0 0 0;
        transition:1.5s transform .3s;}
    }
    .grp4{
      opacity:1; transition:.1s all .3s;
      .oval1{
        transform:scale(0) translate(30px, 15px);
        transform-origin:0 0 0;
        transition:.5s transform .3s;}
      .oval2{
        transform:scale(0) translate(40px, 50px);
        transform-origin:0 0 0;
        transition:1.5s transform .3s;}
    }
    .grp5{
      opacity:1; transition:.1s all .3s;
      .oval1{
        transform:scale(0) translate(-10px, 20px);
        transform-origin:0 0 0;
        transition:.5s transform .3s;}
      .oval2{
        transform:scale(0) translate(-60px, 30px);
        transform-origin:0 0 0;
        transition:1.5s transform .3s;}
    }
    .grp6{
      opacity:1; transition:.1s all .3s;
      .oval1{
        transform:scale(0) translate(-30px, 0px);
        transform-origin:0 0 0;
        transition:.5s transform .3s;}
      .oval2{
        transform:scale(0) translate(-60px, -5px);
        transform-origin:0 0 0;
        transition:1.5s transform .3s;}
    }
    .grp7{
      opacity:1; transition:.1s all .3s;
      .oval1{
        transform:scale(0) translate(-30px, -15px);
        transform-origin:0 0 0;
        transition:.5s transform .3s;}
      .oval2{
        transform:scale(0) translate(-55px, -30px);
        transform-origin:0 0 0;
        transition:1.5s transform .3s;}
    }
    .grp2{opacity:1; transition:.1s opacity .3s;}
    .grp3{opacity:1; transition:.1s opacity .3s;}
    .grp4{opacity:1; transition:.1s opacity .3s;}
    .grp5{opacity:1; transition:.1s opacity .3s;}
    .grp6{opacity:1; transition:.1s opacity .3s;}
    .grp7{opacity:1; transition:.1s opacity .3s;}
}

@keyframes animateCircle{
  40%{transform:scale(10); opacity:1; fill:#DD4688;}
  55%{transform:scale(11); opacity:1; fill:#D46ABF;}
  65%{transform:scale(12); opacity:1; fill:#CC8EF5;}
  75%{transform:scale(13); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:.5;}
  85%{transform:scale(17); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:.2;}
  95%{transform:scale(18); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:.1;}
  100%{transform:scale(19); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:0;}
}

@keyframes animateHeart{
  0%{transform:scale(.2);}
  40%{transform:scale(1.2);}
  100%{transform:scale(1);}
}

@keyframes animateHeartOut{
  0%{transform:scale(1.4);}
  100%{transform:scale(1);}
}
button{
  &:hover{
    transition: 0.9s;
    opacity: 0.8;
  }
}
.garbage, .edit{
  margin-right: 5px;
  margin-left: 5px;
}
.modal {
  width: 100%;
  min-height: 100vh;
  background: #3b3a3fa6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-container {
  color: #151515;
  background: white;
  position: relative;
  border-radius: 8px;
  padding: 15px;
  max-width: 600px;
}
</style>