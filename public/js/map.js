var pins = [];

var map = L.map('map', {
    minZoom: 3,
    maxZoom: 10
});

// the 2.5 sets the zoom view for us

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var geocoder = L.Control.geocoder({
  position: "topleft",
  placeholder: "Search for location",
  showResultIcons: true,
  collapsed: true,
  className: "search-control",
}).on("markgeocode", async (event) => {
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
  var marker = L.marker(event.geocode.center).addTo(map);
  marker.id = response.id;
  marker
    .bindPopup(
      `<b>Location Name:</b> ${event.geocode.name}<br/><a href='/pin/${marker.id}'>View Trip</a>`
    )
    .openPopup();
  pins.push(marker);
});

geocoder.addTo(map);

const newPin = async (e) => {
  map.on("click", async (e) => {
    const { value: location } = await Swal.fire({
      input: "text",
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
    var pin = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    pin.id = response.id;
    pins.push(pin);
    pin.bindPopup(
      `<b>Location Name:</b> ${location}<br/><a href='/pin/${pin.id}'>View Trip</a>`
    );
    pin.openPopup();
    document.location.replace("/");
  });
};

newPin();

const fetchPins = async () => {
  const response = await fetch("/api/pin", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());

  for (var i = 0; i < response.length; i++) {
    console.log(response[i]);
    if (response[i]) {
      console.log(response[i].coordinates.coordinates);
      // response[i].coordinates
      let marker = L.marker([
        response[i].coordinates.coordinates[1],
        response[i].coordinates.coordinates[0],
      ]).addTo(map);
      marker.bindPopup("<a href='/pin/" + response[i].id + "'>View Trip</a>");
      pins.push(marker);
    }
  }

  var group = new L.featureGroup(pins);

  map.fitBounds(group.getBounds().pad(Math.sqrt(2) / 2));
};
fetchPins();
