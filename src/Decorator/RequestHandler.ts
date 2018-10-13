import * as express from 'express'

function RequestHandlerMiddelware(method: 'get' | 'post' | 'patch' | 'put' | 'delete', path: string): Function {
  return function (_, __, descriptor: TypedPropertyDescriptor<express.RequestHandler>) {
    const handler = descriptor.value.prototype.__regulusRequestHandler__ || []

    descriptor.value.prototype.__regulusRequestHandler__ = [descriptor.value, ...handler]
    descriptor.value.prototype.__regulusRequestPath__ = path
    descriptor.value.prototype.__regulusRequestMethod__ = method
    descriptor.value.prototype.__regulusEndpoint__ = true

    return descriptor
  }
}

export const HttpGET    = (path: string) => RequestHandlerMiddelware('get', path)
export const HttpPOST   = (path: string) => RequestHandlerMiddelware('post', path)
export const HttpPATCH  = (path: string) => RequestHandlerMiddelware('patch', path)
export const HttpPUT    = (path: string) => RequestHandlerMiddelware('put', path)
export const HttpDELETE = (path: string) => RequestHandlerMiddelware('delete', path)
