import * as express from 'express'
import { Config } from './Types'
import RegulusRouter from './BaseClass/Router'
import registerRouter from './Helpers/RegisterRouter'

class Regulus {
  private _server: express.Application
  private _config: Config

  constructor(config) {
    this._server = express()
    this._config = config

    const extractedRouter = this.extractRouter(this._config.router)

    this._server.use(...this._config.use, ...extractedRouter, ...this._config.errorHandler)
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