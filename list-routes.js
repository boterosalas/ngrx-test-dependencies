const fs = require('fs');
const axios = require('axios');
const endOfLine = require('os').EOL;
const routesFile = './src/prerender-routes.txt';

const blog = `https://apimexito.azure-api.net/PD-clickam-md-apicontent/api/blog/getblogs?from=1&to=100&orderBy=RELEVANT`;

axios.get(blog, {
 headers: {
    'Content-Type': 'application/json',
     Authorization: 'Bearer ' + this.authorization,
 }
}).then(res => {
  const routes = [];
  res.data.objectResponse.blogs.forEach(blog => {
    routes.push('/blog/' + blog.url);
  });
  fs.writeFileSync(routesFile, routes.join(endOfLine), 'utf8');
}).catch(e => console.log(e));
