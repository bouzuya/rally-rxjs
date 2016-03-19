import { State } from '../types/state';
import { view as mapView } from '../views/map';
import { view as spotFormView } from '../views/spot-form';

const view = (state: State, helpers: any) => {
  const { create: h, e } = helpers;
  const map = {
    markers: state.spots.map(spot => {
      const { lat, lng, id } = spot;
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        id: parseInt(id, 10)
      };
    })
  };

  return h('div.stamp-rally-show-page', [
    (
      state.stampRally
        ? h('h1', [state.stampRally.name])
        : h('h1', ['loading...'])
    ),
    mapView(map, helpers),
    h('ul', state.spots.map(spot => {
      return h('li', [
        spot.id,
        spot.name,
        spot.tagline
      ]);
    })),
    spotFormView(state.spotForm, helpers)
  ]);
};

export { view };
