<script>
import { nextTick } from 'vue';
import MainH1 from '../components/MainH1.vue';

import { receiveGlobalChatMessages, saveGlobalChatMessage, getGlobalChatLastMessages } from '../services/global-chat';

export default {
    name: 'GlobalChat',
    components: { MainH1 },

    data() {
        return {
            messages: [],
            newMessage: {
                email: '',
                body: '',
            },
        };
    },

    methods: {
        async sendMessage() {
            try {
                await saveGlobalChatMessage({
                    email: this.newMessage.email,
                    body: this.newMessage.body,
                });
                this.newMessage.body = '';
            } catch (error) {
                // TODO :)
            }
        }
    },
    async mounted() {
        
        receiveGlobalChatMessages(newReceivedMessage => this.messages.push(newReceivedMessage));

        try {
            this.messages = await getGlobalChatLastMessages();

            await nextTick();

            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        } catch (error) {
            
        }
    }
    
}
</script>

<template>
    <MainH1>Chat global</MainH1>

    <div class="flex gap-4">
        <div 
            ref="chatContainer"
            class="overflow-y-auto w-9/12 h-100 p-4 border border-gray-400 rounded"
        >
            <h2 class="sr-only">Lista de Mensajes</h2>
            <ul class="flex flex-col gap-4">
                <li
                    v-for="message in messages"
                    class="flex flex-col gap-0.5"
                >
                    <div><b>{{ message.email }}</b> dijo:</div>
                    <div>{{ message.body }}</div>
                    <div class="text-sm text-gray-500">{{ message.created_at }}</div>
                </li>
            </ul>
        </div>

        <div class="col-3/12">
            <h2 class="mb-4 text-xl">Enviar un mensaje</h2>
    
            <form 
                action="#"
                @submit.prevent="() => sendMessage()"
            >
            <div class="mb-3">
                    <label for="email" class="block mb-2">Email</label>
                    <input
                        v-model="newMessage.email"
                        type="email"
                        id="email"
                        class="w-full p-2 border border-gray-400 rounded"
                    >
                </div>
                <div class="mb-3">
                    <label for="body" class="block mb-2">Mensaje</label>
                    <textarea
                        v-model="newMessage.body"
                        id="body"
                        class="w-full p-2 border border-gray-400 rounded"
                    ></textarea>
                </div>
                <button type="submit" class="transition-colors py-2 px-4 rounded bg-blue-600 text-white focus:bg-blue-500 hover:bg-blue-500">Enviar</button>
            </form>
        </div>
    </div>
</template>