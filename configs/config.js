require('dotenv').config();
module.exports = {
    SOCKET_PORT: process.env.PORT,
    MEDIA_DB_NAME: process.env.MEDIA_DB_NAME,
    SOKCET_EMIT_TREND: process.env.SOKCET_EMIT_TREND,
}