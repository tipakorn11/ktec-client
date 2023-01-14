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
      option_years:[]
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = async () => {
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
    //.log(option_years);
    this.setState({
      loading: false,
      option_years,
      education_year:year + 543
    })
  }

  _handleSubmit = async (event) => {
    event.preventDefault()
    this._checkSubmit() && this.setState({ loading: true, }, async () => {
      //console.log(this.state);
      const res = await news_model.insertNews({
        newsID: this.state.newsID,
        news_title: this.state.news_title,
        news_description: this.state.news_description,
        news_file_date: this.state.news_file,
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
       
      </div>
    )
  }
}

export default Insert