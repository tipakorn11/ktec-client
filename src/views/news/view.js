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
import { connect } from 'react-redux'
import { Loading, DatePicker, DataTable } from "../../component/customComponent"
import dateFormat from '../../utils/date-format'
import { NewsModel } from '../../models'

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
            date_end:"",
            date_start:""


            
        }
    }

    async componentDidMount() {
        this._fetchData()
    }
    _fetchData = (params = { pagination: this.state.pagination }) => this.setState({ loading: true, }, async () => {
        let news = await news_model.getNewsBy({
          date_start: dateFormat.toFormat(this.state.date_start,"yyyy-MM-DD"),
          date_end: dateFormat.toFormat(this.state.date_end,"yyyy-MM-DD")
        })
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
            const res = await news_model.deleteNewsByid({ newsID: code })
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
              {permission_add === '1' ?
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
                    onClick={() => {
                      if (this.state.date_start && this.state.date_end && this.state.date_start < this.state.date_end) {
                        this.setState(this._fetchData());
                      } else {
                        Swal.fire({
                          title: "กรุณากรอกวันที่ที่ถูกต้อง",
                          icon: "warning",
                        })
                      }
                    }}
                  >
                    ค้นหา
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
                  title: "วันที่",
                  dataIndex: "news_file_date",
                  render: (cell) => dateFormat.toFormat(cell,"DD/MM/yyyy"),
                  ellipsis: true,
                },
                {
                  title: '',
                  dataIndex: '',
                  render: (cell) => {
                    const row_accessible = []
                    if (permission_view === '1') {
                        row_accessible.push(
                          <Link key={"detail"} to={`/news/detail/${cell.newsID}`} title="รายละเอียด">
                            <button type="button" className="icon-button color-primary">
                              <i className="fa fa-eye" aria-hidden="true" />
                            </button>
                          </Link>
                        )
                      }
                    if (permission_edit === '1') {
                      row_accessible.push(
                        <Link key={"update"} to={`/news/update/${cell.newsID}`} title="แก้ไขรายการ">
                          <button type="button" className="icon-button color-warning">
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                          </button>
                        </Link>
                      )
                    }
                    if (permission_delete === '1') {
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

const mapStatetoProps = (state) => ({
  date_start: state.date_start,
  date_end: state.date_end,
})

const mapDispatchtoProps = (dispatch) => ({
  setDateStart: (val) => dispatch({ type: 'set', date_start: val }),
  setDateEnd: (val) => dispatch({ type: 'set', date_end: val }),
})

export default connect(mapStatetoProps, mapDispatchtoProps)(ViewComponent)