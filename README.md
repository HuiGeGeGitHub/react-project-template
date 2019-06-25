根据create-react-app衍生的React项目通用模板，方便项目初始化主要引入Typescript, Redux, React-router, Hook, Sass(样式分离), ant.design

## 项目基础结构
```
    README.md
    node_modules/
    package.json
    package-lock.json
    public/
        index.html
        favicon.ico
        manifest.json
    src/
        App.scss
        App.js
        index.css
        index.ts
        setupProxy.js (设置本地代理)
    view/
        DraftBox/
            DraftBox.scss
            DraftBox.tsx
        ...其他页面同理
    components/
        DraftBox/
            DraftBox.scss
            DraftBox.tsx
        ...其他页面同理
        Global/
            NoData/
                NoData.scss
                NoData.tsx
    router/
        config.ts
        index.ts
    redux/
        DraftBox/
           action.ts
           reducer.ts
           type.ts
        ...其他页面同理
        store.ts
```
