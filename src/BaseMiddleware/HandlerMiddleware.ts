import * as express from 'express'
import { HandlerArray, RequestHandlerMethod } from 'src/Types'

export default function HandlerMiddelware(middleware: HandlerArray): Function {
  return function (target: Object, methodName: string, descriptor: TypedPropertyDescriptor<express.RequestHandler> | TypedPropertyDescriptor<RequestHandlerMethod>) {
    if (descriptor.value.prototype.__regulusRequestHandler__) {
      const requestHandler = descriptor.value as RequestHandlerMethod
      const requestHandlerValue = requestHandler()

      descriptor.value = function () {
        return {
          ...requestHandlerValue,
          handler: [middleware, ...requestHandlerValue.handler]
        }
      }
    } else {
      const originalHandler = descriptor.value

      descriptor.value = function () {
        return {
          original: originalHandler,
          handler: [middleware]
        }
      }
    }

    descriptor.value.prototype.__regulusRequestHandler__ = true

    return descriptor
  }
}