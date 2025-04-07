import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { MutableRefObject } from "react";

type MapRefSetterProps = {
    mapRef: MutableRefObject<any>;
  };

const MapRefSetter: React.FC<MapRefSetterProps> = ({ mapRef }) => {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map]);

  return null;
};

export default MapRefSetter;