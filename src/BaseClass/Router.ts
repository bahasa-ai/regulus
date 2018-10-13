import * as express from 'express'
import registerRouterHelper from '../Helpers/RegisterRouter'

class Router {
  private _basePath: string
  private _router: express.Router

  constructor(basePath: string) {
    this.basePath = basePath
  }

  public get basePath(): string {
    return this._basePath
  }
  public set basePath(value: string) {
    this._basePath = value
  }

  public get router(): express.Router {
    return this._router
  }
  public set router(value: express.Router) {
    this._router = value
  }

  public registerRouter(router: Router) {
    this._router.use(registerRouterHelper(router))
  }
}

export default Router