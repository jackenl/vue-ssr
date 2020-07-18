const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

const template = fs.readFileSync(resolve('server/static/template.html'), 'utf-8')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

app.use(static(resolve('/dist')))

app.use(async ctx => {
  try {
    const context = {
      url: ctx.url
    }
    ctx.set('Content-Type', 'text/html')
    const html = await renderToString(context)
    ctx.body = html
  } catch (err) {
    console.log(err)
    if (err.code === 404) {
      ctx.throw(404, 'Page not found')
    } else {
      ctx.throw(404, 'Internal Server Error')
    }
  }
})

app.listen(8080, () => {
  console.log('server is listening in port:8080')
})
