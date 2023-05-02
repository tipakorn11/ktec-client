import React from "react"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Row,
} from "reactstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { Loading } from "../../component/customComponent"
import NoteModal from './note.modal'
import { FilesModel} from "../../models"
import Pdf from '../../assets/file/default-team.jpg'
import axios from "axios"
import GROBAL from "../../GLOBAL"
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
const files_model = new FilesModel()
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      files:[],
      option_years:[],
      file_note : "",
      file_pdf:""
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
    this.DownloadFile()
    const   {
      fileID,
      personalID,
      file_name,
      file_status,
      file_date,
      fullname,
      file_note,
    }=files.data[0]
    //.log(option_years);
    this.setState({
        files,
        fileID,
        personalID,
        file_name,
        file_status,
        file_date,
        fullname,
        file_note,
        loading: false,
        option_years,
        education_year:year + 543,

    })
  }

  _onApprove = () => this.setState({ loading: true, }, async () => {
    const res = await files_model.updateStatusFiles({
      fileID : this.state.fileID,
      file_status: 'approve',
      file_note: ''
    })

    if (res.require) {
      Swal.fire({ title: "อนุมัติข้อมูลแล้ว !", icon: "success", })
      this.props.history.push(`/file-approve`)
    } else {
      this.setState({
        loading: false,
      }, () => {
        Swal.fire({ title: "เกิดข้อผิดพลาด !", text: "ไม่สามารถดำเนินการได้ !", icon: "error", })
      })
    }
  
  })

  _onCancel = (data) => this.setState({ loading: true, }, async () => {
    const res = await files_model.updateStatusFiles({
      fileID : this.state.fileID,
      file_status: 'cancel',
      file_note: data.file_note
    })
    if (res.require) {
      Swal.fire({ title: "ไม่อนุมัติเรียบร้อย !", icon: "success", })
      this.props.history.push(`/file-approve`)
    } else {
      this.setState({
        loading: false,
      }, () => {
        Swal.fire({ title: "เกิดข้อผิดพลาด !", text: "ไม่สามารถดำเนินการได้ !", icon: "error", })
      })
    }
  })
  DownloadFile = async () => {
    const { code } = this.props.match.params
    const data = new FormData()
    data.append('fileID', code)
    await axios.post(GROBAL.BASE_SERVER.URL + 'files/downloadFile', data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, responseType: 'blob'
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ไฟล์.pdf'); 
        document.body.appendChild(link);
        link.click();
      });
  }
  render() {
    const { permission_approve,permission_cancel } = this.props.PERMISSION
    
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
                            <td ><b>หัวข้อ </b></td>
                            <td >{this.state.file_name} </td>
                          </tr>
                          <tr>
                            <td><b>สถานะของไฟล์ </b></td>
                            <td>{this.state.file_status ==="wait"?"รอการอนุมัติ":this.state.file_status === "approve"?"อนุมัติ":"ไม่อนุมัติ"} </td>
                          </tr>
                          <tr>
                            <td ><b>หมายเหตุ </b></td>
                            <td >{this.state.file_note} </td>
                          </tr>
                        </tbody>
                      </table>
                    </CardBody>
                    
                  </Card>
                </Col>
                  {/* <object 
                   type="application" 
                   data={url} 
                   width="60%" 
                   height="800">
                  </object> */}
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              {(this.state.file_status == "wait" && permission_approve == 1) || (this.state.file_status == "cancel"&& permission_approve == 1) ? 
              <Button type="submit" color="success"onClick={this._onApprove}>อนุมัติ</Button> : null }
              {this.state.file_status == "wait" && permission_cancel == 1 ? <Button type="submit" color="danger"onClick={() => this.setState({ show_modal: true })}>ไม่อนุมัติ</Button> : null }
              <Link to={`/file-approve`}><Button type="button">Back</Button></Link>
            </CardFooter>
          </Form>
        </Card>
        <NoteModal
          show={this.state.show_modal}
          onSave={this._onCancel}
          onClose={() => this.setState({ show_modal: false })}
        />
      </div>
    )
  }
}

export default Detail