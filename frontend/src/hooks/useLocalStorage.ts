// HOOK PARA EL USO DEL LOCALSTORAGE EN LA APP

export const useLocalStorage = () => {

    // METODO PARA ALMACENAR EL JWT DEL USUARIO EN LOCALSTORAGE CON UN TIEMPO DE VALIDES DE 2 HORAS
    // RECIBE EL JWT COMO PARAMETRO
    const loginLocalUser = (jwt: string) => {
        const now = new Date()
        const jwtExpiry = {
            value: jwt,
            expiry: now.getTime() + 3600000
        }
        localStorage.setItem('jwt', JSON.stringify(jwtExpiry))        
    }

    // METODO PARA ELIMINAR EL JWT DEL LOCALSTORAGE
    const logoutLocalUser = () => {
        localStorage.removeItem('jwt')
    }

    // METODO PARA OBTENER EL JWT ALMACENADO DEL LOCALSTORAGE
    // SI YA NO ES VALIDO RETORNA NULL
    const getJwtLocalStorage = () => {
        const jwtSaved = localStorage.getItem('jwt')
        if(!jwtSaved){
            return null
        }
        const now = new Date()
        const jwtExpiry = JSON.parse(jwtSaved)
        if(now.getTime() > jwtExpiry.expiry){
            localStorage.removeItem('jwt')
            return null
        }
        return jwtSaved
    }

    return { loginLocalUser, logoutLocalUser, getJwtLocalStorage }
}

