import { State } from '../property-type/state';

export default function initializer(params: any): Promise<State> {
  // `Promise.reject` is type error
  return new Promise((_, reject) => {
    const error: any = new Error('redirect');
    error.status = 302;
    error.path = '/sign_in?redirect_to=/stamp_rallies/' + params['id'];
    reject(error);
  });
};
