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
import { UserModel } from '../../models'
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
const users_model = new UserModel()
class ViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
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
        let users = await users_model.getUserBy()
        this.setState({
          users,
          total: users.total,
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
           
            const res = await users_model.deleteUsersByid({ personalID: code })
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
        const { permission_view,permission_add,permission_edit,permission_delete } = this.props.PERMISSION
        return (
             <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">จัดการข้อมูลบุคลากร</h3>
              {permission_add == 1 ?
                <Link to={`/manage-users/insert`} className="btn btn-success float-right">
                  <i className="fa fa-plus" aria-hidden="true" /> เพิ่มข้อมูลบุคลากร
                </Link>
              : null 
              }
          </CardHeader>
          <CardBody>
            <DataTable
              onChange={this._fetchData}
              showRowNo={true}
              pageSize={this.state.pagination.pageSize}
              dataSource={this.state.users.data}
              dataTotal={this.state.users.total}
              current={this.state.pagination.current}
              rowKey='newsID'
              columns={[
                {
                  title: "ชื่อ",
                  dataIndex: "",
                  render: (cell) => `${cell.thai_fname}  ${cell.thai_lname}`,
                  filterAble: true,
                  ellipsis: true,
                },
                { 
                  title: "แผนก",
                  dataIndex: "",
                  render: (cell) => {
                    if(cell.courseID === '30001')
                      return 'ช่าง'
                    else if(cell.courseID === '30002')
                      return 'บริหาร'
                  } ,
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: '',
                  dataIndex: '',
                  render: (cell) => {
                    const row_accessible = []
                    if (permission_view == 1 ) {
                        row_accessible.push(
                          <Link key={"detail"} to={`/manage-users/detail/${cell.personalID}`} title="รายละเอียด">
                            <button type="button" className="icon-button color-primary">
                              <i className="fa fa-eye" aria-hidden="true" />
                            </button>
                          </Link>
                        )
                      }
                    if (permission_edit == 1) {
                      row_accessible.push(
                        <Link key={"update"} to={`/manage-users/update/${cell.personalID}`} title="แก้ไขรายการ">
                          <button type="button" className="icon-button color-warning">
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                          </button>
                        </Link>
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