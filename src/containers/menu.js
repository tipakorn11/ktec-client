const accessMenu = ({ PERMISSIONS }) => {
  const user = [];
  const news = [];
  const master = [];

  //
  const _checkPermission = (data) => {
    const permission = PERMISSIONS.find(
      (item) => item.menu_name === data && item.permission_view == 1
    );
    if (permission !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  if (_checkPermission("จัดการข้อมูลบุคลากร")) {
    user.push({
      _tag: "CSidebarNavItem",
      name: "จัดการข้อมูลบุคลากร",
      to: "/manage-users/view",
      icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
      exact: false,
    });
  }
  if (_checkPermission("จัดการแผนก")) {
    user.push({
      _tag: "CSidebarNavItem",
      name: "จัดการแผนก",
      to: "/course/view",
      icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
      exact: false,
    });
  }
  if (_checkPermission("คำนำหน้า")) {
    master.push({
      _tag: "CSidebarNavItem",
      name: "คำนำหน้า",
      to: "/prefix/view",
      icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
      exact: false,
    });
  }
 
  if (_checkPermission("จัดการสิทธ์เข้าใช้งาน")) {
    master.push({
      _tag: "CSidebarNavItem",
      name: "จัดการสิทธ์เข้าใช้งาน",
      to: "/manage-permission/view",
      icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
      exact: false,
    });
  }

  if (_checkPermission("ข่าวประชาสัมพันธ์")) {
    news.push({
      _tag: "CSidebarNavItem",
      name: "ข่าวประชาสัมพันธ์",
      to: "/news/view",
      icon: <i className="c-sidebar-nav-icon fa fa-desktop" />,
      exact: false,
    });
  }
  const navigations = [];

  if (news.length) {
    navigations.push(
      {
        _tag: "CSidebarNavTitle",
        _children: ["หน้าแรก"],
      },
      ...news
    );
  }
  
  if (user.length) {
    navigations.push(
      {
        _tag: "CSidebarNavTitle",
        _children: ["จัดการข้อมูล"],
      },
      ...user
    );
  }
  
  if (master.length) {
    navigations.push(
      {
        _tag: "CSidebarNavTitle",
        _children: ["จัดการข้อมูลพื้นฐาน"],
      },
      ...master
    );
  }
  return navigations;
};

export default accessMenu;
