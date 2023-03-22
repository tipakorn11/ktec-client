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


import { NewsModel} from "../../models"

const news_model = new NewsModel()
class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      news:[],
      option_years:[],
      newsID:'',
      news_title:'',
      news_description:'',
      news_file:'',
      news_date:'',

    }



  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
    const { code } = this.props.match.params

    let news = await news_model.getNewsByid({ newsID: code })
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
      newsID,
      news_title,
      news_description,
      news_file,
      news_date,

    }=news.data[0]
    //.log(option_years);
    this.setState({
      news,
      newsID,
      news_title,
      news_description,
      news_file,
      news_date,
      loading: false,
      option_years,
      education_year:year + 543
    },() => console.log('hee',news))
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      //console.log(this.state);
      const res = await news_model.updateNews({
        newsID: this.state.newsID,
        news_title: this.state.news_title,
        news_description: this.state.news_description,
        news_file_date: this.state.news_file_date,
      })
      console.log(res);
      if (res.require) {
        Swal.fire({ title: "บันทึกข้อมูลแล้ว !", icon: "success", })
        this.props.history.push(`/news`)
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

    if (this.state.news_title == '') {
      Swal.fire("กรุณาระบุชื่อเรื่อง")
      return false
    }
    else if (this.state.news_description === '') {
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
            <h3 className="text-header">แก้ไขข่าวประชาสัมพันธ์</h3>
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
                          readOnly
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
              <Button type="submit" color="success">บันทึก</Button>
              <Link to={`/news`}><Button type="button">กลับ</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Insert