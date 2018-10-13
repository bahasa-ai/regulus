import Router from 'src/BaseClass/Router'
import * as express from 'express'

export default function(router: Router): express.Router {
  // Create express.Router for Regulus Router
  const expressRouter = express.Router()

  // Register global router handler from Router
  expressRouter.use(router.constructor.prototype.__regulusRequestHandler__)

  // Register leaf handler from Router
  router.constructor.prototype.forEach(method => {
    if (method.prototype.__regulusEndpoint__) {
      expressRouter[method.prototype.__regulusRequestMethod__](`${router.basePath}${method.prototype.__regulusRequestPath__}`, method.prototype.__regulusRequestHandler__)
    }
  })

  // Register child Router from Router
  expressRouter.use(router.basePath, router.router)

  return expressRouter
}