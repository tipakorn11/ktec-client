//import axios from "axios"
const GROBAL = {

  BASE_SERVER: {
    // URL: 'https://www.dev.rmuti.ac.th/ktec/ktec-Server/',
    URL: 'http://localhost/ktec-Server/',
    // URL_IMG: 'http://localhost:3000',
    // URL_FILE: 'http://localhost/cpe-thesis-server/src/uploads/'
  },

  // -----------------------------------------------------------------------------------
  // BASE_SERVER: {
  //   URL: 'https://www.cpe-thesis.rmuti.ac.th/thesis/',
    // URL_IO: 'ws://localhost:3501/',
    // URL_IMG: 'http://localhost:3000',
    // URL_EXPORT: 'http://localhost/giftshop_export/',
  // },

  ACCESS_TOKEN: {
    'x-access-token': localStorage.getItem("x-access-token"),
  },
  PERMISSION:{
    'permission': localStorage.getItem("permission"),
    'temp_permission': localStorage.getItem("temp_permission")
  }
}

export default GROBAL