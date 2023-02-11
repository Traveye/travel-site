// const newPin = async () => {
//   var pins = [];
//   var map = L.map("map").setView([51.505, -0.09], 13);

//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   map.on("click", function (e) {
//     var pin = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//     pins.push(pin);

//     pin.bindPopup(
//       "<b>Enter text for pin:</b><br><textarea id='pin-text'></textarea><br><button id='save-button'>Save</button>"
//     );
//     pin.openPopup();
//     pin.on("popupopen", function () {
//       document
//         .querySelector("#save-button")
//         .addEventListener("click", async () => {
//           var pinText = document.querySelector("#pin-text").value;
//           pin.setPopupContent(
//             "<b>Pin Text:</b><br>" +
//               pinText +
//               "<br><a href='/pin'>View Trip</a>"
//           );
//           pin.closePopup();

//           const response = await fetch("/api/pin", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               coordinates: coordinates,
//               text: pinText,
//             }),
//           });
//           if (!response.ok) {
//             alert("Failed to create a new pin.");
//           }
//         });
//     });
//   });
// };

// newPin();

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
// const pin = async () => {

// };
