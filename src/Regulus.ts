import * as express from 'express'
import { Config } from './Types'

class Regulus {
  private _server: express.Application
  private _config: Config

  constructor(config) {
    this._server = express()
    this._config = config

    this._server.use(...this._config.use, ...this._config.router, ...this._config.errorHandler)
  }

  public async start(callback?: Function) {
    return this._server.listen(this._config.port, callback)
  }
}

export default Regulus