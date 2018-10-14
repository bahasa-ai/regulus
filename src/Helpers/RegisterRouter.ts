import Router from 'src/BaseClass/Router'
import * as express from 'express'

export default function(router: Router): express.Router {
  // Create express.Router for Regulus Router
  const expressRouter = express.Router()

  // Register global router handler from Router if exist
  if (router.constructor.prototype.__regulusRequestHandler__) {
    router.constructor.prototype.__regulusRequestHandler__.forEach(rrh => expressRouter.use(rrh))
  }

  // Register leaf handler from Router
  Object.keys(router.constructor.prototype).forEach(proto => {
    if (proto !== 'constructor' && proto !== '__regulusRequestHandler__') {
      const method = router.constructor.prototype[proto]
      if (method.prototype.__regulusEndpoint__) {
        expressRouter[method.prototype.__regulusRequestMethod__](`${router.basePath}${method.prototype.__regulusRequestPath__}`, method.prototype.__regulusRequestHandler__)
      }
    }
  })

  // Register child Router from Router
  expressRouter.use(router.basePath, router.router)

  return expressRouter
}