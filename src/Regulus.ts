import * as express from 'express'
import { Config } from './Types'
import RegulusRouter from './BaseClass/Router'
import registerRouter from './Helpers/RegisterRouter'

const defaultConfig: Config = {
  port: 8888,
  use: [],
  router: [],
  errorHandler: []
}

class Regulus {
  private _server: express.Application
  private _config: Config

  constructor(config) {
    this._server = express()
    this._config = {...defaultConfig, ...config}

    this._config.use.forEach(u => this._server.use(u))
    this.extractRouter(this._config.router).forEach(u => this._server.use(u))
    this._config.errorHandler.forEach(u => this._server.use(u))
  }

  private extractRouter(routers: RegulusRouter[]): express.Router[] {
    const extractedRouters = []

    // Extract every Router
    for (let i = 0; i < routers.length; i++) {
      const router = routers[i]

      const expressRouter = registerRouter(router)

      extractedRouters.push(expressRouter)
    }

    return extractedRouters
  }

  public async start(callback?: Function) {
    return this._server.listen(this._config.port, callback)
  }
}

export default Regulus