import { Observable } from 'rxjs';
import { Action } from '../framework/action';
import { DOM } from '../framework/dom';

import addSpotAction from './actions/add-spot';
import addStampRallyAction from './actions/add-stamp-rally';
import changeEmailAction from './actions/change-email';
import changePasswordAction from './actions/change-password';
import changeSpotFormNameAction from './actions/change-spot-form-name';
import
 changeStampRallyFormNameAction
from './actions/change-stamp-rally-form-name';
import goTo from './actions/go-to';
import signInAction from './actions/sign-in';

// TODO: move to views/
export default function domAction(dom: DOM): Observable<Action<any>> {
  const changeAction$ = (
    selector: string, create: (value: string) => Action<{ value: string }>
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
