import React from "react"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { Loading } from "../../component/customComponent"

import { PositionModel} from "../../models"
import { PermissionModel} from "../../models"
const  position_model = new PositionModel()
const  permission_model = new PermissionModel()
class Update extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      permissions:[],
      option_years:[],
      menu:[],
      positionID: '',
      position_name: '',
    }



  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    const { code } = this.props.match.params
    const permissions = await permission_model.getPermissionByid({ positionID : code })
    const position = await position_model.getPositionByid({ positionID : code})
    const menu_permission = []
    
    const {
      positionID,
      position_name
    } = position.data[0]

    permissions.permission.forEach(item => {
      menu_permission.push({
          menuID: item.menuID,
          menu_name: item.menu_name,
          menu_group: item.menu_group,
          permission_add: item.permission_add === '1' ? true : false,
          permission_edit: item.permission_edit === '1' ? true : false,
          permission_delete: item.permission_delete === '1' ? true : false,
          permission_view: item.permission_view === '1' ? true : false,
          permission_approve: item.permission_approve === '1' ? true : false,
          permission_cancel: item.permission_cancel === '1' ? true : false

      })
  });

    const d = new Date()
    var year = d.getFullYear();
    const option_years = []
    option_years.push({
      value:year + 543,
      label:year + 543
    })
    for(let i = 1;i<=20;i++){
      const y = (year + 543) - i;
      option_years.push({
        value:y,
        label:y
      })
    }
    //.log(option_years);
    this.setState({
      positionID,
      position_name,
      permissions: menu_permission,
      loading: false,
      option_years,
      education_year:year + 543
    })
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      
      const res = await permission_model.updatePermission({
        permissions: this.state.permissions.map(item => ({
          menuID: item.menuID,
          positionID: this.state.positionID,
          permission_view: item.permission_view ? 1 : 0,
          permission_add: item.permission_add ? 1 : 0,
          permission_edit: item.permission_edit ? 1 : 0,
          permission_approve: item.permission_approve ? 1 : 0,
          permission_cancel: item.permission_cancel ? 1 : 0,
          permission_delete: item.permission_delete ? 1 : 0,
        }))
      })
      const res1 = await position_model.updatePosition({
        positionID: this.state.positionID,
        position_name: this.state.position_name
      })
      if (res.require && res1) {
        Swal.fire({ title: "บันทึกข้อมูลแล้ว !", icon: "success", })
        this.props.history.push(`/manage-permission`)
      } else {
        this.setState({
          loading: false,
        }, () => {
          Swal.fire({ title: "เกิดข้อผิดพลาด !", text: "ไม่สามารถดำเนินการได้ !", icon: "error", })
        })
      }
    })
  }

  _checkedAll = (e, permission) => {
    const { checked } = e.target

    this.setState(state => {
      state.permissions.forEach(item => {
        if (permission === "view") {
          item.permission_view = checked

          if (!checked) {
            item.permission_add = false
            item.permission_edit = false
            item.permission_approve = false
            item.permission_cancel = false
            item.permission_delete = false
          }
        } else {
          if (checked) item.permission_view = checked

          if (permission === "add") {
            item.permission_add = checked
          } else if (permission === "edit") {
            item.permission_edit = checked
          } else if (permission === "approve") {
            item.permission_approve = checked
          } else if (permission === "cancel") {
            item.permission_cancel = checked
          } else if (permission === "delete") {
            item.permission_delete = checked
          } 
        }
      })

      return { permissions: state.permissions }
    })
  }
  _checkedItem = (e, idx, permission) => {
    const { checked } = e.target

    this.setState(state => {
      if (permission === "view") {
        state.permissions[idx].permission_view = checked

        if (!checked) {
          state.permissions[idx].permission_add = false
          state.permissions[idx].permission_edit = false
          state.permissions[idx].permission_approve = false
          state.permissions[idx].permission_cancel = false
          state.permissions[idx].permission_delete = false
        }
      } else {
        if (checked) state.permissions[idx].permission_view = checked

        if (permission === "add") {
          state.permissions[idx].permission_add = checked
        } else if (permission === "edit") {
          state.permissions[idx].permission_edit = checked
        } else if (permission === "approve") {
          state.permissions[idx].permission_approve = checked
        } else if (permission === "cancel") {
          state.permissions[idx].permission_cancel = checked
        } else if (permission === "delete") {
          state.permissions[idx].permission_delete = checked
        } 
      }

      return { permissions: state.permissions }
    })
  }
  _checkSubmit() {

    if (this.state.position_name === '') {
      Swal.fire({ title: "กรุณาระบุชื่อสิทธิ์การใช้งาน / Please input Permission Name !", icon: "warning", })
      return false
    } else {
      return true
    }
  }
  
  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">แก้ไขแผนก</h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit}>
            <CardBody className="p-5">
              <Row>
              
              <Col md={12}>
                  <Row>
                    <Col md={2}>
                      <FormGroup>
                        <label>รหัส <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.positionID}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <label>ชื่อสิทธ์การใช้งาน <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.position_name}
                          onChange={(e) => this.setState({ position_name: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h1>สิทธิ์การใช้งาน</h1>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center" width={48}>#</th>
                    <th className="text-center">ชื่อการสิทธิใช้งาน</th>
                    <th className="text-center" width={90}>
                      <label className="m-0">
                        <input type="checkbox" onChange={(e) => this._checkedAll(e, 'view')} /> ดู
                      </label>
                    </th>
                    <th className="text-center" width={90}>
                      <label className="m-0">
                        <input type="checkbox" onChange={(e) => this._checkedAll(e, 'add')} /> เพิ่ม
                      </label>
                    </th>
                    <th className="text-center" width={90}>
                      <label className="m-0">
                        <input type="checkbox" onChange={(e) => this._checkedAll(e, 'edit')} /> เเก้ไข
                      </label>
                    </th>
                    <th className="text-center" width={90}>
                      <label className="m-0">
                        <input type="checkbox" onChange={(e) => this._checkedAll(e, 'approve')} /> อนุมัติ
                      </label>
                    </th>
                    <th className="text-center" width={90}>
                      <label className="m-0">
                        <input type="checkbox" onChange={(e) => this._checkedAll(e, 'cancel')} /> ยกเลิก
                      </label>
                    </th>
                    <th className="text-center" width={90}>
                      <label className="m-0">
                        <input type="checkbox" onChange={(e) => this._checkedAll(e, 'delete')} /> ลบ
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                
                {this.state.permissions.map((item, idx) => {
                    let display_menus = []
                    if (idx && item.menu_group && item.menu_group !== this.state.permissions[idx - 1].menu_group) {
                      let menu_group 

                      if (menu_group) {
                        display_menus.push(
                          <tr key={menu_group.menu_group} style={{ backgroundColor: menu_group.menu_group_color }}>
                            <td colSpan={9}>{menu_group.menu_group_name}</td>
                          </tr>
                        )
                      }
                    }
                      display_menus.push(
                        <tr key={idx}>
                          <td className="text-center">{idx + 1}</td>
                          <td>{item.menu_name}</td>
                          <td className="text-center">
                            <input type="checkbox" checked={item.permission_view} onChange={(e) => this._checkedItem(e, idx, 'view')} />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" checked={item.permission_add} onChange={(e) => this._checkedItem(e, idx, 'add')} />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" checked={item.permission_edit} onChange={(e) => this._checkedItem(e, idx, 'edit')} />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" checked={item.permission_approve} onChange={(e) => this._checkedItem(e, idx, 'approve')} />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" checked={item.permission_cancel} onChange={(e) => this._checkedItem(e, idx, 'cancel')} />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" checked={item.permission_delete} onChange={(e) => this._checkedItem(e, idx, 'delete')} />
                          </td>
                        </tr>
                      )
                      
                    
                      return display_menus
                })}
              
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">บันทึก</Button>
              <Link to={`/manage-permission`}><Button type="button">กลับ</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Update