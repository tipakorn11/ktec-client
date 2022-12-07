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
    const { code } = this.props.match.params

    let prefix = await prefix_model.getPrefixByid({ prefixID: code })
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
      prefixID,
      prefix_name

    }=prefix.data[0]
    //.log(option_years);
    this.setState({
      prefix,
      prefixID,
      prefix_name,
      loading: false,
      option_years,
      education_year:year + 543
    },() => console.log('hee',prefix))
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      //console.log(this.state);
      const res = await prefix_model.insertPrefix({
        prefixID: this.state.prefixID,
        prefix_name: this.state.prefix_name,
      })
      console.log(res);
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

    if (this.state.prefix_title == '') {
      Swal.fire("กรุณาระบุชื่อเรื่อง")
      return false
    }
    else if (this.state.prefix_description === '') {
      Swal.fire("กรุณาระบุรายละเอียด")
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
            <h3 className="text-header">แก้ไขแผนก</h3>
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
                          onChange={(e) => this.setState({ prefixID: e.target.value })}
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
              <Button type="submit" color="success">Save</Button>
              <Link to={`/prefix`}><Button type="button">Back</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Insert