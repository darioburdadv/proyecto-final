import { createRouter, createWebHistory } from 'vue-router';
import { subscribeToAuthState } from '../services/auth';
import Home from '../views/Home.vue';
import GlobalChat from '../views/GlobalChat.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Perfil from '../views/Perfil.vue';

const routes = [
    { path: '/',                component: Home, },
    { path: '/ingresar',        component: Login, },
    { path: '/registro',        component: Register, },

    { path: '/chat',            component: GlobalChat,  meta: { requiresAuth: true }, },
    { path: '/mi-perfil',       component: Perfil,   meta: { requiresAuth: true }, },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

let user = {
    id: null,
    email: null,
    bio: null,
    display_name: null,
    career: null,
}

subscribeToAuthState(newUserData => user = newUserData);

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && user.id === null) {
        
        return '/ingresar';
    }
});


export default router;