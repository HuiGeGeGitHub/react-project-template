const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    // 本地代理
    app.use(
        createProxyMiddleware("/api", {
            target: "http://192.168.0.44:6773/",
            changeOrigin: true,
        })
    )
}
