import React from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'

class NoteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file_note: '',
    }
  }

  componentDidUpdate(props_old) {
    if (!props_old.show && this.props.show) {
      this._fetchData()
    }
  }

  _fetchData = () => this.setState({ file_note: '', })

  _handleSave = () => this.props.onSave({ file_note: this.state.file_note, })

  _handleClose = () => this.props.onClose()

  render() {
    return (
      <Modal size="lg" centered isOpen={this.props.show} toggle={this._handleClose}>
        <ModalHeader toggle={this._handleClose}>ไม่อนุมัติไฟล์</ModalHeader>
        <ModalBody>
          <label>หมายเหตุ <font color="#F00"><b>*</b></font></label>
          <Input
            type="textarea"
            value={this.state.file_note}
            onChange={(e) => this.setState({ file_note: e.target.value })}
            required
          />
          <p className="text-muted m-0">Example : -.</p>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="success" onClick={this._handleSave}>ยืนยัน</Button>
          <Button type="button" onClick={this._handleClose}>ยกเลิก</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default NoteModal