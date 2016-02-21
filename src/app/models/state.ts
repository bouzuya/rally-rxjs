import { SignIn } from '../models/sign-in';
import { StampRally } from '../models/stamp-rally';
import { Token } from '../models/token';

type State = {
  currentPage: string;
  signIn: SignIn;
  stampRallies: StampRally[];
  token: Token;
};

export { State };