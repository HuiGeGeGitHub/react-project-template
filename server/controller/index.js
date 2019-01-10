let axios = require("axios");
module.exports = {
    list: async (ctx, next) => {
        let { query } = ctx.request,
            url = "movieOnInfoList",
            params = {
                token: '',
            }
        // if(query.page !== "0") {
        //     url = "moreComingList";
        //     params.movieIds = encodeURIComponent(query.movieIds)
        // }
        console.log(query, url);
        let p = await axios({
            method: "get",
            url: `http://m.maoyan.com/ajax/${url}`,
            params
        })
        ctx.response.body = p.data;
        ctx.response.status = 200;
    }
};
