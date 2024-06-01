
const setHeaders = (headers: Headers): void => {
    const token = localStorage.getItem('jwt');
    if (token) {
        const jwt = JSON.parse(token);
        headers.append('authorization', `Bearer ${jwt.value}`);
    }
}

export {setHeaders}