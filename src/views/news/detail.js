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
import { Loading,  } from "../../component/customComponent"
import { NewsModel} from "../../models"
import dateFormat from '../../utils/date-format'

const news_model = new NewsModel()
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news_titles: "", 
      news_description: "",
      news_file_date: "",
      news_file: "",
      loading: true,
      user:[],
      option_years:[]
    }
  }

  componentDidMount() {
    this._fetchData()
  }
  _fetchData = async () => {
    let { code } = this.props.match.params
    let news = await news_model.getNewsByid({ newsID: code })

    const {
      news_title, 
      news_description,
      news_file_date,
      news_file,
    } = news.data[0]
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
    this.setState({
      news_title, 
      news_description,
      news_file_date : dateFormat.toFormat(news_file_date,"DD/MM/yyyy"),
      news_file,
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
            <h3 className="text-header">รายละเอียดข่าวประชาสัมพันธ์</h3>
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
                            <td><b>ชื่อเรื่อง </b></td>
                            <td>{this.state.news_title} </td>
                          </tr>
                          <tr>
                            <td ><b>รายละเอียด </b></td>
                            <td >{this.state.news_description} </td>
                          </tr>
                          <tr>
                            <td ><b>วันที </b></td>
                            <td >{this.state.news_file_date } </td>
                          </tr>
                        </tbody>
                      </table>
                    </CardBody>
                    
                  </Card>
                </Col>
                  <object  type="application/pdf" data={this.state.news_file} width="60%" height="700">
                  </object>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">Save</Button>
              <Link to={`/news`}><Button type="button">Back</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Detail