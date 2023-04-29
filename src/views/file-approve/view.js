import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Nav,
    NavLink,
    TabContent,
    TabPane


} from 'reactstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import dateFormat from '../../utils/date-format'
import { Loading,  DataTable } from "../../component/customComponent"
import { FilesModel } from '../../models'

const files_model = new FilesModel()
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
            active_tab: "personal",
            files_wait: [],
            files_approve: [],
            files_cancel: [],
            files_personal: [],
            user: JSON.parse(localStorage.getItem('session-user')),

            
        }
    }

    async componentDidMount() {
        this._fetchData()
    }
    _fetchData = (params = { pagination: this.state.pagination },section = '') => this.setState({ loading: true, }, async () => {
      let files_wait = []
      let files_approve = []
      let files_cancel = [] 
      let files_personal = [] 
      if(section === 'wait'|| section === ''){
        files_wait = await files_model.getFilesBy({
          file_status: 'wait',
        })

      }
      if(section === 'approve'|| section === ''){
        files_approve = await files_model.getFilesBy({
          file_status: 'approve',
        })
      }
      if(section === 'cancel'|| section === ''){
        files_cancel = await files_model.getFilesBy({
          file_status: 'cancel',
        })
      }
      if(section === 'personal'|| section === ''){
        files_personal = await files_model.getFilesBy({
          personalID: this.state.user.personalID,
        })
      }

        this.setState({
          files_wait,
          files_approve,
          files_cancel,
          files_personal,
          loading: false,
           
            })
  
        })
    
        _onDelete = (code) => Swal.fire({
            title: "คุณแน่ใจหรือไม่ ?",
            text: "ยืนยันลบรายการนี้",
            icon: "warning",
            showCancelButton: true,
          }).then(({ value }) => value && this.setState({ loading: true, }, async () => {
           
            const res = await files_model.deleteFilesByid({ fileID: code })
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
        const { permission_approve,permission_edit,permission_cancel,permission_add } = this.props.PERMISSION
        return (
             <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">จัดการไฟล์ข้อมูล</h3>
              {permission_add === "1" ? <Link to={`/file-approve/insert`} className="btn btn-success float-right">
                <i className="fa fa-plus" aria-hidden="true" /> อัปโหลดไฟล์
              </Link> : null}
          </CardHeader>
          <CardBody>
          <Nav tabs>
              {permission_approve === '1'  || permission_cancel === '1' ?
              <NavLink active={this.state.active_tab === 'wait'} onClick={() => this.setState({ active_tab: 'wait' })}>
                        รออนุมัติ
              </NavLink> : null}
              {permission_approve === '1'  || permission_cancel=== '1' ?
              <NavLink active={this.state.active_tab === 'approve'} onClick={() => this.setState({ active_tab: 'approve' })}>
                        อนุมัติแล้ว 
              </NavLink> : null}
              {permission_approve === '1'  || permission_cancel === '1' ?
              <NavLink active={this.state.active_tab === 'cancel'} onClick={() => this.setState({ active_tab: 'cancel' })}>
                        ไม่อนุมัติ
              </NavLink> : null }
              <NavLink active={this.state.active_tab === 'personal'} onClick={() => this.setState({ active_tab: 'personal' })}>
                        ประวัติการอัปโหลดเอกสาร
              </NavLink> 
            </Nav>
            <TabContent activeTab={this.state.active_tab}>
              <TabPane tabId="wait">
                <DataTable
                  onChange={this._fetchData}
                  showRowNo={true}
                  pageSize={this.state.pagination.pageSize}
                  dataSource={this.state.files_wait.data}
                  dataTotal={this.state.files_wait.total}
                  current={this.state.pagination.current}
                  rowKey='fileID'
                  columns={[
                    {
                      title: "ชื่อบุคลากร",
                      dataIndex: "fullname",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "ตำแหน่ง",
                      dataIndex: "position_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "หัวข้อ",
                      dataIndex: "file_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "วันที่ อัปโหลดไฟล์",
                      dataIndex: "file_date_upload",
                      render: (cell) =>  dateFormat.toFormat(cell,"DD/MM/yyyy"),
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
                              <Link key={"detail"} to={`/file-approve/detail/${cell.fileID}`} title="รายละเอียด">
                                <button type="button" className="icon-button color-primary">
                                  <i className="fa fa-eye" aria-hidden="true" />
                                </button>
                              </Link>
                            )
                          }
                        if (1) {
                          row_accessible.push(
                            <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.fileID)} title="ลบรายการ">
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
              </TabPane>
              <TabPane tabId="approve">
                <DataTable
                  onChange={this._fetchData}
                  showRowNo={true}
                  pageSize={this.state.pagination.pageSize}
                  dataSource={this.state.files_approve.data}
                  dataTotal={this.state.files_approve.total}
                  current={this.state.pagination.current}
                  rowKey='fileID'
                  columns={[
                    {
                      title: "ชื่อ",
                      dataIndex: "fullname",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "ตำแหน่ง",
                      dataIndex: "position_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "หัวข้อ",
                      dataIndex: "file_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "วันที่ อัปโหลดไฟล์",
                      dataIndex: "file_date_upload",
                      render: (cell) =>  dateFormat.toFormat(cell,"DD/MM/yyyy"),
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "วันที่ อนุมัติ",
                      dataIndex: "file_date_handle",
                      render: (cell) =>  dateFormat.toFormat(cell,"DD/MM/yyyy"),
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
                              <Link key={"detail"} to={`/file-approve/detail/${cell.fileID}`} title="รายละเอียด">
                                <button type="button" className="icon-button color-primary">
                                  <i className="fa fa-eye" aria-hidden="true" />
                                </button>
                              </Link>
                            )
                          }
                        if (1) {
                          row_accessible.push(
                            <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.fileID)} title="ลบรายการ">
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
              </TabPane>
              <TabPane tabId="cancel">
                <DataTable
                  onChange={this._fetchData}
                  showRowNo={true}
                  pageSize={this.state.pagination.pageSize}
                  dataSource={this.state.files_cancel.data}
                  dataTotal={this.state.files_cancel.total}
                  current={this.state.pagination.current}
                  rowKey='fileID'
                  columns={[
                    {
                      title: "ชื่อ",
                      dataIndex: "fullname",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "ตำแหน่ง",
                      dataIndex: "position_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "หัวข้อ",
                      dataIndex: "file_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "วันที่ อัปโหลดไฟล์",
                      dataIndex: "file_date_upload",
                      render: (cell) =>  dateFormat.toFormat(cell,"DD/MM/yyyy"),
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "วันที่ ไม่อนุมัติ",
                      dataIndex: "file_date_handle",
                      render: (cell) =>  dateFormat.toFormat(cell,"DD/MM/yyyy"),
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "หมายเหตุ",
                      dataIndex: "file_note",
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
                              <Link key={"detail"} to={`/file-approve/detail/${cell.fileID}`} title="รายละเอียด">
                                <button type="button" className="icon-button color-primary">
                                  <i className="fa fa-eye" aria-hidden="true" />
                                </button>
                              </Link>
                            )
                          }
                        if (1) {
                          row_accessible.push(
                            <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.fileID)} title="ลบรายการ">
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
              </TabPane>
              <TabPane tabId="personal">
                <DataTable
                  onChange={this._fetchData}
                  showRowNo={true}
                  pageSize={this.state.pagination.pageSize}
                  dataSource={this.state.files_personal.data}
                  dataTotal={this.state.files_personal.total}
                  current={this.state.pagination.current}
                  rowKey='fileID'
                  columns={[
                    {
                      title: "ชื่อ",
                      dataIndex: "fullname",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "ตำแหน่ง",
                      dataIndex: "position_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "หัวข้อ",
                      dataIndex: "file_name",
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "สถานะของไฟล์",
                      dataIndex: "file_status",
                      render: (cell) => cell ==="cancel"? <p style ={{color: "#c63737" ,backgroundColor:"#ffcdd2", width: "3.5rem",borderRadius: '1.5rem',textAlign: 'center'}}>ไม่อนุมัติ</p>:
                                        cell ==="approve"?<p style ={{color: "#256029" ,backgroundColor:"#c8e6c9", width: "3.5rem",borderRadius: '1.5rem',textAlign: 'center'}}>อนุมัติ</p>:
                                        <p style ={{color: "#805b36" ,backgroundColor:"#ffd8b2", width: "5rem",borderRadius: '1.5rem',textAlign: 'center'}}>รอการอนุมัติ</p>,
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "วันที่ อัปโหลดไฟล์",
                      dataIndex: "file_date_upload",
                      render: (cell) =>  dateFormat.toFormat(cell,"DD/MM/yyyy"),
                      filterAble: true,
                      ellipsis: true,
                    },
                    {
                      title: "หมายเหตุ",
                      dataIndex: "file_note",
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
                              <Link key={"detail"} to={`/file-approve/detail/${cell.fileID}`} title="รายละเอียด">
                                <button type="button" className="icon-button color-primary">
                                  <i className="fa fa-eye" aria-hidden="true" />
                                </button>
                              </Link>
                            )
                          }
                          if (cell.file_status !== "approve") {
                            row_accessible.push(
                              <Link key={"update"} to={`/file-approve/update/${cell.fileID}`} title="แก้ไขรายการ">
                                <button type="button" className="icon-button color-warning">
                                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                                </button>
                              </Link>
                            )
                          }
                        if (cell.file_status !== "approve") {
                          row_accessible.push(
                            <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.fileID)} title="ลบรายการ">
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
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
        )
    }
}

export default ViewComponent