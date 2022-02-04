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
  const routes = [
    '/',
    '/inicio',
    '/click-academy',
    '/url/id',
    '/tabla-recompensas',
    '/terminos-y-condiciones',
    '/centro-de-ayuda',
    '/centro-de-ayuda/sobre-clickam/que-es-clickam',
    '/centro-de-ayuda/sobre-clickam/como-me-puedo-registrar',
    '/centro-de-ayuda/sobre-clickam/por-cuales-medios-puedo-descargar-la-app',
    '/centro-de-ayuda/sobre-clickam/como-funciona-clickam',
    '/centro-de-ayuda/sobre-clickam/como-gano-comisiones',
    '/centro-de-ayuda/sobre-clickam/cuales-son-los-beneficios-de-un-clicker',
    '/centro-de-ayuda/sobre-clickam/cuales-son-los-negocios-asociados',
    '/centro-de-ayuda/configuraciones-de-cuenta',
    '/centro-de-ayuda/configuraciones-de-cuenta/cambios-de-tus-datos-personales',
    '/centro-de-ayuda/configuraciones-de-cuenta/restablecer-contrasena',
    '/centro-de-ayuda/comisiones',
    '/centro-de-ayuda/comisiones/que-es-la-ruta-de-compra-clickam',
    '/centro-de-ayuda/comisiones/como-cruzan-la-venta',
    '/centro-de-ayuda/comisiones/cuales-son-las-fechas-de-pago',
    '/centro-de-ayuda/comisiones/porque-no-me-llego-la-comision',
    '/centro-de-ayuda/comisiones/como-es-el-proceso-de-pago',
    '/centro-de-ayuda/comisiones/cuando-se-considera-una-compra-efectiva-por-el-negocio',
    '/centro-de-ayuda/reportes',
    '/centro-de-ayuda/reportes/donde-puedo-encontrar-un-historial-de-mis-links',
    '/centro-de-ayuda/reportes/como-veo-las-comisiones-que-he-ganado',
    '/centro-de-ayuda/reportes/como-puedo-saber-por-cuales-productos-me-pagaron-comision',
    '/centro-de-ayuda/refiere-a-un-amigo',
    '/centro-de-ayuda/refiere-a-un-amigo/que-es-el-programa-refiere-a-tu-amigo',
    '/centro-de-ayuda/refiere-a-un-amigo/como-funciona-el-programa',
    '/centro-de-ayuda/refiere-a-un-amigo/cuantos-amigos-puedo-invitar',
    '/centro-de-ayuda/ofertas',
    '/centro-de-ayuda/ofertas/donde-puedo-encontrar-las-mejores-ofertas',
    '/centro-de-ayuda/ofertas/preferencias-de-correo',
    '/centro-de-ayuda/otras-preguntas-frecuentes',
    '/centro-de-ayuda/otras-preguntas-frecuentes/quien-es-el-tomador-de-un-seguro',
    '/centro-de-ayuda/otras-preguntas-frecuentes/que-es-un-producto-marketplace',
    '/centro-de-ayuda/otras-preguntas-frecuentes/cuales-son-los-medios-de-pago-de-cada-negocio',
    '/centro-de-ayuda/contacta-los-negocios',
    '/centro-de-ayuda/contacta-los-negocios/contactos-negocios',
    '/centro-de-ayuda/contactanos',
    '/centro-de-ayuda/contactanos/donde-puedo-contactarme-si-tengo-preguntas-extras',
  ];
  res.data.objectResponse.blogs.forEach(blog => {
    routes.push('/blog/' + blog.url);
  });
  fs.writeFileSync(routesFile, routes.join(endOfLine), 'utf8');
}).catch(e => console.log(e));
