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


import { PrefixModel} from "../../models"

const prefix_model = new PrefixModel()
class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      prefix:[],
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
      const res = await prefix_model.insertPrefix({
        prefixID: this.state.prefixID,
        prefix_title: this.state.prefix_title,
        prefix_description: this.state.prefix_description,
        prefix_file_date: this.state.prefix_file,
      })
      console.log(res);
      if (res.require) {
        Swal.fire({ title: "บันทึกข้อมูลแล้ว !", icon: "success", })
        this.props.history.push(`/prefix`)
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

    if (this.state.prefix_title == '') {
      Swal.fire("กรุณาระบุชื่อเรื่อง")
      return false
    }
    else if (this.state.prefix_description === '') {
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