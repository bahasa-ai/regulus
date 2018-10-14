import * as express from 'express'

export default function HandlerMiddelware(middleware: Array<express.RequestHandler | express.ErrorRequestHandler>): Function {
  return function (target: Object, __, descriptor: TypedPropertyDescriptor<express.RequestHandler>) {
    if (typeof target !== 'object') {
      throw 'Cannot use HandlerMiddleware on Class. Use RouterMiddleware for class instead'
    }

    const handler = descriptor.value.prototype.__regulusRequestHandler__ || []

    descriptor.value.prototype.__regulusRequestHandler__ = [middleware, ...handler]

    return descriptor
  }
}