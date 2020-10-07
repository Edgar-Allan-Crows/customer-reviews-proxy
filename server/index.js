const express = require('express');
const app = express();
const port = 3000;
const { createProxyMiddleware } = require('http-proxy-middleware');

// // Debugging
// app.use((req, res, next) => {
//   console.log(`The method is: ${req.method}. The url is: ${req.url}`);
//   next();
// });

app.use(express.static(__dirname + '/../dist'));

// Redirect product image http requests here
app.use('/gallery/:product_id/:metal/:cut/:carat', createProxyMiddleware({ target: 'http://127.0.0.1:3030/', changeOrigin: true }));

// Redirect customer reviews http requests here
app.use('/api/reviews', createProxyMiddleware({ target: 'http://127.0.0.1:3004/', changeOrigin: true }));
app.use('/api/totalScore', createProxyMiddleware({ target: 'http://127.0.0.1:3004/', changeOrigin: true }));
app.use('/api/reviewCount', createProxyMiddleware({ target: 'http://127.0.0.1:3004/', changeOrigin: true }));

app.listen(port, () => {
  console.log(`Proxy server listening on port http://localhost:${port}`);
});