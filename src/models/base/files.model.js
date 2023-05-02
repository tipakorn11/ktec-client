import { BaseFetch } from "../main-model";

export default class FilesModel extends BaseFetch{
    generateFileLastCode = (data) => this.directFetch({
        url: 'files/generateFileLastCode',
        method: 'POST',
        body: JSON.stringify(data),
    })  
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

    downloadFile = (data) =>this.directFetch({
        url: 'files/downloadFile',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateFiles = (data) =>this.directFetch({
        url: 'files/updateFiles',
        method: 'POST',
        body: JSON.stringify(data),
    })
    updateStatusFiles = (data) =>this.directFetch({
        url: 'files/updateStatusFiles',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteFilesByid = (data) =>this.directFetch({
        url: 'files/deleteFilesByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}