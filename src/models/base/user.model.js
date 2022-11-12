import { BaseFetch } from "../main-model";

export default class UserModel extends BaseFetch{
    getBuildingBy = (data) => this.directFetch({
        url: 'user/getUserBy',
        method: 'POST',
        body: JSON.stringify(data),
    })
    getBuildingByID = (data) =>this.directFetch({
        url: 'building/getBuildingByID',
        method: 'POST',
        body: JSON.stringify(data),
    })

    insertBuilding = (data) =>this.directFetch({
        url: 'building/insertBuilding',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateBuilding = (data) =>this.directFetch({
        url: 'building/updateBuilding',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteBuilding = (data) =>this.directFetch({
        url: 'building/deleteBuilding',
        method: 'POST',
        body: JSON.stringify(data),
    })
}