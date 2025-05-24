<script>
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuthState } from '../services/auth';

export default {
    name: 'MyProfile',
    components: { MainH1 },
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
            },
        }
    },
    mounted() {
        subscribeToAuthState(newUserData => this.user = newUserData);
    },
}
</script>

<template>
    <MainH1>Mi perfil</MainH1>

    <div class="px-4 mb-4 italic">{{ user.bio || 'Acá va mi biografía...' }}</div>

    <dl>
        <dt class="font-bold">Email</dt>
        <dd class="mb-2">{{ user.email }}</dd>
        <dt class="font-bold">Nombre de usuario</dt>
        <dd class="mb-2">{{ user.display_name || 'Sin especificar' }}</dd>
        <dt class="font-bold">Carrera</dt>
        <dd class="mb-2">{{ user.career || 'Sin especificar' }}</dd>
    </dl>
</template>