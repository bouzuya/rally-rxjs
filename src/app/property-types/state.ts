import { SignIn } from '../property-types/sign-in';
import { Spot } from '../property-types/spot';
import { SpotForm } from '../property-types/spot-form';
import { StampRally } from '../property-types/stamp-rally';
import { StampRallyForm } from '../property-types/stamp-rally-form';
import { Token } from '../property-types/token';

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
