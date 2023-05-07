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
import JsPDF from "jspdf"
import {
  Loading,
  SelectSearch,
  DatePicker,
} from "../../component/customComponent"
import { UserModel } from "../../models"
const user_model = new UserModel()
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user: [],
      useraddress: [],
      prefix: [],
      option_years: [],
      position: [],
      education: [],
      education_sub: [],
      etc: [],
      training: [],
      tl: [],
      tpl: [],
      ht_license: [],
      app: [],
      portfolio: [],
      insignia: [],
      punishment: [],
      active_tab: "first",
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    let { code } = this.props.match.params
    let user = await user_model.getUserByid({ personalID: code })
    console.log(user)
    const d = new Date()
    var year = d.getFullYear()
    const option_years = []
    option_years.push({
      value: year + 543,
      label: year + 543,
    })
    for (let i = 1; i <= 20; i++) {
      const y = year + 543 - i
      option_years.push({
        value: y,
        label: y,
      })
    }

    const {
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
    } = user.data[0]
    const {
      house_no,
      village_name,
      alley,
      road,
      sub_district,
      sub_area,
      country,
      postal_code,
      tel,
    } = user.useraddress[0]
    let education = user.education.filter(
      (item) => item.educational_typeID === "ED1001"
    )
    let education_sub = user.education.filter(
      (item) => item.educational_typeID === "ED1002"
    )
    let etc = user.education.filter(
      (item) => item.educational_typeID === "ED1003"
    )

    //.log(option_years);
    this.setState({
      user,
      position: user.position,
      tl: user.tl,
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
      option_years,
      education_year: year + 543,
    })
  }

  render() {
    const pos = this.state.position.filter(
      (item) => item.positionID != "pos1" && item.positionID != "pos2"
    )
    let position = pos.map((item) => item.position_name)
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="mb-0">รายละเอียดบุคลากร / Personnel detail </h3>
          </CardHeader>

          <Form onSubmit={this._handleSubmit}>
            <CardBody>
              <Nav tabs>
                <NavLink
                  active={this.state.active_tab === "first"}
                  onClick={() => this.setState({ active_tab: "first" })}
                >
                  ข้อมูลส่วนตัว
                </NavLink>
                <NavLink
                  active={this.state.active_tab === "second"}
                  onClick={() => this.setState({ active_tab: "second" })}
                >
                  ใบอนุญาติ
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
                            onChange={(e) =>
                              this.setState({ personalID: e.target.value })
                            }
                            readOnly
                          />
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <label>คำนำหน้า </label>
                            <Input value={this.state.prefix_name} />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <label>ชื่อ </label>
                            <Input type="text" value={this.state.thai_fname} />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <label>นามสกุล </label>
                            <Input type="text" value={this.state.thai_lname} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <label>สัญชาติ </label>
                            <Input value={this.state.nationality} />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>ปีเกิด </label>
                            <Input type="text" value={this.state.bdate} />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>บัตรประชาชน 13 หลัก </label>
                            <Input type="text" value={this.state.citizenID} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>ชื่อบิดา </label>
                            <Input
                              value={
                                "นาย " +
                                this.state.father_fname +
                                " " +
                                this.state.father_lname
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>ชื่อมารดา </label>
                            <Input
                              type="text"
                              value={
                                "นางสาว " +
                                this.state.mother_fname +
                                " " +
                                this.state.mother_lname
                              }
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
                              value={
                                this.state.house_no +
                                " ซอย " +
                                this.state.alley +
                                " ถนน " +
                                this.state.road +
                                " แขวง/ตำบล " +
                                this.state.sub_area +
                                " \nเขต/อำเภอ " +
                                this.state.sub_district +
                                " จังหวัด " +
                                this.state.country
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>เลขไปรษณีย์ </label>
                            <Input type="text" value={this.state.postal_code} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          {position == "รองผู้อำนวยการ" ||
                          position == "ผู้อำนวยการ" ? (
                            <FormGroup>
                              <label>ตำแหน่ง </label>
                              <Input value={position} />
                            </FormGroup>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <label>การศึกษา </label>
                        </Col>
                      </Row>
                      {this.state.education.length
                        ? this.state.education.map((item) => (
                            <div>
                              <Row>
                                <Col md={4}>
                                  <FormGroup>
                                    <label>วุฒิสาขา </label>
                                    <Input value={item.educational_name} />
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
                                    <Input value={item.graduate_country} />
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
                          ))
                        : null}
                      {this.state.education_sub.length
                        ? this.state.education_sub.map((item) => (
                            <div>
                              <Row>
                                <Col md={4}>
                                  <FormGroup>
                                    <label>วุฒิสาขา </label>
                                    <Input value={item.educational_name} />
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
                                    <Input value={item.graduate_country} />
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
                          ))
                        : null}
                      {this.state.etc.length
                        ? this.state.etc.map((item) => (
                            <div>
                              <Row>
                                <Col md={4}>
                                  <FormGroup>
                                    <label>วุฒิสาขา </label>
                                    <Input value={item.educational_name} />
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
                                    <Input value={item.graduate_country} />
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
                          ))
                        : null}
                      <Row>
                        <Col md={4}>
                          <label>การอบรบม </label>
                        </Col>
                      </Row>
                      {this.state.training.length
                        ? this.state.training.map((item) => (
                            <div>
                              <Row>
                                <Col md={4}>
                                  <FormGroup>
                                    <label>หัวข้อการอบรม </label>
                                    <Input value={item.training_topic} />
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
                                    <Input value={item.country_agency} />
                                  </FormGroup>
                                </Col>
                                <Col md={4}>
                                  <FormGroup>
                                    <label>จำนวนวัน</label>
                                    <Input type="text" value={item.date_diff} />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          ))
                        : null}
                    </Col>
                    {/* <Col lg={4}>
                      <label>โปรไฟล์ </label>
                      <FormGroup className="text-center">
                        <img
                          className="image-upload"
                          style={{ maxWidth: 280 }}
                          // src={this.state.employee_profile_image.src}
                          alt="profile"
                        />
                      </FormGroup>
                    </Col> */}
                  </Row>
                </TabPane>
                <TabPane tabId="second">
                  {this.state.tl.length? this.state.tl.map((item) => (
                        <div>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>ใบอนุญาติให้เป็นครู </label>
                                <Input value={item.teacher_licenseID} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>เลขที่ใบอนุญาติให้เป็นครู </label>
                                <Input type="text" value={item.tl_licenseNO} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ลงวันที่ </label>
                                <Input type="text" value={item.tl_date} />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>ตั้งแต่วันที่ </label>
                                <Input value={item.tl_since} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> สอนวิชา-ชั้น</label>
                                <Input
                                  type="text"
                                  value={item.tl_teaching_subject}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))
                    : null}
                  {this.state.tpl.length
                    ? this.state.tpl.map((item) => (
                        <div>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>ใบอนุญาติให้บรรจุ </label>
                                <Input
                                  value={item.teacher_permission_licenseID}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>เลขที่ใบอณุญาติให้เป็นครู </label>
                                <Input
                                  type="text"
                                  value={item.teacher_pemissionNO}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ลงวันที่ </label>
                                <Input type="text" value={item.tpl_date} />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>ตั้งแต่วันที่ </label>
                                <Input value={item.tpl_since} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> ปัจจุบันบรรจุเป็นครูโรงเรียน</label>
                                <Input
                                  type="text"
                                  value={item.tpl_currenly_work}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> ประเภท</label>
                                <Input
                                  type="text"
                                  value={item.tpl_teacher_type}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label> เขต/อำเภอ</label>
                                <Input type="text" value={item.tpl_district} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> จังหวัด</label>
                                <Input type="text" value={item.country} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> วุฒิที่ใช้บรรจุ</label>
                                <Input type="text" value={item.educational} />
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
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> ใบอนุญาติให้จำหน่ายครู</label>
                                <Input
                                  type="text"
                                  value={item.tpl_dischargeNO}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> ลงวันที่</label>
                                <Input
                                  type="text"
                                  value={item.tpl_discharge_date}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label> ตั้งแต่วันที่</label>
                                <Input
                                  type="text"
                                  value={item.tpl_discharge_since}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> สาเหตุ</label>
                                <Input
                                  type="text"
                                  value={item.tpl_discharge_motive}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))
                    : null}
                  {this.state.ht_license.length
                    ? this.state.ht_license.map((item) => (
                        <div>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>ใบอนุญาติให้เป็นครูใหญ่</label>
                                <Input value={item.HT_licenseID} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>เลขที่ </label>
                                <Input type="text" value={item.HT_licenseNO} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ลงวันที่ </label>
                                <Input
                                  type="text"
                                  value={item.HT_license_date}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>
                                  ใบอนุญาติให้จำหน่ายครูใหญ่ เลขที่{" "}
                                </label>
                                <Input value={item.HT_dischargeNO} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> ลงวันที่</label>
                                <Input
                                  type="text"
                                  value={item.HT_discharge_date}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label> ตั้งแต่วันที่</label>
                                <Input
                                  type="text"
                                  value={item.HT_discharge_since}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label> สาเหตุ</label>
                                <Input
                                  type="text"
                                  value={item.HT_discharge_motive}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))
                    : null}
                  {this.state.app.length
                    ? this.state.app.map((item) => (
                        <div>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>
                                  บรรจุเป็นผู้จัดการ ใบอนุญาติ เลขที่
                                </label>
                                <Input value={item.appointmentNO} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ลงวันที่</label>
                                <Input value={item.app_date} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ตั้งแต่วันที่</label>
                                <Input value={item.app_since} />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>โรงเรียน</label>
                                <Input value={item.app_currently_work} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ประเภท</label>
                                <Input value={item.app_teacher_type} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>เขต/อำเภอ</label>
                                <Input value={item.app_district} />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>จังหวัด</label>
                                <Input value={item.app_country} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>วุฒิ</label>
                                <Input value={item.app_educational} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ใบอนุญาติให้จำหน่าย เลขที่</label>
                                <Input value={item.app_dischargeNO} />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <label>ลงวันที่</label>
                                <Input value={item.app_discharge_date} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>ตั้งแต่วันที่</label>
                                <Input value={item.app_discharge_since} />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <label>สาเหตุ</label>
                                <Input value={item.app_discharge_motive} />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))
                    : null}
                  {this.state.portfolio.length
                    ? this.state.portfolio.map((item) => (
                        <div>
                          <Row>
                            <Col md={12}>
                              <FormGroup>
                                <label>ผลงาน</label>
                                <Input value={item.portfolio_name} />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))
                    : null}
                  {this.state.insignia.length
                    ? this.state.insignia.map((item) => (
                        <div>
                          <Row>
                            <Col md={12}>
                              <FormGroup>
                                <label>เครื่องราชอิสริยาภรณ์</label>
                                <Input value={item.insignia_name} />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))
                    : null}
                  {this.state.punishment.length
                    ? this.state.punishment.map((item) => (
                        <div>
                          <Row>
                            <Col md={12}>
                              <FormGroup>
                                <label>การลงโทษ</label>
                                <Input value={item.pusnisment_name} />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))
                    : null}
                </TabPane>
              </TabContent>
            </CardBody>
            <CardFooter className="text-right">
              <Link to={`/manage-users`}>
                <Button type="button">Back</Button>
              </Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Detail
