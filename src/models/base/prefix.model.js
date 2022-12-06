import { BaseFetch } from "../main-model";

export default class PrefixModel extends BaseFetch{
    getPrefixBy = (data) => this.directFetch({
        url: 'prefix/getPrefixBy',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getPrefixByid = (data) => this.directFetch({
        url: 'prefix/getPrefixByid',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    insertPrefix = (data) =>this.directFetch({
        url: 'prefix/insertPrefix',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updatePrefix = (data) =>this.directFetch({
        url: 'prefix/updatePrefix',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deletePrefixByid = (data) =>this.directFetch({
        url: 'prefix/deletePrefixByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}