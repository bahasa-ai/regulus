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