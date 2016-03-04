import { O, A } from './o-a';

type Init = (action$: O<A<any>>, options: InitOptions) => O<A<any>>;
type InitOptions = { re: (action: A<any>) => void; };

export { Init, InitOptions };
