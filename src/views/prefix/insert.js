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


import { PrefixModel} from "../../models"

const prefix_model = new PrefixModel()
class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      prefix:[],
      option_years:[],
      prefixID:'',
      prefix_name:'',

    }



  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    const code = await prefix_model.generatePrefixLastCode()
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
    this.setState({
      prefixID: code.data.last_code,
      loading: false,
      option_years,
      education_year:year + 543
    })
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      const res = await prefix_model.insertPrefix({
        prefixID: this.state.prefixID,
        prefix_name: this.state.prefix_name,
      })
      if (res.require) {
        Swal.fire({ title: "บันทึกข้อมูลแล้ว !", icon: "success", })
        this.props.history.push(`/prefix`)
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

    if (this.state.prefix_name === '') {
      Swal.fire("กรุณาระบุชื่อคำหน้า")
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
            <h3 className="text-header">เพิ่มคำนำหน้า</h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit}>
            <CardBody className="p-5">
              <Row>
              
              <Col md={12}>
                  <Row>
                    <Col md={2}>
                      <FormGroup>
                        <label>รหัสคำนำหน้า <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.prefixID}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <label>ชื่อคำนำหน้า <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.prefix_name}
                          onChange={(e) => this.setState({ prefix_name: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">บันทึก</Button>
              <Link to={`/prefix`}><Button type="button">กลับ</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Insert