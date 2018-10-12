import * as express from 'express'

export type RegulusConfig = {
  port: number,
  use?: express.RequestHandler[],
  router?: Function[],
  errorHandler?: express.ErrorRequestHandler[]
}

class Regulus {
  private _server: express.Application
  private _config: RegulusConfig

  constructor(config) {
    this._server = express()
    this._config = config
  }

  public async start(callback?: Function) {
    return this._server.listen(this._config.port, callback)
  }
}

export default Regulus