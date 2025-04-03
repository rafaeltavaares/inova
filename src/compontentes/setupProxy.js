// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://dados.tcerj.tc.br',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '',
//       },
//       secure: false, // Ignora SSL inválido (apenas para testes)
//     })
//   );
// };
