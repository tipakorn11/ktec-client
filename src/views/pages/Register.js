import React from 'react'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row
} from 'reactstrap'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
import { SelectSearch, Loading } from '../../component/customComponent'
import {  UserModel } from '../../models'

const user_model = new UserModel()
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      prename_code: '',
      firstname: '',
      lastname: '',
      password: '',
      department_id: '',
      user_status: 'wait',
      prename: [],
      loading: true,
      username_check: {
        value: '',
        status: false
      },
      department: [],
      position: [],
      position_id: '',
    }
  }
  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    //.log(option_years);
    this.setState({
      loading: true,
    }, async () => {
      

      this.setState({
        loading: false,
       
      })
    })
  }
  _handleSubmit = (event) => {
    event.preventDefault()
    this._checkUsername()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      const res = await user_model.insertUser({
        username: this.state.username.trim(),
        password: this.state.password.trim(),
        prename_code: this.state.prename_code,
        firstname: this.state.firstname.trim(),
        lastname: this.state.lastname.trim(),
        department_id: this.state.department_id,
        status_user: this.state.user_status,
        position_id: this.state.position_id
      })

      if (res.require) {
        Swal.fire({ title: "สมัคสมาชิกเสร็จสิ้น !", icon: "success", })
        this.props.history.push(`/`)
      } else {
        this.setState({
          loading: false,
        }, () => {
          Swal.fire({ title: "เกิดข้อผิดพลาด !", text: "ไม่สามารถดำเนินการได้ !", icon: "error", })
        })
      }
    })
  }
  _checkSubmit() {

    if (this.state.username === '' || this.state.username_check.status) {
      Swal.fire("กรุณาระบุรหัสนักศึกษา อาจารย์ หรือบุคลากร")
      return false
    }
    else if (this.state.password === '') {
      Swal.fire("กรุณาระบุรหัสผ่าน")
      return false
    }
    else if (this.state.prename_code === '') {
      Swal.fire("กรุณาระบุคำนำหน้าชื่อ")
      return false
    }
    else if (this.state.firstname === '') {
      Swal.fire("กรุณาระบุชื่อ")
      return false
    }
    else if (this.state.lastname === '') {
      Swal.fire("กรุณาระบุนามสกุล")
      return false
    }
    else if (this.state.department_id === '') {
      Swal.fire("กรุณาระบุสาขาวิชา")
      return false
    }
    else if (this.state.position_id === '') {
      Swal.fire("กรุณาระบุสถานะผู้ใช้งาน")
      return false
    }
    else {
      return true
    }
  }

  _checkUsername = async () => {
    const Username = this.state.username.replace(/\//g, "-").trim()
    if (Username.length) {
      if (this.state.username_check.value !== Username) {
        const duplicate = await user_model.getUserByUsername({ username: Username })
        this.setState({
          username: Username,
          username_check: duplicate.data.length ? {
            value: Username, status: true
          } : {
            value: Username, status: false,
          }
        })
      }
    } else {
      this.setState({ username_check: { value: '', status: false } })
    }
  }
  render() {
    const prename_options = [{ label: '- ระบุคำนำหน้าชื่อ -', value: '' }, ...this.state.prename.map(item => ({
      label: item.prename_th, value: item.prename_code,
    }))]

    const department_options = [{ label: '- ระบุสาขาวิชา -', value: '' }, ...this.state.department.map(item => ({
      label: item.department_name, value: item.department_id,
    }))]

    const position_options = [{ label: '- ระบุสถานะผู้ใช้งาน -', value: '' }, ...this.state.position.map(item =>({
      label: item.position_name, value: item.position_id,
    }))]
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <Loading show={this.state.loading} />
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this._handleSubmit}>
                      <h1 className='text-center'>สมัครสมาชิก</h1>

                      <InputGroup className="mb-3 mt-4">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                        <Input
                          type="text"
                          placeholder="รหัสนักศึกษา อาจารย์ หรือบุคลากร"
                          value={this.state.username}
                          onChange={(e) => this.setState({ username: e.target.value })}
                          // autoComplete="username"
                          required
                          onBlur={this._checkUsername}
                        />
                      </InputGroup>
                      {this.state.username_check.status ?
                        <div className="alert alert-danger mt-3" role="alert">
                          รหัสนักศึกษา อาจารย์ หรือบุคลากรนี้มีอยู้แล้ว
                        </div> : ""
                      }
                      <InputGroup className="mb-4">
                        <InputGroupText>
                          <i className="fa fa-lock" />
                        </InputGroupText>
                        <Input
                          type="password"
                          placeholder="รหัสผ่าน"
                          value={this.state.password}
                          onChange={(e) => this.setState({ password: e.target.value })}
                          autoComplete="current-password"
                          required
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <SelectSearch
                          options={prename_options}
                          value={this.state.loading ? "" : { value: this.state.prename_code }}
                          onChange={(val) => this.setState({ prename_code: val.value })}
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                        <Input
                          type="text"
                          placeholder="ชื่อ"
                          value={this.state.firstname}
                          onChange={(e) => this.setState({ firstname: e.target.value })}
                          // autoComplete="username"
                          required
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                        <Input
                          type="text"
                          placeholder="นามสกุล"
                          value={this.state.lastname}
                          onChange={(e) => this.setState({ lastname: e.target.value })}
                          // autoComplete="username"
                          required
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <SelectSearch
                          options={department_options}
                          value={this.state.loading ? "" : { value: this.state.department_id }}
                          onChange={(val) => this.setState({ department_id: val.value })}
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <SelectSearch
                          options={position_options}
                          value={this.state.loading ? "" : { value: this.state.position_id }}
                          onChange={(val) => this.setState({ position_id: val.value })}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6" lg={6} className="text-left">
                          <Link to={`/`}><Button type="button">Back</Button></Link>
                        </Col>
                        <Col xs="6" lg={6} className="text-right">
                          <Button color="primary" className="px-4">Register</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Register