import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,

} from 'reactstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Loading, SelectSearch, DataTable } from "../../component/customComponent"
import { CourseModel } from '../../models'
const color_templates = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#2ECC71',
    '#F1C40F',
    '#3498DB',
    '#8E44AD',
    '#E74C3C',
    '#1ABC9C',
    '#F0B27A',
]
const course_model = new CourseModel()
class ViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            loading: true,
            pagination: {
                current: 1,
                pageSize: 15,
              },
            total: '',

            
        }
    }

    async componentDidMount() {
        this._fetchData()
    }
    _fetchData = (params = { pagination: this.state.pagination }) => this.setState({ loading: true, }, async () => {
        let courses = await course_model.getCourseBy()
        console.log(courses);

        this.setState({
          courses,
          total: courses.total,
          loading: false,
           
            })
  
        })
    
        _onDelete = (code) => Swal.fire({
            title: "คุณแน่ใจหรือไม่ ?",
            text: "ยืนยันลบรายการนี้",
            icon: "warning",
            showCancelButton: true,
          }).then(({ value }) => value && this.setState({ loading: true, }, async () => {
            let total = this.state.total - 1;
           
            const res = await course_model.deleteCourseByid({ courseID: code })
            if (res.require) {
              Swal.fire({ title: 'ลบรายการแล้ว !', text: '', icon: 'success' })
              this._fetchData()
            } else {
              this.setState({
                loading: false,
              }, () => {
                Swal.fire({ title: "เกิดข้อผิดพลาด !", text: "ไม่สามารถดำเนินการได้ !", icon: "error", })
              })
            }
          }))
    render() {
        // const { permission_view } = this.props.PERMISSION
        return (
             <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">จัดการข้อมูลแผนก</h3>
              <Link to={`/course/insert`} className="btn btn-success float-right">
                <i className="fa fa-plus" aria-hidden="true" /> เพิ่มแผนก
              </Link>
          </CardHeader>
          <CardBody>
            <DataTable
              onChange={this._fetchData}
              showRowNo={true}
              pageSize={this.state.pagination.pageSize}
              dataSource={this.state.courses.data}
              dataTotal={this.state.courses.total}
              current={this.state.pagination.current}
              rowKey='newsID'
              columns={[
                {
                  title: "ชื่อแผนก",
                  dataIndex: "course_name",
                  filterAble: true,
                  ellipsis: true,
                },
                
                {
                  title: '',
                  dataIndex: '',
                  render: (cell) => {
                    const row_accessible = []
                  
                    if (1) {
                      row_accessible.push(
                        <Link key={"update"} to={`/course/update/${cell.courseID}`} title="แก้ไขรายการ">
                          <button type="button" className="icon-button color-warning">
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                          </button>
                        </Link>
                      )
                    }
                    if (1) {
                      row_accessible.push(
                        <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.courseID)} title="ลบรายการ">
                          <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                      )
                    }

                    return row_accessible
                  },
                  width: 80
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
        )
    }
}

export default ViewComponent