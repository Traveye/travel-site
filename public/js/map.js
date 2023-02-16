var pins = [];

var map = L.map("map", {
  minZoom: 3,
  maxZoom: 12,
});



L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// search bar 
var geocoder = L.Control.geocoder({
  position: "topleft",
  placeholder: "Search for location",
  showResultIcons: true,
  collapsed: true,
  className: "search-control",
}).on("markgeocode", async (event) => {
  // once destination is selected the post route is fetched
  const response = await fetch("/api/pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coordinates: {
        type: "Point",
        coordinates: [event.geocode.center.lng, event.geocode.center.lat],
      },
      location_name: event.geocode.name,
    }),
  }).then((response) => {
    return response.json();
  });
  // the coordinates for the placed marker    
  var marker = L.marker(event.geocode.center).addTo(map);
  marker.id = response.id;
  marker
    .bindPopup(
        // gives location name to pin and when pin is clicked you will get a link to that pins trip
      `<b>Location Name:</b> ${event.geocode.name}<br/><a href='/pin/${marker.id}'>View Trip</a>`
    )
    .openPopup();
  pins.push(marker);
});

geocoder.addTo(map);

const newPin = async (e) => {
  map.on("click", async (e) => {
    // sweet alert modal
    const { value: location } = await Swal.fire({
      // timer set to 4secs
      timer: 4000,
      timerProgressBar: true,
      //  saying if the  mouse is  hovering over modal then stop time
      //  if it leaves modal start timer and when time ends close modal
      didOpen: (time) => {
        time.addEventListener("mouseenter", Swal.stopTimer);
        time.addEventListener("mouseleave", Swal.resumeTimer);
      },
      input: "text",
      icon: "question",
      inputLabel: "Enter your location name!",
      inputPlaceholder: "Location name here",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    // fetch request to post the new pin in data base
    const response = await fetch("/api/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coordinates: {
          type: "Point",
          coordinates: [e.latlng.lng, e.latlng.lat],
        },
        location_name: location,
      }),
    }).then((response) => {
      return response.json();
    });
    // pin is dynamically marking  once name is saved
    var pin = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    pin.id = response.id;
    pins.push(pin);
    pin.bindPopup(
        // when pin is click on you will get name and link to that pins trip journal
      `<b>Location Name:</b> ${location}<br/><a href='/pin/${pin.id}'>View Trip</a>`
    );
    pin.openPopup();
    document.location.replace("/");
  });
};

newPin();

const fetchPins = async () => {
// fetch a get request for all pins 
  const response = await fetch("/api/pin", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());

  // looping through the repose and setting a pin/marker for each response index location
  if(response.length > 0){
  for (var i = 0; i < response.length; i++) {
    console.log(response[i]);
    if (response[i]) {
      console.log(response[i].coordinates.coordinates);
      let marker = L.marker([
        response[i].coordinates.coordinates[1],
        response[i].coordinates.coordinates[0],
      ]).addTo(map);
    //   each pin with have the location name and link to pin id trip page 
      marker.bindPopup(`<b>Location Name:</b> ${response[i].location_name}<br/><a href='/pin/${response[i].id}'>View Trip</a>`);
      pins.push(marker);response[i].id
    }
  }

  var group = new L.featureGroup(pins);

  map.fitBounds(group.getBounds().pad(Math.sqrt(2) / 2));
} else {
    // if there are no pins then the map will zoom out to show the whole world
    map.setView([0, 0], 3);
}
};
fetchPins();
