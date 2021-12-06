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
            path: '/favorites',
            name: 'Favorites',
            component: () => import('@/views/Favorites/index'),
            meta: {
                title: 'Favoritos',
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
        {
            path: '/courses/:id?',
            name: 'Courses',
            component: () => import('@/views/Courses/index'),
            meta: {
                title: 'Cursos',
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/Home/index'),
            meta: {
                title: 'Página inicial',
            }
        },
        { 
            path: "/:pathMatch(.*)*",
            name: 'NotFound',
            component: () => import('@/views/NotFound/index'),
            meta: {
                title: 'Página não encontrada',
            }
        },
        { 
            path: "/categories",
            name: 'Categories',
            component: () => import('@/views/Categories/index'),
            meta: {
                title: 'Categorias',
            }
        }
    ],

})
export default router