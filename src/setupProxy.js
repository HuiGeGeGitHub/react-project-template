const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy("/api", {
            target: "http://192.168.0.44:6770/",
            // target: "http://120.27.208.249:6770/",
            changeOrigin: true
        })
    );
};
