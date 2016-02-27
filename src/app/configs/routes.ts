import { Route } from '../../framework/router';

const routes: Route[] = [
  { path: '/sign_in', type: 'sign_in#index' },
  { path: '/stamp_rallies', type: 'stamp_rallies#index' },
  { path: '/stamp_rallies/:id', type: 'stamp_rallies#show' }
];

export { routes };