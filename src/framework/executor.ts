import { A } from './o-a';

type Executor = {
  after: (context: any) => any;
  before: (context: any) => any;
  execute: (context: any) => (action: A<any>) => A<any>;
};

export { Executor };
