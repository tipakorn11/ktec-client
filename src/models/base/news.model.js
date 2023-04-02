import { BaseFetch } from "../main-model";

export default class NewsModel extends BaseFetch{
    generateNewsLastCode = (data) => this.directFetch({
        url: 'news/generateNewsLastCode',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getNewsBy = (data) => this.directFetch({
        url: 'news/getNewsBy',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getNewsByid = (data) => this.directFetch({
        url: 'news/getNewsByid',
        method: 'POST',
        body: JSON.stringify(data),
    })

    insertNews = (data) =>this.directFetch({
        url: 'news/insertNews',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateNews = (data) =>this.directFetch({
        url: 'news/updateNews',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteNewsByid = (data) =>this.directFetch({
        url: 'news/deleteNewsByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}