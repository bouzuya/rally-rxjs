import { Route } from '../property-type/route';

const routes: Route[] = [
  { path: '/', name: 'root#index' },
  { path: '/sign_in', name: 'sign_in#index' },
  { path: '/stamp_rallies', name: 'stamp_rallies#index' },
  { path: '/stamp_rallies/:id', name: 'stamp_rallies#show' }
];

export { routes };
