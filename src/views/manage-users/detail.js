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


import { UserModel} from "../../models"

const user_model = new UserModel()
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user:[],
      option_years:[]
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    // let { code } = this.props
    // console.log(code);
    // let user = await user_model.getUserBy({personalID: code})
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
        // user,
        loading: false,
        option_years,
        education_year:year + 543
    })
  }

  render() {
    
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">รายละเอียดข้อมูลส่วนตัว</h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit}>
            <CardBody className="p-5">
              <Row>
              
              <Col md={12}>
                  <Row>
                    <Col md={2}>
                      <FormGroup>
                        <label>รหัสข่าวประชาสัมพันธ์ <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.newsID}
                          onChange={(e) => this.setState({ newsID: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <label>ชื่อเรื่อง <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.news_title}
                          onChange={(e) => this.setState({ news_title: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>

                <Col md={12}>
                  <Row>
                  <Col md={3}>
                      <FormGroup>
                        <label>รายละเอียด<font color="#F00"><b>*</b></font></label>
                        <Input
                          type="textbox"
                          value={this.state.news_description}
                          onChange={(e) => this.setState({ news_description: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>ไฟล์<font color="#F00"><b>*</b></font></label>
                        <Input
                          type="file"
                          value={this.state.news_file}
                          onChange={(e) => this.setState({ news_file: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">Save</Button>
              <Link to={`/users`}><Button type="button">Back</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Detail