import { VTree } from '../../framework/view';
import { create as clickSpotMarker } from '../action/view/click-spot-marker';

type SpotMarker = { lat: number; lng: number; id: number; };
type Map = any;
type S = {
  markers: SpotMarker[];
};

class MapView {
  type: string; // virtual-dom Widget
  private state: S;
  private e: any; // emitter
  private map: any; // google.maps.Map;
  private markers: any[]; // google.maps.Marker[];

  constructor(state: S, helpers: any) {
    this.type = 'Widget';
    this.state = state;
    this.markers = [];
    this.e = helpers.e;
  }

  init(): Element {
    console.log('MapView: init');
    const element = document.createElement('div');
    element.style.width = '300px';
    element.style.height = '300px';
    const maps = this.maps();
    const center = this.getBounds(maps, this.state).getCenter().toJSON();
    const mapOptions = this.mapOptions(center, maps);
    this.map = new maps.Map(element, mapOptions);
    this.state.markers.forEach(i => {
      const marker = this.buildMarker(i, this.map, maps, this.e);
      this.markers.push(marker);
    });
    return element;
  }

  update(previous: MapView, element: Element): void {
    console.log('MapView: update');
    this.map = this.map || previous.map;
    previous.markers.forEach(marker => marker.setMap(null));
    const maps = this.maps();
    this.map.fitBounds(this.getBounds(maps, this.state));
    this.state.markers.forEach(i => {
      const marker = this.buildMarker(i, this.map, maps, this.e);
      this.markers.push(marker);
    });
  }

  destroy(node: Element): void {
    // do nothing
  }

  private buildMarker(spot: SpotMarker, map: any, maps: any, e: any) {
    const { lat, lng, id } = spot;
    const position = { lat, lng };
    const marker = new maps.Marker({ position, map });
    marker.addListener('click', () => e(clickSpotMarker(id)));
    return marker;
  }

  private maps(): any {
    return (<any>window).google.maps;
  }

  private getBounds(maps: any, state: S) {
    const bounds = new maps.LatLngBounds();
    state.markers.forEach(i => {
      const { lat, lng } = i;
      bounds.extend(new maps.LatLng({ lat, lng }));
    });
    return bounds;
  }

  private mapOptions(center: any, maps: any): any {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference?hl=ja#MapOptions
    return {
      // backgroundColor: string,
      center: center,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      draggable: true,
      // draggableCursor: string,
      // draggingCursor: string,
      fullscreenControl: false,
      // fullscreenControlOptions: object,
      // heading: number,
      keyboardShortcuts: false,
      mapMaker: true,
      mapTypeControl: false,
      // mapTypeControlOptions: object,
      mapTypeId: maps.MapTypeId.ROADMAP,
      // maxZoom: number,
      // minZoom: number,
      // noClear: boolean,
      overviewMapControl: false,
      // overviewMapControlOptions: object,
      panControl: false,
      // panControlOptions: object,
      rotateControl: false,
      // rotateControlOptions: object,
      scaleControl: false,
      // scaleControlOptions: object,
      scrollwheel: false,
      signInControl: false,
      // streetView: object,
      streetViewControl: false,
      // streetViewControlOptions: object,
      // styles: [],
      // tilt: number,
      zoom: 8,
      zoomControl: false,
      // zoomControlOptions: object
    };
  }
}

const view = (state: S, helpers: any): VTree => {
  return new MapView(state, helpers);
};

export { view };
