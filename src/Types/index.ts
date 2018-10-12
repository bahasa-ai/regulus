import * as express from 'express'

export type HandlerArray = (express.RequestHandler[] | express.RequestHandler)[]

export type RequestHandlerMethod = () => { original: express.RequestHandler, handler: HandlerArray }

export type Config = {
  port: number,
  use?: express.RequestHandler[],
  router?: express.Router[],
  errorHandler?: express.ErrorRequestHandler[]
}