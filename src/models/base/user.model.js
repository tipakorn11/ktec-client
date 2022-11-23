import { BaseFetch } from "../main-model";

export default class UserModel extends BaseFetch{
    getUserBy = (data) => this.directFetch({
        url: 'user/getUserBy',
        method: 'POST',
        body: JSON.stringify(data),
    })

    auth = (data) => this.directFetch({
        url: 'user/auth',
        method: 'POST',
        body: JSON.stringify(data),
    })

    checkLogin = (data) =>this.directFetch({
        url: 'user/checkLogin',
        method: 'POST',
        body: JSON.stringify(data),
    })

    insertUser = (data) =>this.directFetch({
        url: 'building/insertUser',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateUser = (data) =>this.directFetch({
        url: 'building/updateUser',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteUser = (data) =>this.directFetch({
        url: 'building/deleteUser',
        method: 'POST',
        body: JSON.stringify(data),
    })
}