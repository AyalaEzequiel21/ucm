
export const useLocalStorage = () => {

    const loginLocalUser = (jwt: string) => {
        const now = new Date()
        const jwtExpiry = {
            value: jwt,
            expiry: now.getTime() + 3600000
        }
        localStorage.setItem('jwt', JSON.stringify(jwtExpiry))        
    }

    const logoutLocalUser = () => {
        localStorage.removeItem('jwt')
    }

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
        // return  jwtExpiry.value
        return jwtSaved
    }

    return { loginLocalUser, logoutLocalUser, getJwtLocalStorage }
}

