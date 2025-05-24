import supabase from "./supabase";
import { getUserProfileById } from "./user-profiles";

let user = {
    id: null,
    email: null,
    bio: null,
    display_name: null,
    career: null,
}

let observers = [];

getAuthUser();



async function getAuthUser() {
    const { data, error} = await supabase.auth.getUser();
    
    if(error) {
        console.error('[auth.js getAuthUser] Error al traer el usuario: ', error);
        throw error;
    }

    user = {
        ...user,
        id: data.user.id,
        email: data.user.email,
    }
    notifyAll();

    loadUserProfile();

}

/**
 * Carga el resto de la data del perfil del usuario autenticado.
 */
async function loadUserProfile() {
    const profile = await getUserProfileById(user.id);

    user = {
        ...user,
        bio: profile.bio,
        display_name: profile.display_name,
        career: profile.career,
    }
    notifyAll();
}




//-----------------

/**
 * Registra un usuario y lo autentica.
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{}>}
 */

export async function register(email, password) {
    
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if(error) {
        console.error('[auth.js register] Error al crear una cuenta: ', error);
        throw error;
    }

    user = {
        ...user,
        id: data.user.id,
        email: data.user.email,
    }
    notifyAll();

    return data.user;
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{}>}
 */

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error) {
        console.error('[auth.js login] Error al iniciar sesión: ', error);
        throw error;
    }

    user = {
        ...user,
        id: data.user.id,
        email: data.user.email,
    }
    notifyAll();

    loadUserProfile();

    return data.user;
}

/**
 * 
 */
export async function logout() {
    supabase.auth.signOut();

    user = {
        ...user,
        id: null,
        email: null,
    }
    notifyAll();
}

/*----------------------------------------------------
| Métodos del Observer para la autenticación
+-----------------------------------------------------*/
/**
 * Registra un observer para recibir los cambios en el estado de
 * autenticación.
 * En nuestra implementación, el observer debe ser una función que va
 * a recibir los datos del usuario como parámetro.
 * 
 * @param {() => {}} callback 
 */
export function subscribeToAuthState(callback) {
    // Guardamos el observer.
    observers.push(callback);

    // Lo notificamos.
    notify(callback);
}

/**
 * Notifica a un observer.
 * Esto es, ejecuta el callback y le pasa una copia de los datos del
 * usuario.
 * 
 * @param {() => {}} callback 
 */
function notify(callback) {
    callback({ ...user });
}

/**
 * Notifica a todos los observers.
 */
function notifyAll() {
    observers.forEach(callback => notify(callback));
}