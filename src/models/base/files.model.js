import { BaseFetch } from "../main-model";

export default class FilesModel extends BaseFetch{
    getFilesBy = (data) => this.directFetch({
        url: 'files/getFilesBy',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getFilesByid = (data) => this.directFetch({
        url: 'files/getFilesByid',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    insertFiles = (data) =>this.directFetch({
        url: 'files/insertFiles',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateFiles = (data) =>this.directFetch({
        url: 'files/updateFiles',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteFilesByid = (data) =>this.directFetch({
        url: 'files/deleteFilesByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}