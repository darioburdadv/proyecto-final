import supabase from "./supabase";
/**
 * @param {{email:String, body:String}}
*/

export async function saveGlobalChatMessage(data) {
    const { error } = await supabase
    .from('global_chat')
    .insert({...data});

    if(error) {
        console.error('[global-chat.js saveGlobalChatMessage] Error al granar el mensaje: ', error);
        throw error;
    }
}

/**
 * @returns {{id: number, email: string, body: string, created_at: string}[]}
 */
export async function getGlobalChatLastMessages() {
    
    const { data, error } = await supabase
        .from('global_chat')
        .select();

    if(error) {
        console.error('[global-chat.js getGlobalChatLastMessages] Error al traer los mensajes: ', error);
        throw error;
    }

    return data;
}

export async function receiveGlobalChatMessages(callback) {
    const chatChannel = supabase.channel('global_chat');
    
    chatChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'global_chat',
        },
        
        data => {
            
            callback(data.new);
            console.log("Mensaje recibido: ", data);
        }
    );
    
    chatChannel.subscribe();
}