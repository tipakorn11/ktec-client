
const accessMenu = ({ PERMISSIONS}) => {
    const thesis = []
    const user = []
    const inside = []
    const master = []
    const statistic = []

//     const _checkPermission = (data) => {
//         const permission = PERMISSIONS.find(item => item.menu_name === data && item.permission_view == 1)
//         if(permission !== undefined){
//             return  true
//         }else{
//             return false
//         }
//     }
//     if (_checkPermission("สถิติผู้เข้าชมปริญญานิพนธ์")) {
//         statistic.push({
//             _tag: "CSidebarNavItem",
//             name: "สถิติผู้เข้าชมปริญญานิพนธ์",
//             to: "/statistic/view",
//             icon: <i className="c-sidebar-nav-icon fa fa-bar-chart" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("สถิติผู้ดาวน์โหลดปริญญานิพนธ์")) {
//         statistic.push({
//             _tag: "CSidebarNavItem",
//             name: "สถิติผู้ดาวน์โหลดปริญญานิพนธ์",
//             to: "/statistic/download",
//             icon: <i className="c-sidebar-nav-icon fa fa-bar-chart" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("ปริญญานิพนธ์")) {
//         thesis.push({
//             _tag: "CSidebarNavItem",
//             name: "ปริญญานิพนธ์",
//             to: "/manage-thesis/thesis",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }

//     if (_checkPermission("ค้นหาปริญญานิพนธ์")) {
//         thesis.push({
//             _tag: "CSidebarNavItem",
//             name: "ค้นหาปริญญานิพนธ์",
//             to: "/manage-thesis/search-thesis",
//             icon: <i className="c-sidebar-nav-icon fa fa-search" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("ผู้ใช้งานระบบ")) {
//         user.push({
//             _tag: "CSidebarNavItem",
//             name: "ผู้ใช้งานระบบ",
//             to: '/manage-user/user',
//             icon: <i className="c-sidebar-nav-icon fa fa-users"></i>,
//             exact: false,
//         })
//     }

//     if (_checkPermission("อนุมัติสมัครสมาชิก")) {
//         user.push({
//             _tag: "CSidebarNavItem",
//             name: "อนุมัติสมัครสมาชิก",
//             to: '/manage-user/approve-user',
//             icon: <i className="c-sidebar-nav-icon fa fa-user" />,
//             exact: false,
//         })
//     }

//     if (_checkPermission("นักศึกษา")) {
//         inside.push({
//             _tag: "CSidebarNavItem",
//             name: "นักศึกษา",
//             to: "/inside-data/student",
//             icon: <i className="c-sidebar-nav-icon fa fa-user"></i>,
//             exact: false,
//         })
//     }

//     if (_checkPermission("อาจารย์")) {
//         inside.push({
//             _tag: "CSidebarNavItem",
//             name: "อาจารย์",
//             to: "/inside-data/teacher",
//             icon: <i className="c-sidebar-nav-icon fa fa-user" />,
//             exact: false,
//         })
//     }

//     if (_checkPermission("คณะ")) {
//         inside.push({
//             _tag: "CSidebarNavItem",
//             name: "คณะ",
//             to: "/inside-data/faculty",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }

//     if (_checkPermission("สาขาวิชา")) {
//         inside.push({
//             _tag: "CSidebarNavItem",
//             name: "สาขาวิชา",
//             to: "/inside-data/department",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }

//     if (_checkPermission("อาคาร")) {
//         inside.push({
//             _tag: "CSidebarNavItem",
//             name: "อาคาร",
//             to: "/inside-data/building",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }

//     if (_checkPermission("ห้อง")) {
//         inside.push({
//             _tag: "CSidebarNavItem",
//             name: "ห้อง",
//             to: "/inside-data/room",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("ไฟล์ปริญญานิพนธิ์")) {
//         master.push({
//             _tag: "CSidebarNavItem",
//             name: "ไฟล์ปริญญานิพนธิ์",
//             to: "/manage-thesis/thesis_file",
//             icon: <i className="c-sidebar-nav-icon fa fa-file-pdf-o" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("ประเภทปริญญานิพนธ์")) {
//         master.push({
//             _tag: "CSidebarNavItem",
//             name: "ประเภทปริญญานิพนธ์",
//             to: "/basic-data/thesis-type",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("ประเภทอาจารย์ที่ปรึกษา")) {
//         master.push({
//             _tag: "CSidebarNavItem",
//             name: "ประเภทอาจารย์ที่ปรึกษา",
//             to: "/basic-data/advisor_type",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("คำนำหน้าชื่อ")) {
//         master.push({
//             _tag: "CSidebarNavItem",
//             name: "คำนำหน้าชื่อ",
//             to: "/basic-data/prename",
//             icon: <i className="c-sidebar-nav-icon fa fa-book" />,
//             exact: false,
//         })
//     }
//     if (_checkPermission("จัดการสิทธิ์ผู้ใช้งาน")) {
//         master.push({
//             _tag: "CSidebarNavItem",
//             name: "จัดการสิทธิ์ผู้ใช้งาน",
//             to: "/basic-data/permission",
//             icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
//             exact: false,
//         })
//     }

    const navigations = []
    if (statistic.length) {
        navigations.push(
            {
                _tag: "CSidebarNavTitle",
                _children: ["ข้อมูลสถิติ"],
            },
            ...statistic,
        )
    }
    if (thesis.length) {
        navigations.push(
            {
                _tag: "CSidebarNavTitle",
                _children: ["ปริญญานิพนธ์"],
            },
            ...thesis,
        )
    }


    if (user.length) {
        navigations.push(
            {
                _tag: "CSidebarNavTitle",
                _children: ["ข้อมูลผู้ใช้งาน"],
            },
            ...user,
        )
    }
    if (inside.length) {
        navigations.push(
            {
                _tag: "CSidebarNavTitle",
                _children: ["ข้อมูลภายใน"],
            },
            ...inside,
        )
    }


    if (master.length) {
        navigations.push(
            {
                _tag: "CSidebarNavTitle",
                _children: ["ข้อมูลพื้นฐาน"],
            },
            ...master,
        )
    }
    return navigations
}

export default accessMenu