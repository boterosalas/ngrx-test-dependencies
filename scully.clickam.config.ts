import { ScullyConfig } from '@scullyio/scully';
const { lazyImages } =  require('@notiz/scully-plugin-lazy-images');
const { MinifyHtml } = require('scully-plugin-minify-html');
import  { getFlashPreventionPlugin }  from '@scullyio/scully-plugin-flash-prevention';

const postRenderers = [MinifyHtml, lazyImages];

/** this loads the default render plugin, remove when switching to something else. */

export const config: ScullyConfig = {
  projectRoot: './src',
  defaultPostRenderers: postRenderers,
  projectName: 'clickam',
  spsModulePath: 'YOUR OWN MODULE PATH HERE',
  outDir: './dist/',
  routes: {},
  extraRoutes: [
    '/blog/que-es-clickam-y-como-ganar-dinero-online-con-la-plataforma',
    '/blog/gana-10000-adicionales-a-tu-primera-recompensa',
    '/blog/cupon-de-descuento-haceb',
    '/blog/resuelve-todas-tus-dudas-sobre-los-dias-sin-iva',
    '/blog/ahora-nunca-olvidaras-ganar-mientras-compras-nueva-extension-de-chrome',
    '/blog/certificado-bancario-en-clickam',
    '/blog/6-habilidades-de-un-vendedor-aplicadas-al-marketing-de-afiliados',
    '/blog/que-es-marketing-de-afiliados',
    '/blog/conoce-3-paginas-web-para-crear-logos-gratis',
    '/blog/marketing-de-contenidos-aplicado-al-marketing-de-afiliados',
    '/blog/seguros-exito-descuentos-y-beneficios',
    '/blog/conoce-3-paginas-web-para-crear-el-nombre-de-tu-marca',
    '/blog/eres-principiante-encuentra-las-mejores-herramientas',
    '/blog/Bono-tennis-y-mic',
  ]
};
