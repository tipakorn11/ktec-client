import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,

} from 'reactstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Loading,  DataTable } from "../../component/customComponent"
import { PositionModel } from '../../models'

const position_model = new PositionModel()
class ViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            positions: [],
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
        let positions = await position_model.getPositionBy()
        this.setState({
          positions,
          total: positions.total,
          loading: false,
           
            })
  
        })
    
        _onDelete = (code) => Swal.fire({
            title: "คุณแน่ใจหรือไม่ ?",
            text: "ยืนยันลบรายการนี้",
            icon: "warning",
            showCancelButton: true,
          }).then(({ value }) => value && this.setState({ loading: true, }, async () => {
           
            const res = await position_model.deletePositionByid({ positionID: code })
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
        const { permission_add, permission_edit, permission_delete } = this.props.PERMISSION
        return (
             <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">จัดการสิทธิเข้าใช้งาน</h3>
              {permission_add === '1' ?
                <Link to={`/manage-permission/insert`} className="btn btn-success float-right">
                  <i className="fa fa-plus" aria-hidden="true" /> เพิ่มสิทธิเข้าใช้งาน
                </Link> 
              : null}
          </CardHeader>
          <CardBody>
            <DataTable
              onChange={this._fetchData}
              showRowNo={true}
              pageSize={this.state.pagination.pageSize}
              dataSource={this.state.positions.data}
              dataTotal={this.state.positions.total}
              current={this.state.pagination.current}
              rowKey=''
              columns={[
                {
                  title: "รหัสสิทธิการใช้งาน",
                  dataIndex: "positionID",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "ชื่อสิทธิการใช้งาน",
                  dataIndex: "position_name",
                  filterAble: true,
                  ellipsis: true,
                },
                
                {
                  title: '',
                  dataIndex: '',
                  render: (cell) => {
                    const row_accessible = []
                  
                    if (permission_edit === '1') {
                      row_accessible.push(
                        <Link key={"update"} to={`/manage-permission/update/${cell.positionID}`} title="แก้ไขรายการ">
                          <button type="button" className="icon-button color-warning">
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                          </button>
                        </Link>
                      )
                    }
                    if (permission_delete === '1') {
                      row_accessible.push(
                        <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.positionID)} title="ลบรายการ">
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