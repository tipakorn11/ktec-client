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
class Update extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      course:[],
      option_years:[],
      courseID:'',
      course_name:'',

    }



  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    const { code } = this.props.match.params

    let course = await course_model.getCourseByid({ courseID: code })
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
    const{
      courseID,
      course_name

    }=course.data[0]
    //.log(option_years);
    this.setState({
      course,
      courseID,
      course_name,
      loading: false,
      option_years,
      education_year:year + 543
    },() => console.log('hee',course))
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      //console.log(this.state);
      const res = await course_model.updateCourse({
        courseID: this.state.courseID,
        course_name: this.state.course_name,
      })
      console.log(res);
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
            <h3 className="text-header">แก้ไขหมวดวิชา</h3>
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
                          onChange={(e) => this.setState({ courseID: e.target.value })}
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
              <Button type="submit" color="success">Save</Button>
              <Link to={`/course`}><Button type="button">Back</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Update