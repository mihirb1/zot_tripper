import React, { useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  Polyline,
} from '@react-google-maps/api';
import Card from './Card';

const defaultText = `515 E Peltason Dr -> 101 Gabrielino Dr -> 51 Schubert Ct -> 53 Schubert Ct -> 99 Schubert Ct -> 81 Schubert Ct -> 109 Schubert Ct -> 103 Schubert Ct -> 55 Schubert Ct -> 57 Schubert Ct -> 63 Schubert Ct -> 75 Schubert Ct -> 135 Schubert Ct -> 139 Schubert Ct -> 123 Schubert Ct -> 14 Russell Ct -> 10 Russell Ct -> 8 Russell Ct -> 12 Russell Ct -> 3 Russell Ct -> 1 Russell Ct -> 6 Russell Ct -> 4 Russell Ct -> 2 Russell Ct -> 137 Schubert Ct -> 2 Schubert Ct -> 127 Schubert Ct -> 42 Schubert Ct -> 46 Schubert Ct -> 44 Schubert Ct -> 48 Schubert Ct -> 97 Schubert Ct -> 93 Schubert Ct -> 95 Schubert Ct -> 49 Schubert Ct -> 401 Gabrielino Dr -> 201 Gabrielino Dr -> 1101 Gabrielino Dr -> 1001 Gabrielino Dr -> 901 Gabrielino Dr -> 801 Gabrielino Dr -> 701 Gabrielino Dr -> 601 Gabrielino Dr -> 1 Murasaki St -> 3 Murasaki St -> 5 Murasaki St -> 2 Murasaki St -> 4 Murasaki St -> 6 Murasaki St -> 8 Murasaki St -> 10 Murasaki St -> 12 Murasaki St -> 14 Murasaki St -> 16 Murasaki St -> 18 Murasaki St -> 20 Murasaki St -> 22 Murasaki St -> 24 Murasaki St -> 23 Murasaki St -> 21 Murasaki St -> 19 Murasaki St -> 17 Murasaki St -> 2 Twain -> 4 Twain -> 4 Fuertes -> 2 Fuertes -> 6 Fuertes -> 10 Fuertes -> 8 Fuertes -> 11 Fuertes -> 14 Fuertes -> 25 Murasaki St -> 27 Murasaki St -> 29 Murasaki St -> 31 Murasaki St -> 18 Fuertes -> 20 Fuertes -> 16 Fuertes -> 17 Fuertes -> 15 Fuertes -> 16 Frost -> 18 Frost -> 32 Twain -> 11 Frost -> 9 Frost -> 15 Frost -> 12 Frost -> 9 Fuertes -> 10 Frost -> 8 Frost -> 6 Frost -> 7 Fuertes -> 5 Fuertes -> 8 Twain -> 10 Twain -> 7 Twain -> 35 Gabrielino Dr -> 41 Gabrielino Dr -> 39 Gabrielino Dr -> 37 Gabrielino Dr -> 5 Twain -> 3 Twain -> 1 Twain -> 11 Murasaki St -> 9 Murasaki St -> 7 Murasaki St -> 40 Gabrielino Dr -> 38 Gabrielino Dr -> 34 Gabrielino Dr -> 26 Gabrielino Dr -> 5 Gabrielino Dr -> 12 Owen Ct -> 8 Owen Ct -> 10 Owen Ct -> 6 Owen Ct -> 2 Owen Ct -> 4 Owen Ct -> 1 Owen Ct -> 3 Owen Ct -> 5 Owen Ct -> 7 Owen Ct -> 9 Owen Ct -> 11 Owen Ct -> 15 Owen Ct -> 18 Virgil Ct -> 15 Virgil Ct -> 14 Zola Ct -> 15 Zola Ct -> 12 Zola Ct -> 9 Zola Ct -> 11 Zola Ct -> 5 Zola Ct -> 7 Zola Ct -> 40 Urey Ct -> 30 Urey Ct -> 74 Whitman Ct -> 76 Whitman Ct -> 75 Whitman Ct -> 72 Whitman Ct -> 77 Whitman Ct -> 81 Whitman Ct -> 25 Whistler Ct -> 26 Whistler Ct -> 22 Whistler Ct -> 24 Whistler Ct -> 18 Whistler Ct -> 20 Whistler Ct -> 14 Whistler Ct -> 16 Whistler Ct -> 10 Whistler Ct -> 5 Whistler Ct -> 7 Whistler Ct -> 12 Whistler Ct -> 8 Whistler Ct -> 26 McClintock Ct -> 22 McClintock Ct -> 14 McClintock Ct -> 18 McClintock Ct -> 10 McClintock Ct -> 12 Joyce Ct -> 14 Joyce Ct -> 16 Joyce Ct -> 18 Joyce Ct -> 18 Handel Ct -> 16 Handel Ct -> 14 Handel Ct -> 12 Handel Ct -> 12 Eliot Ct -> 16 Eliot Ct -> 14 Eliot Ct -> 32 Harvey Ct -> 23 Harvey Ct -> 25 Harvey Ct -> 27 Harvey Ct -> 21 Harvey Ct -> 20 Harvey Ct -> 22 Harvey Ct -> 18 Harvey Ct -> 17 Harvey Ct -> 15 Harvey Ct -> 16 Harvey Ct -> 14 Harvey Ct -> 30 Los Trancos Dr -> 28 Los Trancos Dr -> 26 Los Trancos Dr -> 24 Los Trancos Dr -> 2 Gibbs Ct -> 4 Gibbs Ct -> 7 Gibbs Ct -> 9 Gibbs Ct -> 6 Gibbs Ct -> 8 Gibbs Ct -> 10 Gibbs Ct -> 14 Gibbs Ct -> 12 Gibbs Ct -> 18 Gibbs Ct -> 16 Gibbs Ct -> 20 Gibbs Ct -> 22 Gibbs Ct -> 28 Urey Ct -> 24 Young -> 22 Young -> 26 Young -> 28 Young -> 24 Harvey Ct -> 26 Harvey Ct -> 28 Harvey Ct -> 20 Whitman Ct -> 17 Whitman Ct -> 16 Whitman Ct -> 15 Whitman Ct -> 18 Whitman Ct -> 60 Whitman Ct -> 68 Whitman Ct -> 67 Whitman Ct -> 69 Whitman Ct -> 70 Whitman Ct -> 73 Whitman Ct -> 71 Whitman Ct -> 3 Zola Ct -> 1 Zola Ct -> 2 Zola Ct -> 4 Zola Ct -> 6 Zola Ct -> 8 Zola Ct -> 10 Zola Ct -> 11 Virgil Ct -> 16 Virgil Ct -> 14 Virgil Ct -> 12 Virgil Ct -> 6 Virgil Ct -> 8 Virgil Ct -> 4 Virgil Ct -> 10 Virgil Ct -> 9 Virgil Ct -> 7 Virgil Ct -> 5 Virgil Ct -> 3 Virgil Ct -> 1 Virgil Ct -> 2 Virgil Ct -> 6 Urey Ct -> 4 Urey Ct -> 2 Urey Ct -> 24 Newton Ct -> 22 Newton Ct -> 18 Newton Ct -> 20 Newton Ct -> 14 Newton Ct -> 16 Newton Ct -> 12 Newton Ct -> 24 Dickens Ct -> 22 Dickens Ct -> 20 Dickens Ct -> 17 Dickens Ct -> 15 Dickens Ct -> 19 Dickens Ct -> 16 Dickens Ct -> 18 Dickens Ct -> 14 Dickens Ct -> 12 Dickens Ct -> 4 Dickens Ct -> 6 Dickens Ct -> 8 Dickens Ct -> 2 Dickens Ct -> 11 Dickens Ct -> 1 Dickens Ct -> 3 Dickens Ct -> 5 Dickens Ct -> 9 Dickens Ct -> 7 Dickens Ct -> 10 Dickens Ct -> 8 Curie Ct -> 14 Blake Ct -> 10 Blake Ct -> 12 Blake Ct -> 8 Blake Ct -> 4 Blake Ct -> 6 Blake Ct -> 2 Blake Ct -> 1 Alcott Ct -> 3 Alcott Ct -> 5 Alcott Ct -> 7 Alcott Ct -> 12 Curie Ct -> 14 Curie Ct -> 16 Curie Ct -> 18 Curie Ct -> 20 Curie Ct -> 22 Alcott Ct -> 20 Alcott Ct -> 24 Alcott Ct -> 9 Alcott Ct -> 18 Alcott Ct -> 16 Alcott Ct -> 14 Alcott Ct -> 12 Alcott Ct -> 10 Alcott Ct -> 8 Alcott Ct -> 2 Alcott Ct -> 4 Alcott Ct -> 6 Alcott Ct -> 18 Mendel Ct -> 20 Mendel Ct -> 26 Mendel Ct -> 24 Mendel Ct -> 22 Mendel Ct -> 20 Perkins Ct -> 22 Perkins Ct -> 24 Perkins Ct -> 26 Perkins Ct -> 28 Perkins Ct -> 30 Perkins Ct -> 6 Perkins Ct -> 8 Perkins Ct -> 10 Perkins Ct -> 14 Perkins Ct -> 18 Perkins Ct -> 16 Perkins Ct -> 6 Thompson Ct -> 4 Thompson Ct -> 2 Thompson Ct -> 8 Thompson Ct -> 5 Russell Ct -> 7 Russell Ct -> 9 Russell Ct -> 11 Russell Ct -> 12 Thompson Ct -> 10 Thompson Ct -> 18 Thompson Ct -> 16 Thompson Ct -> 14 Thompson Ct -> 26 Russell Ct -> 22 Russell Ct -> 24 Russell Ct -> 20 Russell Ct -> 16 Russell Ct -> 133 Schubert Ct -> 129 Schubert Ct -> 125 Schubert Ct -> 117 Schubert Ct -> 131 Schubert Ct -> 119 Schubert Ct -> 107 Schubert Ct -> 61 Schubert Ct -> 105 Schubert Ct -> 115 Schubert Ct -> 101 Schubert Ct -> 91 Schubert Ct -> 89 Schubert Ct -> 83 Schubert Ct -> 87 Schubert Ct -> 525 E Peltason Dr -> 519 E Peltason Dr -> 515 E Peltason Dr`

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
    let finalText = ""
    if (routeText === "") {
      finalText = defaultText
    }
    else {
      finalText = routeText
    }
    const addressOrder = finalText
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
          placeholder={defaultText}
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
