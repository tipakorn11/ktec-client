import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    FormGroup,

} from 'reactstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Loading, DatePicker, DataTable } from "../../component/customComponent"
import { NewsModel } from '../../models'
const color_templates = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#2ECC71',
    '#F1C40F',
    '#3498DB',
    '#8E44AD',
    '#E74C3C',
    '#1ABC9C',
    '#F0B27A',
]
const news_model = new NewsModel()
class ViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: [],
            loading: true,
            pagination: {
                current: 1,
                pageSize: 15,
              },
            total: '',

            
        }
    }

    async componentDidMount() {
        this._fetchData()
    }
    _fetchData = (params = { pagination: this.state.pagination }) => this.setState({ loading: true, }, async () => {
        let news = await news_model.getNewsBy()
       
        this.setState({
          news,
          total: news.total,
          loading: false,
           
            })
  
        })
    
        _onDelete = (code) => Swal.fire({
            title: "คุณแน่ใจหรือไม่ ?",
            text: "ยืนยันลบรายการนี้",
            icon: "warning",
            showCancelButton: true,
          }).then(({ value }) => value && this.setState({ loading: true, }, async () => {
            let total = this.state.total - 1;
           
            const res = await news_model.deleteNewsByid({ newsID: code })
            console.log(res);
            if (res.require) {
              Swal.fire({ title: 'ลบรายการแล้ว !', text: '', icon: 'success' })
              this._fetchData()
            } else {
              this.setState({
                loading: false,
              }, () => {
                Swal.fire({ title: "เกิดข้อผิดพลาด !", text: "ไม่สามารถดำเนินการได้ !", icon: "error", })
              })
            }
          }))
    render() {
        const { permission_view ,permission_add, permission_edit, permission_delete } = this.props.PERMISSION

        return (
             <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">ข่าวประชาสัมพันธ์</h3>
              {permission_add == 1 ?
                <Link to={`/news/insert`} className="btn btn-success float-right">
                  <i className="fa fa-plus" aria-hidden="true" /> เพิ่มข่าวประชาสัมพันธ์
                </Link>
              : null }
          </CardHeader>
          <CardBody>
          <Row>
              <Col md={10}>
                <FormGroup
                  className="align-bottom d-inline-block"
                  style={{ marginRight: 8 }}
                >
                  <div className="d-inline-block">
                    <label>วันที่ </label>
                    <DatePicker
                      format={"DD/MM/YYYY"}
                      value={this.state.date_start}
                      onChange={(e) =>
                        this.setState({ date_start: e }, () =>
                          this.props.setDateStart(e)
                        )
                      }
                    />
                  </div>{" "}
                  -{" "}
                  <div className="d-inline-block">
                    <DatePicker
                      format={"DD/MM/YYYY"}
                      value={this.state.date_end}
                      onChange={(e) =>
                        this.setState({ date_end: e }, () =>
                          this.props.setDateEnd(e)
                        )
                      }
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  className="align-bottom d-inline-block"
                  style={{ marginRight: 8 }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      this.setState({ is_filter: true }, this._fetchData())
                    }
                  >
                    ค้นหา
                  </button>
                </FormGroup>
                <FormGroup>{this.state.active_tab === 'unseen' ?   
                  <button className="btn btn-primary "  onClick={() => this._onCheckAllRead()}>
                    อ่านทั้งหมด
                  </button> : "" }
                  <button className="btn btn-primary " onClick={() => this._onDeleteAllCheck()} >
                    ลบทั้งหมด
                </button>
                </FormGroup>
              </Col>
            </Row>
            <DataTable
              onChange={this._fetchData}
              showRowNo={true}
              pageSize={this.state.pagination.pageSize}
              dataSource={this.state.news.data}
              dataTotal={this.state.news.total}
              current={this.state.pagination.current}
              rowKey='newsID'
              columns={[
                {
                  title: "ชื่อเรื่อง",
                  dataIndex: "news_title",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "รายละเอียด",
                  dataIndex: "news_description",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: '',
                  dataIndex: '',
                  render: (cell) => {
                    const row_accessible = []
                    if (permission_view == 1) {
                        row_accessible.push(
                          <Link key={"detail"} to={`/news/detail/${cell.newsID}`} title="รายละเอียด">
                            <button type="button" className="icon-button color-primary">
                              <i className="fa fa-search" aria-hidden="true" />
                            </button>
                          </Link>
                        )
                      }
                    if (permission_edit == 1) {
                      row_accessible.push(
                        <Link key={"update"} to={`/news/update/${cell.newsID}`} title="แก้ไขรายการ">
                          <button type="button" className="icon-button color-warning">
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                          </button>
                        </Link>
                      )
                    }
                    if (permission_delete == 1) {
                      row_accessible.push(
                        <button key="delete" type="button" className="icon-button color-danger" onClick={() => this._onDelete(cell.newsID)} title="ลบรายการ">
                          <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                      )
                    }

                    return row_accessible
                  },
                  width: 80
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
        )
    }
}

export default ViewComponent