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
import { FilesModel} from "../../models"
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
const files_model = new FilesModel()
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      files:[],
      option_years:[]
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    let { code } = this.props.match.params
    let files = await files_model.getFilesByid({fileID: code})
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
    const   {
      fileID,
      personalID,
      file_name,
      file_status,
      file_date,
      fullname,
    }  = files.data [0]
    //.log(option_years);
    this.setState({
        files,
        fileID,
        personalID,
        file_name,
        file_status,
        file_date,
        fullname,
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
            <h3 className="text-header">รายละเอียดไฟล์</h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit}>
            <CardBody className="p-5">
              <Row>
                <Col md={8}>
                  <Card>
                    <CardBody>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ width: 160, }}><b>รหัสบุคลากร </b></td>
                            <td>{this.state.personalID} </td>
                          </tr>
                          <tr>
                            <td><b>ชื่อบุคลากร </b></td>
                            <td>{this.state.fullname} </td>
                          </tr>
                          <tr>
                            <td ><b>ชื่อไฟล์ </b></td>
                            <td >{this.state.file_name} </td>
                          </tr>
                          <tr>
                            <td><b>สถานะของไฟล์ </b></td>
                            <td>{this.state.file_status} </td>
                          </tr>
                        </tbody>
                      </table>
                    </CardBody>
                    
                  </Card>
                </Col>
                  <object type="application/pdf" data="src\assets\image\bg.jpg" width="60%" height="800">
                  </object>
              </Row>
            
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">อนุมัติ</Button>
              <Button type="submit" color="danger">ไม่อนุมัติ</Button>
              <Link to={`/file-approve`}><Button type="button">Back</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Detail