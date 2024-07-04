let map;
let service;
let infowindow;
let markers = [];
let autocomplete;

function initMap() {
  const initialLocation = new google.maps.LatLng(-27.4698, 153.0251);

  const mapStyle = new google.maps.StyledMapType(
    [
      // your map style goes here
    ]
  );

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

  autocomplete.addListener('place_changed', function () {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    map.setCenter(place.geometry.location);
    searchNearby(place.geometry.location);
  });

  searchNearby(initialLocation);
  document.querySelector('.current-location').addEventListener('click', useCurrentLocation);
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

function handleSearchResults(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    const storeList = document.getElementById('store-list');
    storeList.innerHTML = '';
    clearMarkers();
    results.forEach((result, index) => {
      if (result.name.indexOf("SkinKandy") !== -1) {
        getPlaceDetails(result.place_id, index);
      }
    });
  }
}

function getPlaceDetails(placeId, index) {
  const request = {
    placeId: placeId,
    fields: ['name', 'geometry', 'opening_hours', 'website', 'vicinity']
  };

  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarker(place, index);
      addToList(place, index);
    }
  });
}

function createMarker(place, index) {
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(createMapContent(place));
    infowindow.open(map, marker);
  });
}

function createMapContent(place) {
  let content = `<h6>${place.name}</h6> <p>${place.vicinity}</p> <span class="status">${getOpenStatus(place)}</span> <a href="https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat()},${place.geometry.location.lng()}" class="direction" target="_blank">Get Directions</a>`;
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
    infowindow.setContent(createMapContent(place));
    infowindow.open(map, markers[index]);
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
  });

  listItem.marker = markers[index];
  storeList.appendChild(listItem);
}

function getOpenStatus(place) {
  return !place.opening_hours?.isOpen() ? "<span class='close'>Close</span>" : "<span class='open'>Open</span>";
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
        let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        searchNearby(pos);
        map.setCenter(pos);
      },
      () => {
        alert('Error: The Geolocation service failed.');
      }
    );
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }
}