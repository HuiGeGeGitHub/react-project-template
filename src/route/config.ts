import Home from '../view/Home/Home';
export default {
    menus: [
        // 菜单相关路由
    ],
    others: [
        {
            key: "/",
            title: "内容编辑",
            icon: "form",
            component: Home,
        },
    ] // 非菜单相关路由
};
