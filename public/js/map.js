var pins = [];
var map = L.map("map").setView([0, 0], 2.5);
// the 2.5 sets the zoom view for us

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const newPin = async (e) => {
  map.on("click", async (e) => {
    const response = await fetch("/api/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coordinates: {"type": "Point", "coordinates": [e.latlng.lng, e.latlng.lat]},
          // TODO: user_id needs login functionality
        //   user_id: req.session.user_id,
        }),
      }).then((response) => response.json())
    //   if (!response.ok) {
    //     alert("Failed to create a new pin.");
    //   }
      console.log(response)
    var pin = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    console.log([e.latlng.lng, e.latlng.lat])
    pin.id = response.id;
    pins.push(pin);
    pin.bindPopup(
                "<b>Enter text for pin:</b><br><textarea id='pin-text'></textarea><br><button id='save-button'>Save</button>"
              );
    console.log(pin);
    pin.bindPopup("<a href='/pin/" + pin.id + "'>View Trip</a>");
    pin.openPopup();
    
  });
};
newPin();
// TODO: 

const fetchPins = async () => {
  const response = await fetch("/api/pin", {
    method: "GET",
    headers: { "Content-Type": "application/json" },

  }).then((response) => response.json())

  for(var i = 0; i < response.length; i++){
    console.log(response[i])
    if(response[i]){
        console.log(response[i].coordinates.coordinates)
        // response[i].coordinates
        let marker = L.marker([response[i].coordinates.coordinates[1], response[i].coordinates.coordinates[0]]).addTo(map);
        marker.bindPopup("<a href='/pin/" + response[i].id + "'>View Trip</a>");
        pins.push(marker);
    }
  }


};
fetchPins();

// const newPin = async (e) => {
//     map.on("click", function (e) {
//       var pin = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//       var timestamp = new Date().getTime();
//       pin.id = timestamp;
//       pins.push(pin);
//       console.log(pin)
//       pin.bindPopup(
//         "<b>Enter text for pin:</b><br><textarea id='pin-text'></textarea><br><button id='save-button'>Save</button>"
//       );
//       console.log()
//       pin.openPopup();
//       pin.on("popupopen", () => {
//               document
//                   .querySelector("#save-button")
//                   .addEventListener("click", async () => {
//                       var pinText = document.querySelector("#pin-text").value;
//                       pin.setPopupContent(
//                           "<b>Pin Text:</b><br>" +
//                           pinText +
//                           "<br><a href='/pin/" + pin.id + "'>View Trip</a>"
//                       );
//                       pin.closePopup();

//                       const response = await fetch("/api/pin", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({
//                           coordinates: [e.latlng.lng, e.latlng.lat],
//                           user_id: req.session.user_id,
//                           id: pin.id,
//                         }),
//                       });
//                       if (!response.ok) {
//                         alert("Failed to create a new pin.");
//                       }
//                   });
//           });
//     });
//   };

// const findAllPins = async () => {
//   const response = await fetch("/api/pin/");
//   if (response.ok) {
//     const pins = await response.json();
//     return pins;
//   } else {
//     throw new Error("Failed to fetch pins.");
//   }
// };

// findAllPins();
// var pins = [];
// var map = L.map("map").setView([51.505, -0.09], 13);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);
// map.on("click", function (e) {
//   var pin = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//   pins.push(pin);

//   pin.bindPopup(
//     "<b>Enter text for pin:</b><br><textarea id='pin-text'></textarea><br><button id='save-button'>Save</button>"
//   );
//   pin.openPopup();

//   document.querySelector("#save-button").addEventListener("click", function () {
//     var pinText = document.querySelector("#pin-text").value;
//     pin.setPopupContent(
//       `<b>Pin Text:</b><br>${pinText}<br><a href='/trip'>View Journal</a>`
//     );
//     pin.closePopup();
//   });
// });

// function map() {}
// map();
