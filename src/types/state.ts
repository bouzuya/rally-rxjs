import { SignIn } from '../types/sign-in';
import { Spot } from '../types/spot';
import { SpotForm } from '../types/spot-form';
import { StampRally } from '../types/stamp-rally';
import { StampRallyForm } from '../types/stamp-rally-form';
import { Token } from '../types/token';

type State = {
  googleApiKey: string;
  currentPage: string;
  signIn: SignIn;
  spots: Spot[];
  spotForm: SpotForm;
  stampRallies: StampRally[];
  stampRally: StampRally;
  stampRallyForm: StampRallyForm;
  token: Token;
};

export { State };
