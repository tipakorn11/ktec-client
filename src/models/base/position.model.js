import { BaseFetch } from "../main-model";

export default class PositionModel extends BaseFetch{
    getPositionBy = (data) => this.directFetch({
        url: 'position/getPositionBy',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getPositionByid = (data) => this.directFetch({
        url: 'position/getPositionByid',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    insertPosition = (data) =>this.directFetch({
        url: 'position/insertPosition',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updatePosition = (data) =>this.directFetch({
        url: 'position/updatePosition',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deletePositionByid = (data) =>this.directFetch({
        url: 'position/deletePositionByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}