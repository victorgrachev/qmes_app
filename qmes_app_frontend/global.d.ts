declare global {
  type RootInjector = typeof import('./src/app/App').injector;
}

export {};
