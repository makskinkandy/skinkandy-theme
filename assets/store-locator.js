let map;
let service;
let infowindow;
let markers = [];
let autocomplete;
let userLocation;
let searchCenter;
let autocompleteMarker = null; // Variable to keep track of the autocomplete marker
const initialLocation = { lat: -27.4698, lng: 153.0251 }; // Brisbane coordinates

function initMap() {
  const initialLocation = new google.maps.LatLng(-27.4698, 153.0251);

  const mapStyle = new google.maps.StyledMapType (
    [
      {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#000"
            },
            {
                "saturation": 7
            },
            {
                "lightness": 19
            },
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-3"
            }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000"
            }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#000"
            },
            {
                "saturation": "-80"
            },
            {
                "lightness": "-1"
            },
            {
                "visibility": "simplified"
            }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "-53"
            },
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#a78ba7"
            },
            {
                "lightness": "40"
            }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": 31
            },
            {
                "visibility": "simplified"
            },
            {
                "color": "#efc6df"
            }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f39247"
            },
            {
                "saturation": "0"
            },
            {
                "visibility": "simplified"
            }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "saturation": -93
            },
            {
                "lightness": 31
            },
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": "4.00"
            },
            {
                "saturation": "-91"
            }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": "1"
            },
            {
                "lightness": "1"
            },
            {
                "gamma": "1.00"
            },
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": "10"
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": "1"
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "weight": "10.00"
            },
            {
                "visibility": "on"
            },
            {
                "lightness": "-2"
            }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "0"
            },
            {
                "lightness": "10"
            }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#d684d3"
            },
            {
                "saturation": "0"
            }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bbc0c4"
            },
            {
                "saturation": -93
            },
            {
                "lightness": -2
            },
            {
                "visibility": "simplified"
            }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#007fff"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "14"
            },
            {
                "visibility": "simplified"
            }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": 10
            },
            {
                "lightness": 69
            },
            {
                "visibility": "on"
            }
        ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#007fff"
              },
              {
                  "saturation": "-100"
              },
              {
                  "lightness": "100"
              },
              {
                  "visibility": "simplified"
              }
          ]
      }
  ]
  )
  
  map = new google.maps.Map(document.getElementById('map'), {
      center: initialLocation,
      zoom: 10,
      mapId: "DEMO_MAP_ID",
      
  });

  map.mapTypes.set("styled_map", mapStyle);
  map.setMapTypeId("styled_map");

  infowindow = new google.maps.InfoWindow();
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));

  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace();
    map.setZoom(10);
  
    if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }
    
    searchCenter = place.geometry.location;
    map.setCenter(place.geometry.location);
    autocompleteMarkerLoc(place.geometry.location)

    searchNearby(place.geometry.location);
  });

  map.addListener('dragend', function() {
    searchNearby(map.getBounds().getCenter());
    autocompleteMarkerLoc(map.getBounds().getCenter())
  });
  
  useCurrentLocation();
}

function autocompleteMarkerLoc(location) {
  // Remove the previous autocomplete marker
  if (autocompleteMarker) {
      autocompleteMarker.setMap(null);
  }

  // Add a new marker for the selected place
  autocompleteMarker = new google.maps.Marker({
    map: map,
    position: location
  });
}

function searchNearby(location) {
  const request = {
      location: location,
      radius: '50000',
      name: 'SkinKandy'
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, handleSearchResults);

}

function searchNearby(location) {
  const request = {
      location: location,
      radius: '50000',
      name: 'SkinKandy'
  };

    searchCenter = location;

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, handleSearchResults);
}

function handleSearchResults(results, status) {
    const storeList = document.getElementById('store-list');
    clearMarkers();
    storeList.innerHTML = '';
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        
        let filteredResults = results.filter(result => result.name.indexOf("SkinKandy") !== -1);

        // Calculate the distance to each store and sort by distance
        filteredResults.forEach(result => {
            result.distance = google.maps.geometry.spherical.computeDistanceBetween(searchCenter, result.geometry.location);
        });

        filteredResults.sort((a, b) => a.distance - b.distance);

        filteredResults.forEach((result, index) => {
            getPlaceDetails(result.place_id, index);
        });
    } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        const listItem = document.createElement('div');
        listItem.innerHTML = '<p>No Store found in this area</p>'
        storeList.appendChild(listItem);
    } else {
        clearMarkers();
        alert('Error fetching nearby stores: ' + status);
    }
}
function createMarker(place) {
    const iconImage = document.createElement("img");
  
    iconImage.src =
    "https://cdn.shopify.com/s/files/1/0555/7508/5194/files/MapPin_1.png";
  
    iconImage.width = 30;
    
    const marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: place.geometry.location,
        title: place.name,
        content: iconImage
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(createPinContent(place));
        infowindow.open(map, marker);
    });

    return marker;
}

function createMapContent(place) {
  
  const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(searchCenter, place.geometry.location);
  const distanceInKm = (distanceInMeters / 1000).toFixed(2);
  let content = `<h6>${place.name} <span class="distance"><img src="https://cdn.shopify.com/s/files/1/0555/7508/5194/files/MapPin_1.png" width="10"> ${distanceInKm}km</span></h6> <p>${place.vicinity}</p>`;
  content += `<span class="status">${getOpenStatus(place)}</span> <a href="https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat()},${place.geometry.location.lng()}" class="direction" target="_blank">Get Directions</a>`
  
  if (place.website) {
    content += `<a href="${place.website}" class="website-link" target="_blank">Visit Website</a>`;
  }
  
  return content;
}

function createPinContent(place) {
  
  const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(searchCenter, place.geometry.location);
  const distanceInKm = (distanceInMeters / 1000).toFixed(2);
  let content = `<h6>${place.name}</h6> <p>${place.vicinity}</p>`;
  content += `<p class="distance"><img src="https://cdn.shopify.com/s/files/1/0555/7508/5194/files/MapPin_1.png" width="8"> ${distanceInKm}km</p>`
  content += `<span class="status">${getOpenStatus(place)}</span> <a href="https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat()},${place.geometry.location.lng()}" class="direction" target="_blank">Get Directions</a>`
  
  if (place.website) {
    content += `<a href="${place.website}" class="website-link" target="_blank">Visit Website</a>`;
  }
  
  return content;
}

function addToList(place, index) {
  const storeList = document.getElementById('store-list');
  const listItem = document.createElement('div');
  listItem.innerHTML = createMapContent(place);
  listItem.classList.add("list-item");

  listItem.addEventListener('click', () => {
    map.setCenter(place.geometry.location);
    map.setZoom(13);
    infowindow.setContent(createPinContent(place));
    infowindow.open(map, index);
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
  });
  
  storeList.appendChild(listItem);
}

function getOpenStatus(place) {
  return !place.opening_hours.isOpen ? "<span class='close'>Close</span>" : "<span class='open'>Open</span>"
}

function getPlaceDetails(placeId, index) {
    const request = {
        placeId: placeId,
        fields: ['name', 'geometry', 'opening_hours', 'website', 'vicinity']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const marker = createMarker(place);
            addToList(place, marker);
        }
    });
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
  }
  markers = [];
}

function useCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          autocompleteMarkerLoc(userLocation)
          map.setCenter(userLocation);
          searchNearby(userLocation);
        },
        (error) => {
          autocompleteMarkerLoc(initialLocation)
          map.setCenter(initialLocation);
          searchNearby(initialLocation);
        }
    );
  } else {
    // Fallback to initial location
    alert('Geolocation is not supported by this browser.');
    map.setCenter(initialLocation);
    searchNearby(initialLocation);
  }
}

function getAllTheList() {
  markers.forEach((marker, index) => {
    addToList(marker, index)
  });
}