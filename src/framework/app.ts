import { O, A } from './o-a';

type App = (action$: O<A<any>>, options: AppOptions) => O<A<any>>;
type AppOptions = { re: (action: A<any>) => void; };

export { App, AppOptions };
