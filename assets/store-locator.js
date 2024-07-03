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
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f5f5f2"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#71c8d4"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#e5e8e7"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "color": "#8ba129"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c7c7c7"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#a0d3d3"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "color": "#91b65d"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "gamma": 1.51
                }
            ]
        },
        {
            "featureType": "road.local",
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
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road"
        },
        {
            "featureType": "road"
        },
        {},
        {
            "featureType": "road.highway"
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

    map.addListener('bounds_changed', function() {
      searchNearby(map.getBounds().getCenter());
    });


    searchAllStores();
}



function searchAllStores() {
    const request = {
        query: 'SkinKandy'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, handleSearchResults);
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
        infowindow.setContent(place.name + '<br>' + getOpenStatus(place));
        infowindow.open(map, marker);
    });
}

function addToList(place, index) {
    const storeList = document.getElementById('store-list');
    const listItem = document.createElement('div');
    listItem.innerHTML = `${index + 1}. ${place.name}<br>${getOpenStatus(place)}`;
    listItem.style.cursor = 'pointer';
    listItem.addEventListener('click', () => {
        map.setCenter(place.geometry.location);
        map.setZoom(10);
        infowindow.setContent(place.name + '<br>' + getOpenStatus(place));
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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(userLocation);
            searchNearby(userLocation);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}