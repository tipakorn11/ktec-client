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
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap"
import { Link } from "react-router-dom"
import { Loading ,SelectSearch,DatePicker} from "../../component/customComponent"
import { UserModel,PrefixModel} from "../../models"
import Swal from "sweetalert2"



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
      teacher_license:[],
      tpl:[],
      ht_license:[],
      app:[],
      portfolio:[],
      insignia:[],
      punishment:[],
      active_tab: "first",
      

    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    let { code } = this.props.match.params
    let user = await user_model.getUserByid({ personalID: code})
    let prefix = await prefix_model.getPrefixBy()
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
    this.setState({
        user,
        prefix: prefix.data,
        position: user.position,
        teacher_license: user.tl,
        tpl: user.tpl,
        ht_license: user.ht_license,
        app: user.appointment,
        portfolio: user.portfolio,
        punishment: user.punishment,
        insignia: user.insignia,
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
    })
  }

  _changeSelected(val, name) {
    var state = this.state;
    state[name] = val.value;
    this.setState({
      ...state
    })
  }

  _handleEducation = (name, e, idx) => {
    let { education } = this.state
    if(name == "graduate_date")
      education[idx][name] = e
    else
      education[idx][name] = e.target.value
    this.setState({ education })
  }

  _handleEducationSub = (name, e, idx) => {
    let { education_sub } = this.state
    if(name == "graduate_date")
      education_sub[idx][name] = e
    else
      education_sub[idx][name] = e.target.value
    this.setState({ education_sub })
  }

  _handleEtc = (name, e, idx) => {
    let { etc } = this.state
    if(name === "graduate_date")
     etc[idx][name] = e
    else
      etc[idx][name] = e.target.value
    this.setState({ etc })
  }

  _handleTraining = (name, e, idx) => {
    let { training } = this.state
    if(name === "training_date")
      training[idx][name] = e
    else if (name === "training_end_date")
      training[idx][name] = e
    else
      training[idx][name] = e.target.value
    this.setState({ training })
  }

  _handleTeacherLicense = (name, e, idx) => {
    let { teacher_license } = this.state
    if(name === "tl_date")
      teacher_license[idx][name] = e
    else if (name === "tl_since")
      teacher_license[idx][name] = e
    else
      teacher_license[idx][name] = e.target.value
    this.setState({ teacher_license })
  }

  _handleTeacherPermissionLicense = (name, e, idx) => {
    let { tpl } = this.state
    if(name === "tpl_date")
      tpl[idx][name] = e
    else if (name === "tpl_since")
      tpl[idx][name] = e
    else if (name === "tpl_discharge_since")
      tpl[idx][name] = e
    else if (name === "tpl_discharge_date")
      tpl[idx][name] = e
    else
     tpl[idx][name] = e.target.value
    this.setState({ tpl })
  }

  _handleHeadTeacher = (name, e, idx) => {
    let { ht_license } = this.state
    if(name === "HT_date")
     ht_license[idx][name] = e
    else if (name === "HT_date_since")
     ht_license[idx][name] = e
    else if (name === "HT_discharge_since")
      ht_license[idx][name] = e
    else if (name === "HT_discharge_date")
     ht_license[idx][name] = e
    else
      ht_license[idx][name] = e.target.value
    this.setState({ ht_license })
  }

  _handleAppiontment = (name, e, idx) => {
    let { app } = this.state
    if(name === "app_date")
      app[idx][name] = e
    else if (name === "app_since")
      app[idx][name] = e
    else if (name === "app_discharge_since")
      app[idx][name] = e
    else if (name === "app_discharge_date")
      app[idx][name] = e
    else
      app[idx][name] = e.target.value
    this.setState({ app })
  }

  _handlePortfolio = (name, e, idx) => {
    let { portfolio } = this.state
    portfolio[idx][name] = e.target.value
    this.setState({ portfolio })
  }

  _handleInsignia = (name, e, idx) => {
    let { insignia } = this.state
    insignia[idx][name] = e.target.value
    this.setState({ insignia })
  }

  _handlePunishment = (name, e, idx) => {
    let { punishment } = this.state
    punishment[idx][name] = e.target.value
    this.setState({ punishment })
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      // const res = await news_model.insertNews({
      //   newsID: this.state.newsID,
      //   news_title: this.state.news_title,
      //   news_description: this.state.news_description,
      //   news_file_date: this.state.news_file,
      // })
      // if (res.require) {
      //   Swal.fire({ title: "บันทึกข้อมูลแล้ว !", icon: "success", })
      //   this.props.history.push(`/news`)
      // } else {
      //   this.setState({
      //     loading: false,
      //   }, () => {
      //     Swal.fire({ title: "เกิดข้อผิดพลาด !", text: "ไม่สามารถดำเนินการได้ !", icon: "error", })
      //   })
      // }
    })
  }
  render() {
      const prefix_option = this.state.prefix.map(item => ({ value: item.prefixID, label: item.prefix_name }))
      const pos= this.state.position.filter(item => item.positionID !== 'pos1' && item.positionID !== 'pos2')
      let position = pos.map(item => item.position_name)
    return (
      <div>
       <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="mb-0">แก้ไขรายละเอียด / Personnel Update </h3>
          </CardHeader>
            
          <Form onSubmit={this._handleSubmit}>
            <CardBody>
            <Nav tabs>
              <NavLink active={this.state.active_tab === 'first'} onClick={() => this.setState({ active_tab: 'first' })}>
                        ข้อมูลส่วนตัว
              </NavLink>
                      <NavLink active={this.state.active_tab === 'second'} onClick={() => this.setState({ active_tab: 'second' })}>
                        รายละเอียดใบอนุญาต 
              </NavLink>
            </Nav>
            <TabContent activeTab={this.state.active_tab}>
              <TabPane tabId="first">
                <Row>
                  <Col lg={8}>
                    <Row>
                      <Col md={3}>
                        <label>รหัสบุคลากร </label>
                        <Input
                          type="text"
                          value={this.state.personalID}
                          readOnly
                        />
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>คำนำหน้า </label>
                          <SelectSearch
                              options={prefix_option}
                              value={this.state.prefixID}
                              onChange={(val) => this._changeSelected(val, 'prefixID')}
                              placeholder= {this.state.prefix_name}
                            />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>ชื่อ </label>
                          <Input
                            type="text"
                            value={this.state.thai_fname}
                            onChange={(e) => this.setState({thai_fname: e.target.value})}

                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>นามสกุล </label>
                          <Input
                            type="text"
                            value={this.state.thai_lname}
                            onChange={(e) => this.setState({thai_lname: e.target.value})}

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
                            onChange={(e) => this.setState({nationality: e.target.value})}

                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <label>ปีเกิด </label>
                          <DatePicker
                            format={"DD/MM/YYYY"}
                            value={this.state.bdate}
                            onChange={(e) => this.setState({ bdate: e })}
                            placeholder = {this.state.bdate}
                            style={{borderRadius: '0.25rem'}}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <label>บัตรประชาชน 13 หลัก </label>
                          <Input
                            type="text"
                            value={this.state.citizenID}
                            onChange={(e) => this.setState({ citizenID: e.target.value })}

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <label>ชื่อบิดา </label>
                          <Input
                            value={"นาย "+this.state.father_fname}
                            onChange={(e) => this.setState({ father_fname: e.target.value })}

                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>นามสกุล </label>
                          <Input
                            value={this.state.father_lname}
                            onChange={(e) => this.setState({ father_lname: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>ชื่อมารดา </label>
                          <Input
                            type="text"
                            value={"นาง "+this.state.mother_fname}
                            onChange={(e) => this.setState({ mother_fname: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>นามสกุล </label>
                          <Input
                            type="text"
                            value={this.state.mother_lname}
                            onChange={(e) => this.setState({ mother_lname: e.target.value })}
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
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <label>เลขไปรษณีย์ </label>
                          <Input
                            type="text"
                            value={this.state.postal_code}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        {position == 'ผู้อำนวยการ'?<FormGroup>
                          <label>ตำแหน่ง </label>
                          <Input
                            value={position}
                          />
                        </FormGroup>:''}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                          <label>การศึกษา </label>
                          <hr></hr>
                      </Col>
                    </Row>
                    {this.state.education.length ? this.state.education.map ((item,idx) => (
                      <div>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <label>วุฒิสาขา </label>
                              <Input
                                value={item.educational_name}
                                onChange={(e) => this._handleEducation('educational_name', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>วิชาเอก </label>
                              <Input
                                type="text"
                                value={item.educational_major}
                                onChange={(e) => this._handleEducation('educational_major', e, idx)}


                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>สถาบัน </label>
                              <Input
                                type="text"
                                value={item.institution_name}
                                onChange={(e) => this._handleEducation('institution_name', e, idx)}

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
                                onChange={(e) => this._handleEducation('graduate_country', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>เมื่อ ว/ด/ป </label>
                              <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.graduate_date}
                                onChange={(e) => this._handleEducation('graduate_date', e, idx)}
                                placeholder = {item.graduate_date}
                                style={{borderRadius: '0.25rem'}}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    )): null}
                    {this.state.education_sub.length ? this.state.education_sub.map ((item,idx) => (
                      <div>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <label>วุฒิสาขา </label>
                              <Input
                                value={item.educational_name}
                                onChange={(e) => this._handleEducationSub('educational_name', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>วิชาเอก </label>
                              <Input
                                type="text"
                                value={item.educational_major}
                                onChange={(e) => this._handleEducationSub('educational_major', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>สถาบัน </label>
                              <Input
                                type="text"
                                value={item.institution_name}
                                onChange={(e) => this._handleEducationSub('institution_name', e, idx)}
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
                                onChange={(e) => this._handleEducationSub('graduate_country', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>เมื่อ ว/ด/ป </label>
                              <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.graduate_date}
                                onChange={(e) => this._handleEducationSub('graduate_date', e, idx)}
                                style={{borderRadius: '0.25rem'}}
                                placeholder = {item.graduate_date}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    )): null }
                    {this.state.etc.length ? this.state.etc.map ((item,idx) => (
                      <div>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <label>วุฒิสาขา </label>
                              <Input
                                value={item.educational_name}
                                onChange={(e) => this._handleEtc('educational_name', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>วิชาเอก </label>
                              <Input
                                type="text"
                                value={item.educational_major}
                                onChange={(e) => this._handleEtc('educational_major', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>สถาบัน </label>
                              <Input
                                type="text"
                                value={item.institution_name}
                                onChange={(e) => this._handleEtc('institution_name', e, idx)}
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
                                onChange={(e) => this._handleEtc('graduate_country', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>เมื่อ ว/ด/ป </label>
                              <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.graduate_date}
                                onChange={(e) => this._handleEtc('graduate_date', e, idx)}
                                style={{borderRadius: '0.25rem'}}
                                placeholder = {item.graduate_date}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    )): null}
                      <Row>
                        <Col md={12}>
                          <label>การอบรบ </label>
                          <hr></hr>
                        </Col>
                      </Row>
                      {this.state.training.length ? this.state.training.map ((item,idx) => (
                        <div>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>หัวข้อการอบรม </label>
                                <Input
                                  value={item.training_topic}
                                  onChange={(e) => this._handleTraining('training_topic', e, idx)}
                                  />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>หน่วยงานที่จัด </label>
                                <Input
                                  type="text"
                                  value={item.training_agency}
                                  onChange={(e) => this._handleTraining('training_topic', e, idx)}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <label>จังหวัด-ประเทศ </label>
                                <Input
                                  value={item.country_agency}
                                  onChange={(e) => this._handleTraining('country_agency', e, idx)}
                                />
                              </FormGroup>  
                              
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                  <label>เมื่อ ว/ด/ป </label>
                                  <DatePicker
                                  format={"DD/MM/YYYY"}
                                  value={item.training_date}
                                  onChange={(e) => this._handleTraining('training_date', e, idx)}
                                  style={{borderRadius: '0.25rem'}}
                                  placeholder = {this.state.training_date}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                  <label>วันที่สิ้นสุด </label>
                                  <DatePicker
                                    format={"DD/MM/YYYY"}
                                    value={item.training_end_date}
                                    onChange={(e) => this._handleTraining('training_end_date', e, idx)}
                                    placeholder = {item.training_end_date}
                                    style={{borderRadius: '0.25rem'}}
                                />
                              </FormGroup>  
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>จำนวนวัน</label>
                                <Input
                                  type="text"
                                  value={item.date_diff}
                                  readOnly

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
              </TabPane>
              <TabPane tabId="second">
              {this.state.teacher_license.length && position == "ผู้อำนวยการ" ? this.state.teacher_license.map ((item,idx) => (
                      <div>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <label>ใบอนุญาติให้เป็นครู </label>
                              <Input
                                value={item.teacher_licenseID}
                                onChange={(e) => this._handleTeacherLicense('teacher_licenseID', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>เลขที่ใบอนุญาติให้เป็นครู </label>
                              <Input
                                type="text"
                                value={item.tl_licenseNO}
                                onChange={(e) => this._handleTeacherLicense('tl_licenseNO', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label>ลงวันที่ </label>
                              <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.tl_date}
                                onChange={(e) => this._handleTeacherLicense('tl_date', e, idx)}
                                placeholder = {item.tl_date}
                                style={{borderRadius: '0.25rem'}}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <label>ตั้งแต่วันที่ </label>
                              <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.tl_since}
                                onChange={(e) => this._handleTeacherLicense('tl_since', e, idx)}
                                placeholder = {item.tl_since}
                                style={{borderRadius: '0.25rem'}}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <label> สอนวิชา-ชั้น</label>
                              <Input
                                type="text"
                                value={item.tl_teaching_subject}
                                onChange={(e) => this._handleTeacherLicense('tl_teaching_subject', e, idx)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    )): null}
              {this.state.tpl.length ? this.state.tpl.map ((item,idx)=> (
                    <div>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>ใบอนุญาติให้บรรจุ </label>
                            <Input
                              value={item.teacher_permission_licenseID}
                                onChange={(e) => this._handleTeacherPermissionLicense('teacher_permission_licenseID', e, idx)}

                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>เลขที่ใบอณุญาติให้เป็นครู </label>
                            <Input
                              type="text"
                              value={item.teacher_pemissionNO}
                              onChange={(e) => this._handleTeacherPermissionLicense('teacher_pemissionNO', e, idx)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>ลงวันที่ </label>
                             <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.tpl_date}
                                onChange={(e) => this._handleTeacherPermissionLicense('tpl_date', e, idx)}
                                placeholder = {item.tpl_date}
                                style={{borderRadius: '0.25rem'}}
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>ตั้งแต่วันที่ </label>
                            <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.tpl_since}
                                onChange={(e) => this._handleTeacherPermissionLicense('tpl_since', e, idx)}
                                placeholder = {item.tpl_since}
                                style={{borderRadius: '0.25rem'}}
                              />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label> ปัจจุบันบรรจุเป็นครูโรงเรียน</label>
                            <Input
                              type="text"
                              value={item.tpl_currenly_work}
                              onChange={(e) => this._handleTeacherPermissionLicense('tpl_currenly_work', e, idx)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label> ประเภท</label>
                            <Input
                              type="text"
                              value={item.tpl_teacher_type}
                              onChange={(e) => this._handleTeacherPermissionLicense('tpl_teacher_type', e, idx)}
                            />
                          </FormGroup>
                        </Col> 
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label> เขต/อำเภอ</label>
                            <Input
                              type="text"
                              value={item.tpl_district}
                              onChange={(e) => this._handleTeacherPermissionLicense('tpl_district', e, idx)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label> จังหวัด</label>
                            <Input
                              type="text"
                              value={item.country}
                              onChange={(e) => this._handleTeacherPermissionLicense('country', e, idx)}
                            />
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                            <label> วุฒิที่ใช้บรรจุ</label>
                            <Input
                              type="text"
                              value={item.educational}
                              onChange={(e) => this._handleTeacherPermissionLicense('educational', e, idx)}
                            />
                          </FormGroup>
                          </Col> 
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label> สอนวิชา-ชั้น</label>
                            <Input
                              type="text"
                              value={item.tl_teaching_subject}
                              onChange={(e) => this._handleTeacherPermissionLicense('tl_teaching_subject', e, idx)}

                            />
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                            <label> ใบอนุญาติให้จำหน่ายครู</label>
                            <Input
                              type="text"
                              value={item.tpl_dischargeNO}
                              onChange={(e) => this._handleTeacherPermissionLicense('tpl_dischargeNO', e, idx)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label> ลงวันที่</label>
                            <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.tpl_discharge_date}
                                onChange={(e) => this._handleTeacherPermissionLicense('tpl_discharge_date', e, idx)}
                                placeholder = {item.tpl_discharge_date}
                                style={{borderRadius: '0.25rem'}}
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label> ตั้งแต่วันที่</label>
                             <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.tpl_discharge_since}
                                onChange={(e) => this._handleTeacherPermissionLicense('tpl_discharge_since', e, idx)}
                                placeholder = {item.tpl_discharge_since}
                                style={{borderRadius: '0.25rem'}}
                              />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label> สาเหตุ</label>
                            <Input
                              type="text"
                              value={item.tpl_discharge_motive}
                              onChange={(e) => this._handleTeacherPermissionLicense('tpl_discharge_motive', e, idx)}
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                    </div>
                  )): null}
              {this.state.ht_license.length ? this.state.ht_license.map ((item,idx) => (
                <div>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label>ใบอนุญาติให้เป็นครูใหญ่</label>
                        <Input
                          value={item.HT_licenseID}
                          onChange={(e) => this._handleHeadTeacher('HT_licenseID', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>เลขที่ </label>
                        <Input
                          type="text"
                          value={item.HT_licenseNO}
                          onChange={(e) => this._handleHeadTeacher('HT_licenseNO', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>ลงวันที่ </label>
                        <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.HT_date}
                                onChange={(e) => this._handleHeadTeacher('HT_date', e, idx)}
                                placeholder = {item.HT_date}
                                style={{borderRadius: '0.25rem'}}
                              />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label>ตั้งแต่วันที </label>
                        <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.HT_date_since}
                                onChange={(e) => this._handleHeadTeacher('HT_date_since', e, idx)}
                                placeholder = {item.HT_date_since}
                                style={{borderRadius: '0.25rem'}}
                              />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>ใบอนุญาติให้จำหน่ายครูใหญ่ เลขที่ </label>
                        <Input
                          value={item.HT_dischargeNO}
                          onChange={(e) => this._handleHeadTeacher('HT_dischargeNO', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label> ลงวันที่</label>
                         <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.HT_discharge_date}
                                onChange={(e) => this._handleHeadTeacher('HT_discharge_date', e, idx)}
                                placeholder = {item.HT_discharge_date}
                                style={{borderRadius: '0.25rem'}}
                              />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label> ตั้งแต่วันที่</label>
                         <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.HT_discharge_since}
                                onChange={(e) => this._handleHeadTeacher('HT_discharge_since', e, idx)}
                                placeholder = {item.HT_discharge_since}
                                style={{borderRadius: '0.25rem'}}
                              />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label> สาเหตุ</label>
                        <Input
                          type="text"
                          value={item.HT_discharge_motive}
                          onChange={(e) => this._handleHeadTeacher('HT_discharge_motive', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              )): null}
               {this.state.app.length ? this.state.app.map ((item,idx) => (
                <div>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label>บรรจุเป็นผู้จัดการ ใบอนุญาติ เลขที่</label>
                        <Input
                          value={item.appointmentNO}
                          onChange={(e) => this._handleAppiontment('appointmentNO', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>ลงวันที่</label>
                         <DatePicker
                                format={"DD/MM/YYYY"}
                                value={item.app_date}
                                onChange={(e) => this._handleAppiontment('app_date', e, idx)}
                                placeholder = {item.app_date}
                                style={{borderRadius: '0.25rem'}}
                              />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>ตั้งแต่วันที่</label>
                        <Input
                          value={item.app_since}
                          onChange={(e) => this._handleAppiontment('app_since', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label>โรงเรียน</label>
                        <Input
                          value={item.app_currently_work}
                          onChange={(e) => this._handleAppiontment('app_currently_work', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>ประเภท</label>
                        <Input
                          value={item.app_teacher_type}
                          onChange={(e) => this._handleAppiontment('app_teacher_type', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>เขต/อำเภอ</label>
                        <Input
                          value={item.app_district}
                          onChange={(e) => this._handleAppiontment('app_district', e, idx)}
                        />
                      </FormGroup>
                      </Col>
                  </Row>

                  <Row>
                   <Col md={4}>
                      <FormGroup>
                        <label>จังหวัด</label>
                        <Input
                          value={item.app_country}
                          onChange={(e) => this._handleAppiontment('app_country', e, idx)}
                          />
                      </FormGroup>
                    </Col>
                   <Col md={4}>
                      <FormGroup>
                        <label>วุฒิ</label>
                        <Input
                          value={item.app_educational}
                          onChange={(e) => this._handleAppiontment('app_educational', e, idx)}
                          />
                      </FormGroup>
                    </Col>
                   <Col md={4}>
                      <FormGroup>
                        <label>ใบอนุญาติให้จำหน่าย เลขที่</label>
                        <Input
                          value={item.app_dischargeNO}
                          onChange={(e) => this._handleAppiontment('app_dischargeNO', e, idx)}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                   <Col md={4}>
                     <FormGroup>
                        <label>ลงวันที่</label>
                          <DatePicker
                              format={"DD/MM/YYYY"}
                              value={item.app_discharge_date}
                              onChange={(e) => this._handleAppiontment('app_discharge_date', e, idx)}
                              placeholder = {item.app_discharge_date}
                              style={{borderRadius: '0.25rem'}}
                            />
                      </FormGroup>
                    </Col>
                   <Col md={4}>
                      <FormGroup>
                        <label>ตั้งแต่วันที่</label>
                        <DatePicker
                          format={"DD/MM/YYYY"}
                          value={item.app_discharge_since}
                          onChange={(e) => this._handleAppiontment('app_discharge_since', e, idx)}
                          placeholder = {item.app_discharge_since}
                          style={{borderRadius: '0.25rem'}}
                        />
                      </FormGroup>
                    </Col>
                   <Col md={4}>
                      <FormGroup>
                        <label>สาเหตุ</label>
                        <Input
                          value={item.app_discharge_motive}
                          onChange={(e) => this._handleAppiontment('app_discharge_motive', e, idx)}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              )): null}
              {this.state.portfolio.length ? this.state.portfolio.map ((item,idx) => (
                <div>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <label>ผลงาน</label>
                        <Input
                          value={item.portfolio_name}
                          onChange={(e) => this._handlePortfolio('portfolio_name', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              )): null}
              {this.state.insignia.length ? this.state.insignia.map ((item,idx) => (
                <div>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <label>เครื่องราชอิสริยาภรณ์</label>
                        <Input
                          value={item.insignia_name}
                          onChange={(e) => this._handleInsignia('insignia_name', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              )): null}
              {this.state.punishment.length ? this.state.pusnisment.map ((item,idx) => (
                <div>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <label>การลงโทษ</label>
                        <Input
                          value={item.pusnisment_name}
                          onChange={(e) => this._handlePunishment('pusnisment_name', e, idx)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              )): null}
              </TabPane>
            </TabContent>

            </CardBody>
            <CardFooter className="text-right">
              <Link to={`/manage-users`}><Button type="button">Back</Button></Link>
            </CardFooter>
            </Form>
      </Card>
      </div>
    )
  }
}

export default Detail