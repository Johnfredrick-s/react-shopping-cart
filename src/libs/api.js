const domain = `https://fakestoreapi.com/`


const get = async (api) => {
    const resp = await fetch(`${domain}${api}`, { method: 'GET', headers: { "Content-Type": "application/json" } })
    const data = await resp.json()
    return data
}

const post_method = async (api, payload) => {
    const resp = await fetch(`${domain}${api}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    const data = await resp.json()
    return data
}

export const getProducts = async () => {
    return await get('products');
}

export const addToCart = async (body) => {
    return await post_method('carts', body);
}

export const signup = async (body) => {
    return await post_method('users', body);
}

export const login = async (body) => {
    return await post_method('auth/login', body);
}

export const getUser = async (id) => {
    return await get('users/' + id);
}

export const geCartItems = async () => {
    return await get('carts/user/1');
}
