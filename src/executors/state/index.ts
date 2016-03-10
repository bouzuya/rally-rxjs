// load state from window.INITIAL_STATE -> set state to options.state

import { A } from 'b-o-a';

export default function init() {
  const after = (context: any): any => context;

  const before = (context: any): any => {
    const state: any = (<any> window).INITIAL_STATE;
    return Object.assign({}, context, { state });
  };

  const execute = (context: any) => (action: A<any>) => action;

  return { after, before, execute };
}
