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
import { CourseModel} from "../../models"

const course_model = new CourseModel()
class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      courseID:'',
      course_name:'',

    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    let code = await course_model.generateCourseLastCode()
    this.setState({
      courseID: code.data.last_code,
      loading: false,
    })
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      const res = await course_model.insertCourse({
        courseID: this.state.courseID,
        course_name: this.state.course_name,
      })
      if (res.require) {
        Swal.fire({ title: "บันทึกข้อมูลแล้ว !", icon: "success", })
        this.props.history.push(`/course`)
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

    if (this.state.courseID == '') {
      Swal.fire("กรุณาระบุรหัสหมวดวิชา")
      return false
    }
    else if (this.state.course_name === '') {
      Swal.fire("กรุณาระบุชื่อหมวดวิชา")
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
            <h3 className="text-header">เพิ่มหมวดวิชา</h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit}>
            <CardBody className="p-5">
              <Row>
              
              <Col md={12}>
                  <Row>
                    <Col md={2}>
                      <FormGroup>
                        <label>รหัสหมวดวิชา <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.courseID}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <label>ชื่อหมวดวิชา <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.course_name}
                          onChange={(e) => this.setState({ course_name: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">บันทึก</Button>
              <Link to={`/course`}><Button type="button">กลับ</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Insert