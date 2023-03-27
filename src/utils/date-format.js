import moment from 'moment'

const moments = require('moment-timezone')

moments().tz("Asia/Bangkok").format()

const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

const _validateDate = (date) => {
  const result = moment(date, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY', 'DD/MM/YYYY HH:mm:ss'])

  return result.isValid() ? result : false
}

const dateFormat = {
  toDate: (date, instead = '') => _validateDate(date) ? new Date(date) : instead,
  toFormat: (value, ftxt, instead = '') => {
    const date = _validateDate(value)

    if (date && ftxt) {
      if (ftxt.search("MName")) ftxt = ftxt.replace("MName", monthNames[+date.format('MM') - 1])

      return date.format(ftxt)
    } else {
      return instead
    }
  },
  showDateTimeTH: (date) => {
    
    if (date && moment(date).isValid()) {
      const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
      const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
      const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')
      const time = moment.utc(date).tz("Asia/Bangkok").format('HH:mm')

      return `${day}/${month}/${year} ${time}`
    } else {
      return ''
    }
  },
}

export default dateFormat