const Koa = require("koa");
var cors = require('koa-cors');
const app = new Koa();
let middleware = require('./middleware');
let router = require('./router');
middleware(app);
app.use(cors({
        origin: function (ctx) {
            return "*";
        },
        allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    })
)
app.use(router.routes()).use(router.allowedMethods());

app.listen(3030,() => {
    console.log('server is running at http://localhost:3030')
});