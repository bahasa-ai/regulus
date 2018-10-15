/**
 * const App = new Regulus({
 *    port: 6969,
 *    use: [
 *      bodyParser(),
 *      myLoggingFunction
 *    ],
 *    router: [
 *      new MyController(),
 *      new OthersController()
 *      new HisController(),
 *      new HerController()
 *    ],
 *    errorHandler: [
 *      myErrorHandlerFunction,
 *      (e, rq, rs, n) => console.log(e)
 *    ]
 * }).start()
 */

import * as express from 'express'
import Regulus from './Regulus'
import _Router from './BaseClass/Router'
import _Middleware from './BaseMiddleware/Middleware'
import * as HttpHandler from './Decorator/RequestHandler'

export type ExpressRequest = express.Request
export type ExpressResponse = express.Response
export type ExpressNextFunction = express.NextFunction

export const Router = _Router
export const Middleware = _Middleware
export const GET = HttpHandler.HttpGET
export const POST = HttpHandler.HttpPOST
export const PATCH = HttpHandler.HttpPATCH
export const PUT = HttpHandler.HttpPUT
export const DELETE = HttpHandler.HttpDELETE

export default Regulus