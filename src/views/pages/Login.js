import React from 'react'
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
  Row
} from 'reactstrap'
import { CImg } from '@coreui/react'
import { Link } from 'react-router-dom'
import { AuthConsumer, } from '../../role-access/authContext'
import icon_ktec from '../../assets/image/logo_ktec.png'
import bg_ktec from '../../assets/image/bgnewer.jpg'

const Login = () => {
  const [state, setState] = React.useState({
    username: '',
    password: '',
  })

  return (
    <AuthConsumer>
      {({ _handleLogin }) => (
        <div className="c-app c-default-layout flex-row align-items-center" style={{ backgroundImage: `url(${bg_ktec})`,width: "100%",}}>
          <Container>
            <Row className="justify-content-center">
              <Col md={6}>
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={(e) => { e.preventDefault(); _handleLogin(state); }}>
                        <div className='text-center mb-3'>
                        <CImg src={icon_ktec} style={{width:150}} className="c-avatar-img" alt="user-profile" />
                        </div>
                        <h4>ลงชื่อเข้าใช้งาน</h4>
                        <p className="text-muted"></p>
                        <InputGroup className="mb-3">
                          <InputGroupText>
                            <i className="fa fa-user" />
                          </InputGroupText>
                          <Input
                            type="text"
                            placeholder="Username"
                            value={state.username}
                            onChange={(e) => setState({ ...state, username: e.target.value })}
                            autoComplete="username"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupText>
                            <i className="fa fa-lock" />
                          </InputGroupText>
                          <Input
                            type="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value })}
                            autoComplete="current-password"
                            required
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="12" md="12" lg={4} className="mt-md-1 mt-sm-2 ">
                            <Button color="primary" className="px-4 form-control">เข้าสู่ระบบ</Button>
                          </Col>
                          <Col xs="12" md="12" lg={4} className="mt-md-1 mt-sm-2">
                            <Link key={"detail"} to={`/register`} title="ดูรายละเอียด">
                              <button type="button" className="btn btn-success form-control">สมัครสมาชิก</button>
                            </Link>
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
      )}
    </AuthConsumer>
  )
}

export default Login