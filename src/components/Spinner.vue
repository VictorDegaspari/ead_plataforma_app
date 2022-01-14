<template>
<div class="loader" :style="`width:${width};height:${height}`"></div>
</template>

<script>
export default {
    props: {
        width: String,
        height: String,
    }
}
</script>

<style lang='scss'>
.loader,
.loader:after {
    margin: 0px 0;
    border-radius: 50%;
}
.loader {
    margin: 0px auto;
    font-size: 2px;
    position: relative;
    border-top: 5px solid rgba(255, 255, 255, 0.2);
    border-right: 5px solid rgba(255, 255, 255, 0.2);
    border-bottom: 5px solid rgba(255, 255, 255, 0.2);
    border-left: 5px solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>