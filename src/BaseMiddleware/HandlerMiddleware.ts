import * as express from 'express'

export default function HandlerMiddelware(middleware: Array<express.RequestHandler | express.ErrorRequestHandler>): Function {
  return function (_, __, descriptor: TypedPropertyDescriptor<express.RequestHandler>) {
    const handler = descriptor.value.prototype.__regulusRequestHandler__ || []

    descriptor.value.prototype.__regulusRequestHandler__ = [middleware, ...handler]

    return descriptor
  }
}