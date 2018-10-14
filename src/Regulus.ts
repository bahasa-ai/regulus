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

  constructor(config: Config) {
    this._server = express()
    this._config = {...defaultConfig, ...config}

    this._config.use.forEach(u => this._server.use(u))
    this.extractRouter(this._config.router).forEach(u => this._server.use(u))
    this._config.errorHandler.forEach(u => this._server.use(u))
  }

  private extractRouter(routers: RegulusRouter[]): express.Router[] {
    return routers.map(router => registerRouter(router))
  }

  public async start(callback?: Function) {
    return this._server.listen(this._config.port, callback)
  }
}

export default Regulus