import React, {useEffect, useRef} from 'react';
import {TCity, TPlaceCard} from '../../utils/types.ts';
import {Icon, layerGroup, Marker} from 'leaflet';
import useMap from '../../hooks/use-map.tsx';
import 'leaflet/dist/leaflet.css';
import {useAppSelector} from '../../store/hooks.ts';
import {Actions} from '../../utils/const.ts';

type MapProps = {
  city: TCity;
  places: TPlaceCard[];
};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

export const Map: React.FC<MapProps> = (props: MapProps) => {
  const {city, places} = props;

  const selectedPlaceId = useAppSelector((state) => state[Actions.Offer].activeOffer);

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      places.forEach((place: TPlaceCard) => {
        const marker = new Marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        });

        marker
          .setIcon(
            selectedPlaceId !== undefined && place.id === selectedPlaceId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, places, selectedPlaceId]);

  return <div style={{height: '100%'}} ref={mapRef} data-testid='map-test'></div>;
};
