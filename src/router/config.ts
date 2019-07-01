import DraftBox from '../view/DraftBox/DraftBox'
import Login from '../view/Login/Login'
export default {
    menus: [
        // 菜单相关路由
        {
            route: "/manage",
            title: "数据后台",
            icon: "shop",
            parentWrapCom: 'ManageSkeleton', // 启用父组件骨架路径 (父组件的map 在 ./index.tsx ParentWrapComMap)
            children: [
                {
                    route: "/solution",
                    title: "用户信息",
                    icon: "solution",
                    component: DraftBox,
                },
                {
                    route: "/statistics",
                    title: "用户信息",
                    icon: "solution",
                    component: DraftBox,
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