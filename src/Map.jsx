import React, { useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  Polyline,
} from '@react-google-maps/api';
import Card from './Card';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 33.6846,
  lng: -117.8265,
};

const libraries = ['places'];

function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function Map() {
  const [addressMap, setAddressMap] = useState({});
  const [locations, setLocations] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [routeText, setRouteText] = useState('');
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const autocompleteRef = useRef(null);

  // Load CSV and store a map of address -> location info
  useEffect(() => {
    fetch('Addresses_with_type.csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').slice(1);
        const map = {};
        rows.forEach((row) => {
          const [address, lat, lng, city, state, type] = row.split(',');
          if (address && lat && lng) {
            map[address.trim()] = {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              address: address.trim(),
              name: address.trim(),
              propertyType: type.trim(),
            };
          }
        });
        setAddressMap(map);
      })
      .catch((err) => console.error("CSV load error:", err));
  }, []);

  // Build ordered route from text input
  const handleUploadRouteText = () => {
    const addressOrder = routeText
      .split('->')
      .map((addr) => addr.trim())
      .filter(Boolean);

    const orderedLocations = addressOrder
      .map((addr) => addressMap[addr])
      .filter(Boolean); // remove any not found

    setLocations(orderedLocations);
  };

  // Calculate straight-line distance in order
  useEffect(() => {
    if (locations.length < 2) return;
    let distance = 0;
    for (let i = 1; i < locations.length; i++) {
      const prev = locations[i - 1];
      const curr = locations[i];
      distance += haversineDistance(prev.lat, prev.lng, curr.lat, curr.lng);
    }
    setTotalDistance(distance.toFixed(2));
  }, [locations]);

  const clearAll = () => {
    setLocations([]);
    setRouteText('');
    setTotalDistance(0);
    setSelectedMarkerIndex(null);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCDm-kHtEIsMQMo_VkGQ3pWDz_eu7S9O-0" libraries={libraries}>
      <div style={{ marginBottom: 10 }}>
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)}>
          <input
            type="text"
            placeholder="Add Location (not connected)"
            style={{ width: 300, marginRight: 10 }}
          />
        </Autocomplete>
        <button onClick={clearAll}>Clear All</button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <textarea
          rows={6}
          cols={100}
          value={routeText}
          placeholder="Paste route (e.g., A -> B -> C)"
          onChange={(e) => setRouteText(e.target.value)}
        />
        <br />
        <button onClick={handleUploadRouteText}>Draw Route</button>
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            position={loc}
            icon={{
              url:
                loc.propertyType === 'Business'
                  ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            }}
            label={{
              text: `${idx + 1}`,
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
            onClick={() => setSelectedMarkerIndex(idx)}
          />
        ))}

        {locations.length > 1 && (
          <Polyline
            path={locations}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>

      {locations.length > 1 && (
        <div style={{ marginTop: 10 }}>
          Total straight-line distance: <strong>{(totalDistance * 0.621371).toFixed(2)} miles</strong>
        </div>
      )}

      {selectedMarkerIndex !== null && locations[selectedMarkerIndex] && (
        <div style={{ marginTop: 20 }}>
          <Card {...locations[selectedMarkerIndex]} />
        </div>
      )}
    </LoadScript>
  );
}

export default Map;
