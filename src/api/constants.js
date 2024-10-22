export const API_METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
};



// export const baseUrl = `https://delivery-bac.onrender.com/api`
export const baseUrl = `https://rotibasket.shop/api`
// export const baseUrl = `http://192.168.1.6:5400/api`



export const ENDPOINTS = {
    //auth
    login: `${baseUrl}/auth/login`,
    signup: `${baseUrl}/auth/register`,
    currentUser: `${baseUrl}/users/get`,
    orders: `${baseUrl}/order/get`,
    orderDetail: (id) => `${baseUrl}/order/get/${id}`,
    orderCreate: `${baseUrl}/order/create`,
    menu: `${baseUrl}/menuItems/get`,
    userUpdate: `${baseUrl}/users/update`,
    pincodes: `${baseUrl}/general/pincodes`,


};


export const STATUS_CODE = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500
}

