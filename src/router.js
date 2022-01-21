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
            path: '/courses',
            name: 'Courses',
            component: () => import('@/views/Courses/index'),
            children: [
                // UserHome will be rendered inside User's <router-view>
                // when /user/:id is matched
                // { path: '/create', component: UserHome }
        
                // ...other sub routes
            ],
            meta: {
                title: 'Cursos',
            }
        },
        {
            path: '/course-details/:id?',
            name: 'Course Details',
            component: () => import('@/views/CourseDetails/index'),
            meta: {
                title: 'Detalhe do curso',
            }
        },
        {
            path: '/edit/:id?',
            name: 'Course edit',
            component: () => import('@/views/Courses/edit'),
            meta: {
                title: 'Editando curso',
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
        },
        { 
            path: "/profile",
            name: 'Profile',
            component: () => import('@/views/Profile/index'),
            meta: {
                title: 'Perfil',
            }
        }
    ],

})
export default router