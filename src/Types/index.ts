import * as express from 'express'
import Router from '../BaseClass/Router'

export type Config = {
  port: number,
  use?: express.RequestHandler[],
  router?: Router[],
  errorHandler?: (express.ErrorRequestHandler | express.RequestHandler)[]
}