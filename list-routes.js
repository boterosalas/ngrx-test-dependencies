const fs = require('fs');
const axios = require('axios');
const endOfLine = require('os').EOL;
const routesFile = './src/prerender-routes.txt';


headers = {'Ocp-Apim-Subscription-Key': 'e2d3328d254d4e52a11495b223f56e86'}


const blog = `https://apimexito.azure-api.net/PD-clickam-md-apicontent/api/blog/getblogs?from=1&to=100&orderBy=RELEVANT`;

axios.get(blog, {
 headers: {
    'Content-Type': 'application/json',
     Authorization: 'Bearer ' + this.authorization,
     'Ocp-Apim-Subscription-Key': 'e2d3328d254d4e52a11495b223f56e86'
 }
}).then(res => {
  const routes = [];
  res.data.objectResponse.blogs.forEach(blog => {
    routes.push('/blog/' + blog.url);
  });
  fs.writeFileSync(routesFile, routes.join(endOfLine), 'utf8');
}).catch(e => console.log(e));
