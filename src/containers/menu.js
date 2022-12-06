
const accessMenu = ({ PERMISSIONS}) => {
    const user = []
    const news = []
    const master = []

//    

if (1) {
    user.push({
        _tag: "CSidebarNavItem",
        name: "จัดการข้อมูลบุคลากร",
        to: "/manage-users/view",
        icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
        exact: false,
    })
}
if (1) {
    user.push({
        _tag: "CSidebarNavItem",
        name: "จัดการแผนก",
        to: "/course/view",
        icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
        exact: false,
    })
}
if (1) {
    user.push({
        _tag: "CSidebarNavItem",
        name: "คำนำหน้า",
        to: "/prefix/view",
        icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
        exact: false,
    })
}

    if (1) {
        news.push({
            _tag: "CSidebarNavItem",
            name: "ข่าวประชาสัมพันธ์",
            to: "/news/view",
            icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
            exact: false,
        })
    }
    const navigations = []

    if (1) {
        navigations.push(
            {
                _tag: "CSidebarNavTitle",
                _children: ["หน้าแรก"],
            },
            ...news,
        )
    }
    if (1) {
        navigations.push(
            {
                _tag: "CSidebarNavTitle",
                _children: ["จัดการข้อมูล"],
            },
            ...user,
        )
    }
    return navigations
}

export default accessMenu