import * as VueRouter from 'vue-router';

const router = VueRouter.createRouter({
    history:  VueRouter.createWebHistory(),
    routes:[      
        {
            path: '/register',
            name: 'Registro',
            component: () => import('@/views/Register/index'),
            meta: {
                title: 'Ead Plataforma - Registre-se Grátis',
            }
        },
        {
            path: '/',
            name: 'Login',
            component: () => import('@/views/Login/index'),
            meta: {
                title: 'Ead Plataforma - Registre-se Grátis',
            }
        },
        
    ],

})
export default router