import * as express from 'express'

function RequestHandlerMiddelware(method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'ANY', path: string): Function {
  return function (_, __, descriptor: TypedPropertyDescriptor<express.RequestHandler>) {
    const handler = descriptor.value.prototype.__regulusRequestHandler__ || []

    descriptor.value.prototype.__regulusRequestHandler__ = [descriptor.value, ...handler]
    descriptor.value.prototype.__regulusRequestPath__ = path
    descriptor.value.prototype.__regulusRequestMethod__ = method

    return descriptor
  }
}

export const HttpGET    = (path: string) => RequestHandlerMiddelware('GET', path)
export const HttpPOST   = (path: string) => RequestHandlerMiddelware('POST', path)
export const HttpPATCH  = (path: string) => RequestHandlerMiddelware('PATCH', path)
export const HttpPUT    = (path: string) => RequestHandlerMiddelware('PUT', path)
export const HttpDELETE = (path: string) => RequestHandlerMiddelware('DELETE', path)
export const HttpANY    = (path: string) => RequestHandlerMiddelware('ANY', path)
