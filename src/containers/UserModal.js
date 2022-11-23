// import React from 'react'
// import {
//     Button,
//     Col,
//     Row,
//     FormGroup,
//     Input
// } from 'reactstrap'
// import {
//     CModal,
//     CModalBody,
//     CModalFooter,
//     CModalHeader,

// } from '@coreui/react'
// import { SelectSearch } from '../component/customComponent'
// class UserModal extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             user: JSON.parse(localStorage.getItem('session-user')),
//             position: JSON.parse(localStorage.getItem('permission')),
//             permission: JSON.parse(localStorage.getItem('temp_permission')),
//             position_name: "",
//             permission_tmp: []
//         }
//     }


//     componentDidMount() {
//         if (this.props.show) {
//             this._refreshData()
//         }
//     }

//     componentDidUpdate(props_old) {
//         if (props_old.show === false && this.props.show) {
//             this._refreshData()
//         }
//     }

//     _refreshData() {
//         const permission = []
//         this.state.permission.map((item) =>{
//             permission.push({
//                 label:item.position_name,
//                 value:item.position_name
//             })
//         })
//         this.setState({
//             position_name: this.state.position.position_name,
//             permission_tmp: permission
//         })
//     }
//     _handleClose() {
//         this.props.onRefresh()
//     }

//     _handleSave() {
//         const permission = []
//         this.state.permission.map((item)=>{
//             if(item.position_name == this.state.position_name){
//                 permission.push(item)
//             }
//         })
//         localStorage.setItem('permission',JSON.stringify(permission[0]));
//         window.location.reload(false)
//         this.props.onRefresh()
//     }
//     render() {
//         const permission_options = [...this.state.permission_tmp.map(item => ({
//             label: item.label, value: item.value,
//           }))]
//         return (
//             <CModal
//                 //onHide={() => this._handleClose()}
//                 size="lg"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 //dialogClassName="modal-90w"
//                 show={this.props.show}
//                 onClose={() => this._handleClose()}
//             >
//                 <CModalHeader closeButton>
//                     <h4>ข้อมูลผู้ใช้งาน</h4>
//                 </CModalHeader>
//                 <CModalBody>
//                     <Row>
//                         <Col md="4" lg="6">
//                             <FormGroup className='p-2'>
//                                 <label>ชื่อผุ้ใช้งาน</label>
//                                 <Input
//                                     type="text"
//                                     value={this.state.user.prename_th + this.state.user.firstname + " " + this.state.user.lastname}
//                                     readOnly
//                                 />
//                             </FormGroup>
//                         </Col>
//                         <Col  md="4" lg="6">
//                             <FormGroup className='p-2'>
//                                 <label>สิทธิ์ผู้ใช้งาน</label>
//                                 <SelectSearch
//                                     options={permission_options}
//                                     value={{ value: this.state.position_name }}
//                                     onChange={(val) => this.setState({position_name:val.value})}
//                                 />
//                             </FormGroup>
//                         </Col>
//                     </Row>
//                 </CModalBody>
//                 <CModalFooter style={{ display: "table", width: "100%" }}>
//                     <Row >
//                         <Col md="6" lg="12" style={{ textAlign: "center" }}>
//                             <Button type="button" size="md" color="success" onClick={() => this._handleSave()}>เปลี่ยนโหมดผู้ใช้งานระบบ</Button>
//                             <Button variant="secondary" size="md" onClick={() => this._handleClose()}>ยกเลิก</Button>
//                         </Col>
//                     </Row>
//                 </CModalFooter>
//             </CModal>
//         )
//     }
// }
// export default UserModal