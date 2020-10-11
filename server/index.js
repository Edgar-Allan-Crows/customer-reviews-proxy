const express = require('express');
const app = express();
const port = 3005;
const { createProxyMiddleware } = require('http-proxy-middleware');

// // Debugging
// app.use((req, res, next) => {
//   console.log(`The method is: ${req.method}. The url is: ${req.url}`);
//   next();
// });

app.use(express.static(__dirname + '/../dist'));

// Redirect product image http requests here
app.use('/gallery/:product_id/:metal/:cut/:carat', createProxyMiddleware({ target: 'http://18.216.180.46:3030/', changeOrigin: true }));

// Redirect customer reviews http requests here
app.use('/:product_id', createProxyMiddleware({ target: 'http://34.228.73.56:3000/', changeOrigin: true }));
app.use('/api/totalScore/:product_id', createProxyMiddleware({ target: 'http://34.228.73.56:3000/', changeOrigin: true }));
app.use('/api/reviewCount/:product_id', createProxyMiddleware({ target: 'http://34.228.73.56:3000/', changeOrigin: true }));

app.listen(port, () => {
  console.log(`Proxy server listening on port http://34.228.73.56:${port}`);
});
