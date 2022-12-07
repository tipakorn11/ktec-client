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
import { Loading ,SelectSearch} from "../../component/customComponent"


import { UserModel,PrefixModel} from "../../models"

const user_model = new UserModel()
const prefix_model = new PrefixModel()
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user:[],
      prefix:[],
      option_years:[]
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    let { code } = this.props.match.params
    let user = await user_model.getUserByid({ personalID: code})
    let prefix = await prefix_model.getPrefixBy()
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
    const{
      citizenID,
      thai_fname,
      thai_lname,
      eng_fname,
      bdate,
      father_fname,
      father_lname,
      mother_fname,
      mother_lname,
      nationality,
      personalID,
      
    }=user.data[0]
    //.log(option_years);
    this.setState({
        user,
        prefix,
        citizenID,
        thai_fname,
        thai_lname,
        eng_fname,
        bdate,
        father_fname,
        father_lname,
        mother_fname,
        mother_lname,
        nationality,
        personalID,
        prefixID,
        prefix_name,
        loading: false,
        option_years,
        education_year:year + 543
    })
  }

  render() {
    // let prefix_options = [{ label: this.state.prefix_name, value: '' }, ...this.state.prefix.map(item => ({
    //   label: item.prefix_name, value: item.prefixID
    // }))]
    return (
      <div>
       <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="mb-0">รายละเอียดบุคลากร / Personnel detail </h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit}>
            <CardBody>
              <Row>
                <Col lg={8}>
                  <Row>
                    <Col md={3}>
                      <label>รหัสบุคลากร <font color="#F00"><b>*</b></font></label>
                      <Input
                        type="text"
                        value={this.state.personalID}
                        onChange={(e) => this.setState({ personalID: e.target.value })}
                        required
                        readOnly
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>คำนำหน้า <font color="#F00"><b>*</b></font></label>
                        <SelectSearch
                          // options={prefix_options}
                          value={this.state.prefixID}
                          onChange={(e) => this.setState({ prefixID: e })}
                        />
                        <p className="text-muted">Example : นาย.</p>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>ชื่อ <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.employee_name}
                          onChange={(e) => this.setState({ employee_name: e.target.value })}
                          required
                        />
                        <p className="text-muted">Example : วินัย.</p>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>นามสกุล <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.employee_lastname}
                          onChange={(e) => this.setState({ employee_lastname: e.target.value })}
                          required
                        />
                        <p className="text-muted">Example : ชาญชัย.</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label>อีเมล์ </label>
                        <Input
                          type="email"
                          value={this.state.employee_email}
                          onChange={(e) => this.setState({ employee_email: e.target.value })}
                        />
                        <p className="text-muted">Example : admin@arno.co.th.</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>โทรศัพท์ </label>
                        <Input
                          type="text"
                          value={this.state.employee_tel}
                          onChange={(e) => this.setState({ employee_tel: e.target.value })}
                        />
                        <p className="text-muted">Example : 0610243003.</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>บัตรประชาชน 13 หลัก <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.employee_idcard}
                          onChange={(e) => this.setState({ employee_idcard: e.target.value })}
                          required
                        />
                        <p className="text-muted">Example : 1111111111111.</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <FormGroup>
                        <label>ที่อยู่ <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="textarea"
                          row={3}
                          value={this.state.employee_address}
                          onChange={(e) => this.setState({ employee_address: e.target.value })}
                        />
                        <p className="text-muted">Example : 271/55.</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>เลขไปรษณีย์ <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          onChange={(e) => this.setState({ employee_zipcode: e.target.value })}
                          value={this.state.employee_zipcode}
                        />
                        <p className="text-muted">Example : 30000.</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <label>ตำแหน่ง <font color="#F00"><b>*</b></font></label>
                        <SelectSearch
                          // options={employee_position_options}
                          value={this.state.employee_position_code}
                          onChange={(e) => this.setState({ employee_position_code: e })}
                        />
                        <p className="text-muted">Example : พนักงานขาย.</p>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>ประเภท <font color="#F00"><b>*</b></font></label>
                        <SelectSearch
                          // options={employee_type_options}
                          value={this.state.employee_type_code}
                          onChange={(e) => this.setState({ employee_type_code: e })}
                        />
                        <p className="text-muted">Example : รายวัน</p>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>แผนก <font color="#F00"><b>*</b></font></label>
                        <SelectSearch
                          // options={department_options}
                          value={this.state.department_code}
                          onChange={(e) => this.setState({ department_code: e })}
                        />
                        <p className="text-muted">Example : แผนกขาย</p>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>กะทำงาน <font color="#F00"><b>*</b></font></label>
                        <SelectSearch
                          // options={shift_work_options}
                          value={this.state.shift_work_code}
                          onChange={(e) => this.setState({ shift_work_code: e })}
                        />
                        <p className="text-muted">Example : กะเช้า</p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg={4}>
                  <label>โปรไฟล์ </label>
                  <FormGroup className="text-center">
                    <img
                      className="image-upload"
                      style={{ maxWidth: 280 }}
                      // src={this.state.employee_profile_image.src}
                      alt="profile"
                    />
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      // onChange={(e) => this._handleImageChange("employee_profile_image", e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            </Form>
      </Card>
      </div>
    )
  }
}

export default Detail