import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { SelectSearch, Loading } from "../../component/customComponent";
import { UserModel } from "../../models";

const user_model = new UserModel();
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      citizenID: "",
      user_status: "wait",
      loading: true,
      username_check: {
        value: "",
        status: false,
      },
      citizenID_check: {
        value: "",
        status: false,
      },
    };
  }
  componentDidMount() {
    this._fetchData();
  }

  _fetchData = async () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        this.setState({
          loading: false,
        });
      }
    );
  };
  _handleSubmit = (event) => {
    event.preventDefault();
    this._checkUsername();
    this._checkSubmit() &&
      this.setState({ loading: true }, async () => {
        const res = await user_model.updateUserByCitizenid({
          username: this.state.username.trim(),
          password: this.state.password.trim(),
          citizenID: this.state.citizenID,
        });

        if (res.require) {
          Swal.fire({ title: "สมัครสมาชิกเสร็จสิ้น !", icon: "success" });
          this.props.history.push(`/`);
        } else {
          this.setState(
            {
              loading: false,
            },
            () => {
              Swal.fire({
                title: "เกิดข้อผิดพลาด !",
                text: "ไม่สามารถดำเนินการได้ !",
                icon: "error",
              });
            }
          );
        }
      });
  };
  _checkSubmit() {
    if (this.state.citizenID === "") {
      Swal.fire("กรุณาระบุรหัสบัตรประชาชน");
      return false;
    } else if (this.state.username === "") {
      Swal.fire("กรุณาระบุชื่อผู้ใช้งาน");
      return false;
    } else if (this.state.password === "") {
      Swal.fire("กรุณาระบุรหัสผ่าน");
      return false;
    } else {
      return true;
    }
  }
  _checkCitizenID = async () => {
    const CitizenID = this.state.citizenID.replace(/\//g, "-").trim();
    if (CitizenID.length) {
      if (this.state.citizenID_check.value !== CitizenID) {
        const duplicate = await user_model.getUserCitizenid({
          citizenID: CitizenID,
        });
        this.setState({
          citizenID: CitizenID,
          citizenID_check: duplicate.data.length
            ? {
                value: CitizenID,
                status: true,
              }
            : {
                value: CitizenID,
                status: false,
              },
        });
      }
    } else {
      this.setState({ citizenID_check: { value: "", status: false } });
    }
  };
  _checkUsername = async () => {
    const Username = this.state.username.replace(/\//g, "-").trim();
    if (Username.length) {
      if (this.state.username_check.value !== Username) {
        const duplicate = await user_model.getUserByUsername({
          username: Username,
        });
        this.setState({
          username: Username,
          username_check: duplicate.data.length
            ? {
                value: Username,
                status: true,
              }
            : {
                value: Username,
                status: false,
              },
        });
      }
    } else {
      this.setState({ username_check: { value: "", status: false } });
    }
  };
  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <Loading show={this.state.loading} />
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this._handleSubmit}>
                      <h1 className="text-center">สมัครสมาชิก</h1>
                      <InputGroup className="mb-4">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                        <Input
                          type="input"
                          placeholder="รหัสบัตรประชาชน"
                          value={this.state.citizenID}
                          onChange={(e) =>
                            this.setState({ citizenID: e.target.value })
                          }
                          required
                          onBlur={this._checkCitizenID}
                        />
                              </InputGroup>
                          {this.state.citizenID_check.status ? (
                            <div className="alert alert-success mt-3" role="alert">
                              ข้อมูลบัตรประชาชมถูกต้อง
                            </div>
                          ) : 
                          this.state.citizenID_check.value === ""?
                              ""
                            :
                            <div className="alert alert-danger mt-3" role="alert">
                              ข้อมูลบัตรประชาชนไม่ถูกต้อง
                            </div>
                          }                        
                      <InputGroup className="mb-3 mt-4">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                        <Input
                          type="text"
                          placeholder="ชื่อผู้ใช้งาน"
                          value={this.state.username}
                          onChange={(e) =>
                            this.setState({ username: e.target.value })
                          }
                          // autoComplete="username"
                          required
                          onBlur={this._checkUsername}
                        />
                      </InputGroup>
                      {this.state.username_check.status ? (
                        <div className="alert alert-danger mt-3" role="alert">
                          ชื่อผู้ใช้งานนี้มีอยู่แล้ว
                        </div>
                      ) : (
                        ""
                      )}
                      <InputGroup className="mb-4">
                        <InputGroupText>
                          <i className="fa fa-lock" />
                        </InputGroupText>
                        <Input
                          type="password"
                          placeholder="รหัสผ่าน"
                          value={this.state.password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                          autoComplete="current-password"
                          required
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6" lg={6} className="text-left">
                          <Link to={`/`}>
                            <Button type="button">Back</Button>
                          </Link>
                        </Col>
                        <Col xs="6" lg={6} className="text-right">
                          <Button color="primary" className="px-4">
                            Register
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Register;
