import { BaseFetch } from "../main-model";

export default class CourseModel extends BaseFetch{
    generateCourseLastCode = (data) => this.directFetch({
        url: 'course/generateCourseLastCode',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getCourseBy = (data) => this.directFetch({
        url: 'course/getCourseBy',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    getCourseByid = (data) => this.directFetch({
        url: 'course/getCourseByid',
        method: 'POST',
        body: JSON.stringify(data),
    })  
    insertCourse = (data) =>this.directFetch({
        url: 'course/insertCourse',
        method: 'POST',
        body: JSON.stringify(data),
    })

    updateCourse = (data) =>this.directFetch({
        url: 'course/updateCourse',
        method: 'POST',
        body: JSON.stringify(data),
    })

    deleteCourseByid = (data) =>this.directFetch({
        url: 'course/deleteCourseByid',
        method: 'POST',
        body: JSON.stringify(data),
    })
}