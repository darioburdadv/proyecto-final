import supabase from "./supabase";

export async function createUserProfile(data) {

}

export async function updateUserProfile(id, data) {

}

/**
 * Retorna el perfil de un usuario, si existe. De lo contrario, retorna null.
 * 
 * @param {string} id 
 * @returns {Promise<{}|null>}
 */
export async function getUserProfileById(id) {
    const { data, error } = await supabase
        .from('user_profiles')
        .select()
        // eq => equal
        // Agrega una cláusula WHERE comparando este valor.
        .eq("id", id);
    
    if(error) {
        console.error('[user-profiles.js getUserProfileById] Error al traer el usuario: ', error);
        throw error;
    }

    // Retornamos el perfil obtenido.
    // Noten que estamos hardcodeando la posición 0. El motivo es que 
    // el select() de Supabase siempre retorna un array (esto es 
    // con SQL, que siempre retorna un resultset).
    // Como estamos filtrando por la PK, sabemos que solo puede venir
    // un único resultado.
    return data[0];
}