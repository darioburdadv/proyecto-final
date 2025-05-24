<script>

import { logout, subscribeToAuthState } from './services/auth';

export default {
    
    name: 'App',
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
            }
        };
    },
    methods: {
        handleLogout() {
            logout();

            this.$router.push('/ingresar');
        }
    },
    async mounted() {
        // Nos suscribimos para recibir el estado del usuario.
        subscribeToAuthState(newUserData => this.user = newUserData);
    }
}
</script>

<template>
    <nav class="flex items-center gap-8 p-4 bg-slate-300">
        <RouterLink class="text-lg" to="/">DV Social</RouterLink>
        <ul class="flex gap-4">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>

            <template v-if="user.id !== null">
                <li>
                    <RouterLink to="/chat">Chat global</RouterLink>
                </li>
                <li>
                    <RouterLink to="/mi-perfil">Mi perfil</RouterLink>
                </li>
                <li>
                    <form 
                        action="#"
                        @submit.prevent="handleLogout"
                    >
                        <button type="submit">{{ user.email }} (Cerrar sesión)</button>
                    </form>
                </li>
            </template>
            <template v-else>
                <li>
                    <RouterLink to="/ingresar">Ingresar</RouterLink>
                </li>
                <li>
                    <RouterLink to="/registro">Crear cuenta</RouterLink>
                </li>
            </template>
        </ul>
    </nav>
    <main class="container p-4 mx-auto">
        <RouterView />
    </main>
    <footer class="flex justify-center items-center h-25 bg-slate-800 text-white">
        <p>Da Vinci &copy; 2025</p>
    </footer>
</template>