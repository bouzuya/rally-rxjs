import { routes } from '../routes/';

import rootIndex from '../inits/root-index';
import signInIndex from '../inits/sign-in-index';
import stampRalliesIndex from '../inits/stamp-rallies-index';
import stampRalliesShow from '../inits/stamp-rallies-show';

const handlers: { [k:string]: (params: any) => Promise<any>; } = {
  'root#index': rootIndex,
  'sign_in#index': signInIndex,
  'stamp_rallies#index': stampRalliesIndex,
  'stamp_rallies#show': stampRalliesShow
};

const inits: any = routes.map(({ path, name }) => {
  const init = handlers[name];
  if (!init) throw new Error('handler is null');
  return { path, init };
});

export { inits };
