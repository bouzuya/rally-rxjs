import { A, O, Observable } from '../framework/o-a';
import { DOM } from '../framework/dom';

import { create as addSpotAction } from './actions/add-spot';
import { create as addStampRallyAction } from './actions/add-stamp-rally';
import { create as changeEmailAction } from './actions/change-email';
import { create as changePasswordAction } from './actions/change-password';
import { create as changeSpotFormNameAction } from './actions/change-spot-form-name';
import { create as changeStampRallyFormNameAction }
from './actions/change-stamp-rally-form-name';
import { create as goTo } from './actions/go-to';
import { create as signInAction } from './actions/sign-in';

// TODO: move to views/
export default function domAction(dom: DOM): O<A<any>> {
  const changeAction$ = (
    selector: string, create: (value: string) => A<{ value: string }>
  ) => {
    return dom
      .on(selector, 'change')
      .map(({ target }) => {
        const value = (<any> target).value;
        return create(value);
      });
  };
  const addSpotAction$ = dom
    .on('form.spot button.add-spot', 'click')
    .map((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      return addSpotAction();
    });
  const addStampRallyAction$ = dom
    .on('form.stamp-rally button.add-stamp-rally', 'click')
    .map((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      return addStampRallyAction();
    });
  const clickAnchorAction$ = dom
    .on('a', 'click')
    .map((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      const path: string = (<any> event.target).getAttribute('href');
      return goTo(path);
    });
  const changeEmailAction$ = changeAction$(
    'input.email', changeEmailAction
  );
  const changePasswordAction$ = changeAction$(
    'input.password', changePasswordAction
  );
  const changeSpotFormNameAction$ = changeAction$(
    'form.spot input.name', changeSpotFormNameAction
  );
  const changeStampRallyFormNameAction$ = changeAction$(
    'form.stamp-rally input.name', changeStampRallyFormNameAction
  );
  const signInAction$ = dom
    .on('button.sign-in', 'click')
    .map(() => signInAction());
  return Observable
    .merge(
      addSpotAction$,
      addStampRallyAction$,
      clickAnchorAction$,
      changeEmailAction$,
      changePasswordAction$,
      changeSpotFormNameAction$,
      changeStampRallyFormNameAction$,
      signInAction$
    )
    .share();
};
