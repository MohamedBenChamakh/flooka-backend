const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.SERVER_URI,
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // Remove '/api' from the request path
            }
        })
    );
};