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
import { Loading ,SelectSearch,DatePicker} from "../../component/customComponent"
import { differenceInDays } from 'date-fns'
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
      option_years:[],
      position: [],
      education: [],
      education_sub:[],
      etc:[],
      training:[],
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
      
    }=user.data[0]
    const{
      house_no,
      village_name,
      alley,
      road,
      sub_district,
      sub_area,
      country,
      postal_code,
      tel,


    }=user.useraddress[0]
    
    let education = user.education.filter(item => item.educational_typeID === 'ED1001')
    let education_sub = user.education.filter(item => item.educational_typeID === 'ED1002')
    let etc = user.education.filter(item => item.educational_typeID === 'ED1003')

    //.log(option_years);
    this.setState({
        user,
        position: user.position,
        education,
        education_sub,
        etc,
        training: user.training,
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
        house_no,
        village_name,
        alley,
        road,
        sub_district,
        sub_area,
        country,
        postal_code,
        tel,
        loading: false,
        option_years,
        education_year:year + 543
    },() => console.log(user))
  }

  render() {

      const pos= this.state.position.filter(item => item.positionID != 'pos1' && item.positionID != 'pos2')
      let position = pos.map(item => item.position_name)
      console.log(differenceInDays(new Date(2022, 1, 2) ,new Date( 2022,1, 7)))
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
                      <label>รหัสบุคลากร </label>
                      <Input
                        type="text"
                        value={this.state.personalID}
                        onChange={(e) => this.setState({ personalID: e.target.value })}
                        readOnly
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>คำนำหน้า </label>
                        <Input
                          value={this.state.prefix_name}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>ชื่อ </label>
                        <Input
                          type="text"
                          value={this.state.thai_fname}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <label>นามสกุล </label>
                        <Input
                          type="text"
                          value={this.state.thai_lname}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label>สัญชาติ </label>
                        <Input
                          value={this.state.nationality}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>ปีเกิด </label>
                        <Input
                          type="text"
                          value={this.state.bdate}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>บัตรประชาชน 13 หลัก </label>
                        <Input
                          type="text"
                          value={this.state.citizenID}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>ชื่อบิดา </label>
                        <Input
                          value={"นาย "+this.state.father_fname+" "+this.state.father_lname}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>ชื่อมารดา </label>
                        <Input
                          type="text"
                          value={"นาง "+this.state.mother_fname+" "+this.state.mother_lname}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <FormGroup>
                        <label>ที่อยู่ </label>
                        <Input
                          type="textarea"
                          row={3}
                          value={this.state.house_no +" ซอย "+this.state.alley+" ถนน "+this.state.road+" แขวง/ตำบล "+ this.state.sub_area + " \nเขต/อำเภอ "+ this.state.sub_district+ " จังหวัด "+this.state.country }
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>เลขไปรษณีย์ </label>
                        <Input
                          type="text"
                          value={this.state.postal_code}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      {position == 'รองผู้อำนวยการ' || position == 'ผู้อำนวยการ'?<FormGroup>
                        <label>ตำแหน่ง </label>
                        <Input
                          value={position}
                        />
                      </FormGroup>:''}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                        <label>การศึกษา </label>
                    </Col>
                  </Row>
                  {this.state.education.length ? this.state.education.map (item => (
                    <div>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>วุฒิสาขา </label>
                            <Input
                              value={item.educational_name}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>วิชาเอก </label>
                            <Input
                              type="text"
                              value={item.educational_major}

                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>สถาบัน </label>
                            <Input
                              type="text"
                              value={item.institution_name}

                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>จังหวัด </label>
                            <Input
                              value={item.graduate_country}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>เมื่อ ว/ด/ป </label>
                            <Input
                              type="text"
                              value={item.graduate_date}

                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  )): null}
                   {this.state.education_sub.length ? this.state.education_sub.map (item => (
                    <div>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>วุฒิสาขา </label>
                            <Input
                              value={item.educational_name}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>วิชาเอก </label>
                            <Input
                              type="text"
                              value={item.educational_major}

                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>สถาบัน </label>
                            <Input
                              type="text"
                              value={item.institution_name}

                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>จังหวัด </label>
                            <Input
                              value={item.graduate_country}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>เมื่อ ว/ด/ป </label>
                            <Input
                              type="text"
                              value={item.graduate_date}

                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  )): null }
                   {this.state.etc.length ? this.state.etc.map (item => (
                    <div>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>วุฒิสาขา </label>
                            <Input
                              value={item.educational_name}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>วิชาเอก </label>
                            <Input
                              type="text"
                              value={item.educational_major}

                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>สถาบัน </label>
                            <Input
                              type="text"
                              value={item.institution_name}

                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>จังหวัด </label>
                            <Input
                              value={item.graduate_country}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>เมื่อ ว/ด/ป </label>
                            <Input
                              type="text"
                              value={item.graduate_date}

                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  )): null}
                    <Row>
                      <Col md={4}>
                        <label>การอบรบม </label>
                      </Col>
                    </Row>
                    {this.state.training.length ? this.state.training.map (item => (
                      <div>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <label>หัวข้อการอบรม </label>
                              <Input
                                value={item.training_topic}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>หน่วยงานที่จัด </label>
                              <Input
                                type="text"
                                value={item.training_agency}

                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>เมื่อ ว/ด/ป </label>
                              <Input
                                type="text"
                                value={item.training_date}

                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <label>จังหวัด-ประเทศ </label>
                              <Input
                                value={item.country_agency}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>จำนวนวัน</label>
                              <Input
                                type="text"
                                value={item.date_diff}

                              />
                            </FormGroup>
                          </Col>
                      </Row>
                    </div>
                 )): null}
                  
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
                  
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">Save</Button>
              <Link to={`/manage-users`}><Button type="button">Back</Button></Link>
            </CardFooter>
            </Form>
      </Card>
      </div>
    )
  }
}

export default Detail