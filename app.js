'use strict';

const os = require('os');
const Agenda = require("agenda");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PostModel = require('./m_Posts');
const { SOCKET_PORT, MEDIA_DB_NAME } = require('./configs/config');
const { currentDate, substractSevenDays } = require('./utils/format_date');
const { trendPost } = require('./utils/aggregatw.methods');

/*Agenda configuration */
const agenda = new Agenda({ db: { address: MEDIA_DB_NAME } });
agenda.name(os.hostname + "-" + process.pid);
/*Agenda configuration */

async function sendingTrendingPost() {
    io.on('connection', async (socket) => {
        const query = await trendPost(currentDate(), substractSevenDays());
        const data = await PostModel.aggregate(query).allowDiskUse(true);

        if (data.length <= 0) {
            socket.emit('trend_post', {
                message: 'No hay publiaciones con tendencia'
            });
            return;
        }
        socket.emit('trend_post', data);
    });
}

agenda.define("send_trend_post", async (job) => {
    console.log(job)
    await sendingTrendingPost();
});

(async function () {
    await agenda.start();
    await agenda.every("1 minutes", "send_trend_post");
})();

http.listen(SOCKET_PORT, () => {
    console.log('Server is running on port: ' + SOCKET_PORT);
});