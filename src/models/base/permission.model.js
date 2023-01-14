import { BaseFetch } from "../main-model";

export default class PermissionModel extends BaseFetch{
    getPermissionBy = (data) => this.directFetch({
        url: 'permission/getPermissionBy',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getPermissionByid = (data) => this.directFetch({
        url: 'permission/getPermissionByid',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    insertPermission = (data) =>this.directFetch({
        url: 'permission/insertPermission',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updatePermission = (data) =>this.directFetch({
        url: 'permission/updatePermission',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deletePermissionByid = (data) =>this.directFetch({
        url: 'permission/deletePermissionByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}