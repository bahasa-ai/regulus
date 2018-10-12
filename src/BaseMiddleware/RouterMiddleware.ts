import * as express from 'express'

export default function RouterMiddleware(middleware: Array<express.RequestHandler | express.ErrorRequestHandler>): Function {
  return function (target: Function) {
    const handler = target.prototype.__regulusRequestHandler__ || []

    target.prototype.__regulusRequestHandler__ = [middleware, ...handler]
  }
}