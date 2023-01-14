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
import { PrefixModel } from '../../models'
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
const prefix_model = new PrefixModel()
class ViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prefixs: [],
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
        let prefixs = await prefix_model.getPrefixBy()
        console.log(prefixs);

        this.setState({
          prefixs,
          total: prefixs.total,
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
           
            const res = await prefix_model.deletePrefixByid({ prefixID: code })
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
            <h3 className="text-header">จัดการคำนำหน้า</h3>
              {permission_add == 1 ?
                <Link to={`/prefix/insert`} className="btn btn-success float-right">
                  <i className="fa fa-plus" aria-hidden="true" /> เพิ่มคำนำหน้า
                </Link>
              : null}
          </CardHeader>
          <CardBody>
            <DataTable
              onChange={this._fetchData}
              showRowNo={true}
              pageSize={this.state.pagination.pageSize}
              dataSource={this.state.prefixs.data}
              dataTotal={this.state.prefixs.total}
              current={this.state.pagination.current}
              rowKey='newsID'
              columns={[
                {
                  title: "รหัสคำนำหน้า",
                  dataIndex: "prefixID",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "คำนำหน้า",
                  dataIndex: "prefix_name",
                  filterAble: true,
                  ellipsis: true,
                },
                
                {
                  title: '',
                  dataIndex: '',
                  render: (cell) => {
                    const row_accessible = []
                  
                    if (permission_edit == 1) {
                      row_accessible.push(
                        <Link key={"update"} to={`/prefix/update/${cell.prefixID}`} title="แก้ไขรายการ">
                          <button type="button" className="icon-button color-warning">
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                          </button>
                        </Link>
                      )
                    }
                    if (permission_delete == 1) {
                      row_accessible.push(
                        <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.prefixID)} title="ลบรายการ">
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