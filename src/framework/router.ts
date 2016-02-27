import pathToRegexp from 'path-to-regexp';
import { Path } from './types';
import { InitializerName, InitializerParameters } from './initializer';
import { RouteAction } from './route-action';

type Route = {
  path: Path;
  name: InitializerName;
};

class Router {
  private config: Route[];

  constructor(routes: Route[]) {
    this.config = routes;
  }

  routes(path: Path): RouteAction {
    const requestPath = path;
    for (var i = 0; i < this.config.length; i++) {
      const route = this.config[i];
      const { path, name } = route;
      const keys: { name: string; }[] = [];
      const match = pathToRegexp(path, keys).exec(requestPath);
      if (match) {
        const params: InitializerParameters = {};
        for (var j = 1; j < match.length; j++) {
          params[keys[j - 1].name] = match[j];
        }
        return { type: 'route', params: { name, params } };
      }
    }
    return null;
  }
}

export { Router, Route, RouteAction };