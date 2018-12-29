const router = require('koa-router')();
const Controller = require('../controller/index')
router.get('/api/list', Controller.list);
module.exports = router;
