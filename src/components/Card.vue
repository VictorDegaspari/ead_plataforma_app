<template>
<div class="card" style="width: 18rem;" :style="style">
<!-- <img src="" class="card-img-top" alt="..."> -->
<div class="card-body">
    <small class="category" :style="categoryStyle">{{ category }}</small>
    <h5 class="card-title">{{ title }}</h5>
    <p style="margin:5px" class="card-text">{{ description }}</p>

    <div class="flex">
        <div class="main-content">
            <div>
                <input type="checkbox" class="checkbox" :id="id"/>
                <label :for="id">
                <svg class="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
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
            </div>
        </div>
        <button class="btn btn-light" v-if="showDetails" @click="this.$router.push(`/${redirectUrl}?id=${this.$props.id}`)">{{textButton}}</button>
    </div>
</div>
</div>
</template>

<script>
export default {
  props:{
    title: String,
    description: String,
    category: { type: String, default:"category" },
    textButton: { type: String, default:"Detalhes" },
    showHeart: { type: Boolean, default: true},
    showDetails: { type: Boolean, default: true},
    color: { type: String, default: 'rgb(13, 77, 156)' },
    redirectUrl: { type: String, default: 'course-details' },
    id: Number
  },
  emits: ['like'],
  data() {
    return{
      likeCourse : false
    }
	},
  computed: {
    style() {
      return 'border-color: ' + this.color;
    },
    categoryStyle(){ 
      return 'background: ' + this.color;
    }
  }
}
</script>

<style lang='scss' scoped>
.card-title {
    font-weight: bold;
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
    transition : 0.7s;
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
    &:hover{
      /* margin-top: -20px; */
      opacity: 0.9;
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
</style>