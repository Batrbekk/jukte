import React, { useRef, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { Map, YMaps } from "react-yandex-maps";
import { MapComponentProps } from "./types";

export const MapComponent = ({from, transfer, transfer2, transfer3, transfer4, to, getInfoMap} : MapComponentProps) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [refreshMap, setRefreshMap] = useState<boolean>(true);
  const map = useRef<any>();

  const addRoute = (ymaps: any) => {
    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [from, transfer, transfer2, transfer3, transfer4, to],
        params: {
          routingMode: "auto"
        }
      },
      {
        boundsAutoApply: true
      }
    );
    if (map.current) {
      map.current.geoObjects.add(multiRoute);
    }
    multiRoute.model.events.add('requestsuccess', function() {
      const activeRoute = multiRoute.getActiveRoute();
      if (activeRoute) {
        getInfoMap(activeRoute.properties.get("duration").text, activeRoute.properties.get("distance").text)
      }
    });
  };

  return(
    <>
      <LoadingButton
        variant="outlined"
        loading={!refreshMap}
        onClick={() => {
          setRefreshMap(false)
          setTimeout(() => {setRefreshMap(true)}, 1000)
        }}
      >
        Обновить маршрут
      </LoadingButton>
      <Button
        variant="outlined"
        onClick={() => {
          setShowMap(!showMap)
        }}
      >
        {showMap ? 'Закрыть маршрут' : 'Показать маршрут'}
      </Button>
      <div className={showMap ? 'rounded' : 'hidden'}>
        {refreshMap ? (
          <YMaps query={{apikey: '0fb09044-5132-48a3-8653-02425b40b298', load: "package.full"}} >
            <Map onLoad={addRoute} instanceRef={(instance) => { map.current = instance; }} defaultState={{
              center: [51.128207, 71.430420],
              zoom: 8,
              controls: ['zoomControl']
            }} style={{width: '100%', height: '300px'}}>
            </Map>
          </YMaps>
        ) : (
          <Skeleton variant="rectangular" width={380} height={300} />
        )}
      </div>
    </>
  )
}
