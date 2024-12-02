/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const QueryLazyImport = createFileRoute('/query')()
const ParamsLazyImport = createFileRoute('/params')()
const AnimationsLazyImport = createFileRoute('/animations')()

// Create/Update Routes

const QueryLazyRoute = QueryLazyImport.update({
  id: '/query',
  path: '/query',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/query.lazy').then((d) => d.Route))

const ParamsLazyRoute = ParamsLazyImport.update({
  id: '/params',
  path: '/params',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/params.lazy').then((d) => d.Route))

const AnimationsLazyRoute = AnimationsLazyImport.update({
  id: '/animations',
  path: '/animations',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/animations.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/animations': {
      id: '/animations'
      path: '/animations'
      fullPath: '/animations'
      preLoaderRoute: typeof AnimationsLazyImport
      parentRoute: typeof rootRoute
    }
    '/params': {
      id: '/params'
      path: '/params'
      fullPath: '/params'
      preLoaderRoute: typeof ParamsLazyImport
      parentRoute: typeof rootRoute
    }
    '/query': {
      id: '/query'
      path: '/query'
      fullPath: '/query'
      preLoaderRoute: typeof QueryLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/animations': typeof AnimationsLazyRoute
  '/params': typeof ParamsLazyRoute
  '/query': typeof QueryLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/animations': typeof AnimationsLazyRoute
  '/params': typeof ParamsLazyRoute
  '/query': typeof QueryLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/animations': typeof AnimationsLazyRoute
  '/params': typeof ParamsLazyRoute
  '/query': typeof QueryLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/animations' | '/params' | '/query'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/animations' | '/params' | '/query'
  id: '__root__' | '/' | '/animations' | '/params' | '/query'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AnimationsLazyRoute: typeof AnimationsLazyRoute
  ParamsLazyRoute: typeof ParamsLazyRoute
  QueryLazyRoute: typeof QueryLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AnimationsLazyRoute: AnimationsLazyRoute,
  ParamsLazyRoute: ParamsLazyRoute,
  QueryLazyRoute: QueryLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/animations",
        "/params",
        "/query"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/animations": {
      "filePath": "animations.lazy.tsx"
    },
    "/params": {
      "filePath": "params.lazy.tsx"
    },
    "/query": {
      "filePath": "query.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
