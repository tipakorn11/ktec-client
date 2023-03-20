import React from "react"
const routes = [
  // { key: 'ปริญญานิพนธ์', name: "ปริญญานิพนธ์", path: "/manage-thesis/thesis", component: React.lazy(() => import("./views/manage-thesis/thesis")) },
  { key: 'จัดการไฟล์', name: "จัดการไฟล์", path: "/file-approve", component: React.lazy(() => import("./views/file-approve"))},
  { key: 'จัดการสิทธ์เข้าใช้งาน', name: "จัดการสิทธ์เข้าใช้งาน", path: "/manage-permission", component: React.lazy(() => import("./views/manage-permission"))},
  { key: 'คำนำหน้า', name: "คำนำหน้า", path: "/prefix", component: React.lazy(() => import("./views/prefix"))},
  { key: 'จัดการหมวดวิชา', name: "จัดการหมวดวิชา", path: "/course", component: React.lazy(() => import("./views/course"))},
  { key: 'จัดการข้อมูลบุคลากร', name: "จัดการข้อมูลบุคลากร", path: "/manage-users", component: React.lazy(() => import("./views/manage-users"))},
  { key: 'ข่าวประชาสัมพันธ์', name: "ข่าวประชาสัมพันธ์", path: "/news", component: React.lazy(() => import("./views/news"))},
  { path: "/",  key: 'ข่าวประชาสัมพันธ์', name: "ข่าวประชาสัมพันธ์", component: React.lazy(() => import("./views/news"))},

  // { key: 'สถิติผู้เข้าชมปริญญานิพนธ์', name: "สถิติผู้เข้าชมปริญญานิพนธ์", path: "/statistic/view", component: React.lazy(() => import("./views/dasboard/view-dashboard"))},
      
]
export default routes