import { BaseFetch } from "../main-model";

export default class UserModel extends BaseFetch{
    getUserBy = (data) => this.directFetch({
        url: 'user/getUserBy',
        method: 'POST',
        body: JSON.stringify(data),
    })
    getUserByid = (data) => this.directFetch({
        url: 'user/getUserByid',
        method: 'POST',
        body: JSON.stringify(data),
    })

    auth = (data) => this.authFetch({
        url: 'user/auth',
        method: 'POST',
        body: JSON.stringify(data),
    })

    checkLogin = (data) =>this.directFetch({
        url: 'user/checkLogin',
        method: 'POST',
        body: JSON.stringify(data),
    })

    insertUser = (data) =>this.authFetch({
        url: 'user/insertUser',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateUser = (data) =>this.authFetch({
        url: 'user/updateUser',
        method: 'POST',
        body: JSON.stringify(data),
    })
    updateUserByid = (data) =>this.authFetch({
        url: 'user/updateUserByid',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteUserByid = (data) =>this.directFetch({
        url: 'user/deleteUserByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}