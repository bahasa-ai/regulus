import { RequestHandler, ErrorRequestHandler } from 'express'

export default function Middleware(middleware: (RequestHandler | ErrorRequestHandler)[]) {
  return function(target: object | Function, ...args: any[]) {
    // Middleware for Router class
    if (typeof target === 'function' && args.length === 0) {
      const handler = target.prototype.__regulusRequestHandler__ || []

      target.prototype.__regulusRequestHandler__ = [middleware, ...handler]
    }
    // Middleware for Router method handler
    else if (typeof target === 'object' && args.length === 2 && typeof args[1] === 'object') {
      const descriptor = args[1]
      const handler = descriptor.value.prototype.__regulusRequestHandler__ || []

      descriptor.value.prototype.__regulusRequestHandler__ = [middleware, ...handler]

      return descriptor
    }
  }
}