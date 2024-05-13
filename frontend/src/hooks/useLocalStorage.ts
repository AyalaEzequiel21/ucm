
export const useLocalStorage = () => {

    const loginLocalUser = (jwt: string) => {
        localStorage.setItem('jwt', jwt)
    }

    const logoutLocalUser = () => {
        localStorage.removeItem('jwt')
    }

    const getItemLocalStorage = (item: string) => {
        return localStorage.getItem(item)
    }

    return { loginLocalUser, logoutLocalUser, getItemLocalStorage }
}

