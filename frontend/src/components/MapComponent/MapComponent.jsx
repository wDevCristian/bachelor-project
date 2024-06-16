// MapComponent.js
import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import "ol/ol.css";
import { fromLonLat, toLonLat } from "ol/proj";
import axios from "axios";
import Overlay from "ol/Overlay.js";
import Point from "ol/geom/Point.js";
import { Modify } from "ol/interaction";
import { Icon, Style } from "ol/style.js";
import { OGCMapTile, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";

const DEFAULT_LATITUDE = 45.75790032199541;
const DEFAULT_LONGITUDE = 21.22901787020893;

export default function MapComponent({
  latitude = DEFAULT_LATITUDE,
  longitude = DEFAULT_LONGITUDE,
  allowMarkerMovement = false,
}) {
  const coordinates = [longitude, latitude];
  let OMSformatCoordinates = fromLonLat(coordinates);

  useEffect(() => {
    const iconFeature = new Feature({
      geometry: new Point(OMSformatCoordinates),
      name: "Timisoara",
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        width: 17.1,
        height: 25.6,
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "../src/assets/img/map-marker-icon-342x512.png",
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const map = new Map({
      target: "map",
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: OMSformatCoordinates,
        zoom: 16,
      }),
    });

    if (allowMarkerMovement) {
      const modify = new Modify({
        hitDetection: vectorLayer,
        source: vectorSource,
      });
      modify.on(["modifystart", "modifyend"], function (evt) {
        document.body.style.cursor =
          evt.type === "modifystart" ? "grabbing" : "pointer";

        if (evt.type === "modifyend") {
          const userCoords = toLonLat(evt.mapBrowserEvent.coordinate);

          localStorage.setItem(
            "coordinate",
            evt.mapBrowserEvent.coordinate.toString()
          );
          localStorage.setItem(
            "humanReadableCoords",
            `${userCoords[1]},${userCoords[0]}`
          );
          if (
            import.meta.env.VITE_GC_API_KEY !== null &&
            import.meta.env.VITE_GC_API_KEY !== undefined
          ) {
            axios
              .get(
                `https://geocode.maps.co/reverse?lat=${userCoords[1]}&lon=${
                  userCoords[0]
                }&api_key=${import.meta.env.VITE_GC_API_KEY}`
              )
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      });
      const overlaySource = modify.getOverlay().getSource();
      overlaySource.on(["addfeature", "removefeature"], function (evt) {
        document.body.style.cursor =
          evt.type === "addfeature" ? "pointer" : "auto";
      });

      map.addInteraction(modify);
    }

    return () => map.setTarget(null);
  }, []);

  return (
    <div
      style={{ height: "400px", width: "100%" }}
      id="map"
      className="map-container"
    />
  );
}
