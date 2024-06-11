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
// const ret = require("dotenv").config();

export default function MapComponent() {
  let coords = localStorage
    .getItem("coordinate")
    .split(",")
    .map((i) => Number(i));
  const defCoordinates = [21.227263680022283, 45.74687634106235];
  let OMSformatCoordinates = coords ?? fromLonLat(defCoordinates);

  // async function requestStreetToCoordinates() {
  //   try {
  //     const response = await axios.get(
  //       "https://geocode.maps.co/search?street=555+5th+Ave&city=New+York&state=NY&postalcode=10017&country=US&api_key="
  //     );
  //     let coordinates = [
  //       Number(response.data[0].lon),
  //       Number(response.data[0].lat),
  //     ];
  //     let OMSformatCoordinates = fromLonLat(coordinates);
  //     console.log(coordinates);
  //     console.log(OMSformatCoordinates);

  //     return OMSformatCoordinates;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

    const modify = new Modify({
      hitDetection: vectorLayer,
      source: vectorSource,
    });
    modify.on(["modifystart", "modifyend"], function (evt) {
      document.body.style.cursor =
        evt.type === "modifystart" ? "grabbing" : "pointer";

      if (evt.type === "modifyend") {
        const userCoords = toLonLat(evt.mapBrowserEvent.coordinate);
        console.log(
          `https://geocode.maps.co/reverse?lat=${userCoords[1]}&lon=${
            userCoords[0]
          }&api_key=${import.meta.env.VITE_GC_API_KEY}`
        );
        console.log(
          `https://www.google.com/maps/dir//${userCoords[1]},${userCoords[0]}/@${userCoords[1]},${userCoords[0]},20z?hl=ro&entry=ttu`
        );

        // https://www.google.com/maps/dir//45.7494975,21.2413614/@45.7494151,21.2413245,20z?hl=ro&entry=ttu

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
      console.log(evt.mapBrowserEvent);
    });
    const overlaySource = modify.getOverlay().getSource();
    overlaySource.on(["addfeature", "removefeature"], function (evt) {
      document.body.style.cursor =
        evt.type === "addfeature" ? "pointer" : "auto";
    });

    map.addInteraction(modify);

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
