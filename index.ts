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

import Regulus from './src/Regulus'
import _Router from './src/BaseClass/Router'
import _HandlerMiddleware from './src/BaseMiddleware/HandlerMiddleware'
import _RouterMiddleware from './src/BaseMiddleware/RouterMiddleware'
import * as HttpHandler from './src/Decorator/RequestHandler'

export const Router = _Router

export const HandlerMiddleware = _HandlerMiddleware

export const RouterMiddleware = _RouterMiddleware

export const GET = HttpHandler.HttpGET

export const POST = HttpHandler.HttpPOST

export const PATCH = HttpHandler.HttpPATCH

export const PUT = HttpHandler.HttpPUT

export const DELETE = HttpHandler.HttpDELETE

export const ANY = HttpHandler.HttpANY

export default Regulus