let map;
let service;
let infowindow;
let markers = [];
let autocomplete;

function initMap() {
  const initialLocation = new google.maps.LatLng(-27.4698, 153.0251);
  const mapStyle = new google.maps.StyledMapType (
    [
      {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff00e7"
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
                "color": "#ec078f"
            }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0097"
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
      zoom: 8,
      mapId: "DEMO_MAP_ID"
  });

  map.mapTypes.set("styled_map", mapStyle);
  map.setMapTypeId("styled_map");

  infowindow = new google.maps.InfoWindow();
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));

  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
  
      const place = autocomplete.getPlace();
      if (!place.geometry) {
          window.alert("No details available for input: '" + place.name + "'");
          return;
      }

      map.setCenter(place.geometry.location);
      searchNearby(place.geometry.location);
  });

  searchNearby(initialLocation);
}

function searchNearby(location) {
  const request = {
      location: location,
      radius: '50000',
      name: 'SkinKandy',
      bounds: map.getBounds()
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, handleSearchResults);
}

function handleSearchResults(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
      const storeList = document.getElementById('store-list');
      storeList.innerHTML = '';

      clearMarkers();

      for (let i = 0; i < results.length; i++) {

          if (results[i].name.indexOf("SkinKandy") !== -1) {
            createMarker(results[i], i);
            addToList(results[i], i);
          }
          
      }
  }
}

function createMarker(place, index) {
  const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: place.geometry.location,
      title: place.name
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(createMapContent(place));
      infowindow.open(map, marker);
  });
}

function createMapContent(place) {
  return `<h6>${place.name}</h6> <p>${place.vicinity}</p> <span class="status">${getOpenStatus(place)}</span> <a href="https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat()},${place.geometry.location.lng()}" class="direction" target="_blank">Get Directions</a>`;
}

function addToList(place, index) {
  const storeList = document.getElementById('store-list');
  const listItem = document.createElement('div');
  
  listItem.innerHTML = createMapContent(place);
  listItem.classList.add("list-item");
  listItem.addEventListener('click', () => {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
      infowindow.setContent(createMapContent(place));
      infowindow.open(map, markers[index]);
  });
  storeList.appendChild(listItem);
}

function getOpenStatus(place) {
  return !place.opening_hours.isOpen ? "<span class='close'>Close</span>" : "<span class='open'>Open</span>"
}


function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
  }
  markers = [];
}

function useCurrentLocation() {
  alert("TEST")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Geolocation position:", position);

        const pos = new google.maps.LatLng(37.09024, -95.712891);
        console.log("Google Maps LatLng position:", pos);

        if (pos) {
          map.setCenter(pos);

          const request = {
            location: pos,
            radius: '5000',
            name: 'SkinKandy'
          };

          const service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, handleSearchResults);
        } else {
          console.error("Position is null");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        handleLocationError(true, infowindow, map.getCenter());
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}