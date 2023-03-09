import { BaseFetch } from "../main-model";

export default class fileModel extends BaseFetch{
    getFileBy = (data) => this.directFetch({
        url: 'course/getFileBy',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getFileByid = (data) => this.directFetch({
        url: 'course/getFileByid',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    insertFile = (data) =>this.directFetch({
        url: 'course/insertFile',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateFile = (data) =>this.directFetch({
        url: 'course/updateFile',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteFileByid = (data) =>this.directFetch({
        url: 'course/deleteFileByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}