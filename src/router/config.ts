import Login from '../view/Login/Login'
import Index from '../view/Index/Index'
export default {
    menus: [
        // 菜单相关路由
        {
            route: "/manage",
            title: "管理后台",
            icon: "shop",
            parentWrapCom: 'ManageSkeleton', // 启用父组件骨架路径 (父组件的map 在 ./index.tsx ParentWrapComMap)
            children: [
                {
                    route: "/solution",
                    title: "租户信息",
                    icon: "solution",
                    component: Index,
                },
            ]
        },
    ],
    others: [// 非menu菜单相关路由
        {
            route: "/",
            children: [
                {
                    route: "/login",
                    title: "登录...",
                    component: Login,
                },
            ]
        },
    ],
}