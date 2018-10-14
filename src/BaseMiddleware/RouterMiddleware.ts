import * as express from 'express'

export default function RouterMiddleware(middleware: Array<express.RequestHandler | express.ErrorRequestHandler>): Function {
  return function (target: Function) {
    if (typeof target !== 'function') {
      throw 'Cannot use RouterMiddleware on method handler. Use HandlerMiddleware instead'
    }

    const handler = target.prototype.__regulusRequestHandler__ || []

    target.prototype.__regulusRequestHandler__ = [middleware, ...handler]
  }
}