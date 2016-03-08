import { Route } from '../../framework/route';

const routes: Route[] = [
  { path: '/sign_in', name: 'sign_in#index' },
  { path: '/stamp_rallies', name: 'stamp_rallies#index' },
  { path: '/stamp_rallies/:id', name: 'stamp_rallies#show' }
];

export { routes };