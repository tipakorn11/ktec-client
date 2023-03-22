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
import { Loading, AsyncTypeahead } from "../../component/customComponent"


import { FilesModel} from "../../models"

const files_model = new FilesModel()
class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      file_pdf: null,
      fileID: "",
      file_name: "",
      personalID: "",
      file_date: "",
      option_years:[],
      user:{},
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    const code = await files_model.generateFileLastCode()
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

    console.log(code.data.last_code);
    //.log(option_years);
    this.setState({
      fileID :code.data.last_code,
      loading: false,
      option_years,
      education_year:year + 543,
      user: JSON.parse(localStorage.getItem('session-user')),

    })
  }
  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      const res = await files_model.insertFiles({
        fileID: this.state.fileID,
        personalID: this.state.user.personalID,
        file_name: this.state.file_name,
        file_status: "wait",
        file_date: this.state.file_date,
        file_pdf: this.state.file_pdf,
      })
      console.log(res);
      if (res.require) {
        Swal.fire({ title: "บันทึกข้อมูลแล้ว !", icon: "success", })
        this.props.history.push(`/file-approve`)
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

    if (this.state.file_name == '') {
      Swal.fire({title:"กรุณาระบุชื่อไฟล์", icon: "warning"})
      return false
    }
    else {
      return true
    }
  }
  
  render() {
    
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">อัปโหลดไฟล์</h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit}>
            <CardBody className="p-5">
              <Row>
                <Col md={12}>
                    <Row>
                      <Col md={2}>
                        <FormGroup>
                          <label>รหัสไฟล์<font color="#F00"><b>*</b></font></label>
                          <Input
                            type="text"
                            value={this.state.fileID}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                          <FormGroup>
                            <label>รหัสบุคลากร<font color="#F00"><b>*</b></font></label>
                            <Input
                              type="text"
                              value={this.state.user.personalID}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                      <Row>
                        <Col md={2}>
                          <FormGroup>
                            <label>ชื่อไฟล์<font color="#F00"><b>*</b></font></label>
                            <Input
                              type="text"
                              value={this.state.file_name}
                              onChange={(e) => this.setState({ file_name: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <label>ไฟล์<font color="#F00"><b>*</b></font></label>
                            <Input
                              type="file"
                              accept="application/pdf"
                              value={this.state.file_pdf}
                              onChange={(e) => this.setState({file_pdf: e.target.value})}
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">บันทึก</Button>
              <Link to={`/file-approve`}><Button type="button">กลับ</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Insert