import * as express from 'express'

export type Config = {
  port: number,
  use?: express.RequestHandler[],
  router?: express.Router[],
  errorHandler?: express.ErrorRequestHandler[]
}