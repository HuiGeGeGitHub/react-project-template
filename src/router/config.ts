import DraftBox from '../view/DraftBox/DraftBox'
export default {
    menus: [
        // 菜单相关路由
        {
            key: "/app",
            title: "草稿箱",
            icon: "file-text",
            component: DraftBox,
        },
    ],
    others: [] // 非菜单相关路由
}