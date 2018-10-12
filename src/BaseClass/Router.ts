import * as express from 'express'

class Router {
  private basePath: string
  private router: Router[]

  constructor(basePath: string) {
    this.basePath = basePath
  }

  public registerRouter(router: Router) {
    this.router.push(router)
  }
}

export default Router