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

import Regulus from './Regulus'
import _Router from './BaseClass/Router'
import _HandlerMiddleware from './BaseMiddleware/HandlerMiddleware'
import _RouterMiddleware from './BaseMiddleware/RouterMiddleware'
import * as HttpHandler from './Decorator/RequestHandler'

export const Router = _Router

export const HandlerMiddleware = _HandlerMiddleware

export const RouterMiddleware = _RouterMiddleware

export const GET = HttpHandler.HttpGET

export const POST = HttpHandler.HttpPOST

export const PATCH = HttpHandler.HttpPATCH

export const PUT = HttpHandler.HttpPUT

export const DELETE = HttpHandler.HttpDELETE

export default Regulus