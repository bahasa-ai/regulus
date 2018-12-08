# Regulus
Minimalist Express.js wrapper library with Typescript-style.

## Changelog
- v0.0.7
  - Fixing bug on router level middleware 
- v0.0.6
  - Merge HandlerMiddleware and RouterMiddleware into one, let you use the existing middleware on handler or router
  - Export Express Request, Response, and NextFunction type as ExpressRequest, ExpressResponse, ExpressNextFunction so you don't have to install Express for the type

## Installation
`npm i --save regulus`

Note: regulus not available for browser environment

## Motivation
We used to code express app in Typescript.

The idea comes when we found that we could take the advantage of Typescript feature, i.e Class, Decorator, to write Express app effectively and seamlessly.

## Core Concept
Regulus inherit all the Express core concept thus we assume you are familiar with the Express core concept.

We try not to implement the MVC pattern to make Regulus stay minimalist, a library not a framework.

## Usage
### Initialization
```typescript
import Regulus from 'regulus'


// initialize Regulus app with config
const App = new Regulus({
  port: 8888, // default 8888
  use: [], // array of express.Requesthandler/express.ErrorRequestHandler
  router: [], // array of class whosewhich extends Regulus.Router class
  errorHandler: [] // array of express.Requesthandler/express.ErrorRequestHandler
})

// start argument: express listen callback
App.start(() => console.log('Listen: 8888'))
```

### Contro.. Nope. We call it __'Router'__
```typescript
import { Router, GET } from 'regulus'

class MyRouter extends Router {
  constructor() {
    // base URL for this Router, you could also use Express URL pattern
    super('/myRouter')
  }

  // Request handler: GET /myRouter/ping
  @GET('ping')
  ping(req: express.Request, res: express.Response, n: express.NextFunction) {
    return res.send({ pong: 1 })
  }
}

export default MyRouter
```
MyRouter mimicking the behavior of express.Router. Don't forget to register the router to App intialization.

```typescript
import Regulus from 'regulus'

const App = new Regulus({
  port: 8888,
  use: [],
  router: [
    new MyRouter()
  ],
  errorHandler: []
})

App.start(() => console.log('Listen: 8888'))
```

After App.start, your router configuration will produce:
- GET localhost:8888/myRouter/ping

Notice the decorator @GET above the method header.

@GET is the decorator you want to use for request handler inside Router. Every method with @GET, @POST, @PATCH, @PUT, @DELETE will be transformed into express request handler and will get three express request handler parameter; Request, Response, and Next function.

Note: to use Decorator feature in Typescript make sure you enable it in your tsconfig.json configuration `experimentalDecorators: true` or flag `--experimentalDecorators`

### Nested Router
Often, you need to build nested route, Router inside Router. You could achieve this by register the child router inside the constructor of parent router.

YourRouter.ts
```typescript
import { Router, GET } from 'regulus'

class YourRouter extends Router {
  constructor() {
    super('/yourRouter')
  }

  @GET('/')
  ping(req: express.Request, res: express.Response, n: express.NextFunction) {
    return res.send({ ping: 1 })
  }
}

export default YourRouter
```

MyRouter.ts
```typescript
import { Router, GET } from 'regulus'
import YourRouter from './YourRouter'

class MyRouter extends Router {
  constructor() {
    super('/myRouter')

    this.registerRouter(new YourRouter())
  }

  @GET('ping')
  ping(req: express.Request, res: express.Response, n: express.NextFunction) {
    return res.send({ pong: 1 })
  }
}

export default MyRouter
```

This router configuration will produce the following:
- GET localhost:8888/myRouter/ping
- GET localhost:8888/myRouter/yourRouter

You don't need to register the child Router into the App initialization, only root Router needed.

You could always nested Router inside any Router.

### Decorator as an Express Middleware

We really love this feature on Typescript. But we won't explain how Decorator works in Typescript here. Refer to Typescript documentation for more about Typescript Decorator.

You see @GET Decorator earlier marking a method as an Express request handler.
@GET register the method into the express.Router. What it is actually doing is take the method function then register it to Express router inside Router class, or in a simple code...

```javascript
const router = express.Router()

router.get('/myRouter/ping', ping(req, res, n) {
  return res.send({ pong: 1 })
})
```
'Hey, that's very cool.. express router could also take an array of request handler as the argument and execute the request handler one by one from the beginning of the array til the end of the array. Can Regulus do that?'

Yes, we can. We can do it like this...
```typescript
@A()
@B()
@C()
@GET('/ping')
ping(req, res, n) {
  return res.send({ pong: 1 })
}
```

All the decorators above the method header act like an Express middleware.
```javascript
const router = express.Router()

router.get('/myRouter/ping', [
  A() {
    // do something
  },
  B() {
    // do something
  },
  C() {
    // do something
  },
  ping(req, res, n) {
    return res.send({ pong: 1 })
  }
])
```
'Very cool! How do we create custom decorator? I want to use my authentication middleware and logging middleware on it'

That's when __'Middleware'__ becomes handy. With Middleware you could write your own express middleware decorator.

```typescript
import { Router, GET, Middleware } from 'regulus'
import YourRouter from './YourRouter'

function Logging() {
  // you could pass more than one express request handler inside one decorator middleware
  return Middleware([
    (_, __, n) => {
      console.log('Logging start...')
      n()
    },
    (req, _, n) => {
      console.log(`Request: ${req.rawHeaders}`)
      n()
    }
  ])
}

class MyRouter extends Router {
  constructor() {
    super('/myRouter')

    this.registerRouter(new YourRouter)
  }

  @Logging() // make sure to execute the function
  @GET('ping')
  ping(req: express.Request, res: express.Response, n: express.NextFunction) {
    return res.send({ pong: 1 })
  }
}

export default MyRouter
```

This will produce, more less...

```javascript
const router = express.Router()

router.get('/myRouter/ping', [
  [
    (_, __, n) => {
      console.log('Logging start...')
      n()
    },
    (req, _, n) => {
      console.log(`Request: ${req.rawHeaders}`)
      n()
    }
  ],
  ping(req, res, n) {
    return res.send({ pong: 1 })
  }
])
```
Now, every time someone request /myRouter/ping, Logging middleware will be invoked.

'Awesome! Now come to my mind router scope middleware'

You could also use __'Middleware'__ for router scope middleware. Just attach it above the class header.

```typescript
import { Router, GET, Middleware } from 'regulus'
import YourRouter from './YourRouter'

...

function MyRouterLogging() {
  // you could pass more than one handler inside one decorator middleware
  return Middleware([
    (_, __, n) => {
      console.log('Logging start...')
      n()
    },
    (req, _, n) => {
      console.log(`Request: ${req.rawHeaders}`)
      n()
    }
  ])
}

@MyRouterLogging() // make sure to execute the function
class MyRouter extends Router {
  constructor() {
    super('/myRouter')

    this.registerRouter(new YourRouter)
  }

  @Logging() // make sure to execute the function
  @GET('ping')
  ping(req: express.Request, res: express.Response, n: express.NextFunction) {
    return res.send({ pong: 1 })
  }
}

export default MyRouter
```

This will produce, more less...

```javascript
const router = express.Router()

router.use([
  [
    (_, __, n) => {
      console.log('Logging start...')
      n()
    },
    (req, _, n) => {
      console.log(`Request: ${req.rawHeaders}`)
      n()
    }
  ]
])

router.get('/myRouter/ping', [
  [
    (_, __, n) => {
      console.log('Logging start...')
      n()
    },
    (req, _, n) => {
      console.log(`Request: ${req.rawHeaders}`)
      n()
    }
  ],
  ping(req, res, n) {
    return res.send({ pong: 1 })
  }
])
```

### App level middleware
For using app level middelware such as body parser, token parser, etc. You could use config 'use' in regulus config.

```typescript
import Regulus from 'regulus'
import * as bodyParser from 'body-parser'

const App = new Regulus({
  port: 8888,
  use: [
    bodyParser.json(),
    bodyParser.urlencoding({ extended: true })
  ],
  router: [
    new MyRouter()
  ],
  errorHandler: []
})

App.start(() => console.log('Listen: 8888'))
```


### Error Handling

For handling the error you could simply add express.ErrorRequestHandler or experss.RequestHandler to errorHandling in Regulus config when initialize the app.

```typescript
import Regulus from 'regulus'

const App = new Regulus({
  port: 8888,
  use: [
    bodyParser.json(),
    bodyParser.urlencoding({ extended: true })
  ],
  router: [
    new MyRouter()
  ],
  errorHandler: [
    (e, req, res, n) => {
      if (e.message === 'Unauthorized') {
        return res.status(401).send('401 Unauthorized')
      }
    },
    (req, res, n) => res.status(404).send('404 Not Found')
  ]
})

App.start(() => console.log('Listen: 8888'))
```

## License
MIT