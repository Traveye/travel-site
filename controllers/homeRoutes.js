const router = require("express").Router();
const { User, Pin, Trip, Journal } = require("../models/index");

router.get("/", (req, res) => {
  //TODO: add logic to check if user is logged in/redirect to dashboard if true
  const data = {
    logo: {
      imagePath: "/images/dropin.PNG",
      imageAlt: "Drop In logo",
    },
    showNav: false,
  };

  res.render("login", data);
});

router.get("/dashboard", (req, res) => {
    //TODO: add logic to check if user is logged in/redirect to login if false
    //TODO: add logic to get user's pins, trips, and journals to pass to handlebars
    const showNav = true;
  
    res.render("dashboard", { showNav });
  });

// :id is the pin id (when the user clicks on a pin)
router.get('/pin/:id', async (req, res) => {
    // get all pins, trips, and journals for the pin
    try {
        const tripData = await Pin.findAll({
            where: {
                id: req.params.id,
            },
            include: [
                { 
                    model: Trip,
                    include: [
                        {
                            model: Journal,
                        },
                    ],
                },
            ],
        });
        // format the data to be passed to handlebars
        const pin = tripData.map((trip) => trip.get({ plain: true }))[0];
        const formattedTrips = [];
        // create an array of trips
        for(let i = 0; i < pin.trips.length; i++) {
            const trip = {
                id: pin.trips[i].id,
                title: pin.trips[i].title,
                date_start: pin.trips[i].date_start,
                date_end: pin.trips[i].date_end,
            };
            const journals = {};
            const journalIteration = pin.trips[i].journals;
            // create an object of journals
            for(let i = 0; i < journalIteration.length; i++) {
                if(journals[journalIteration[i].label]) {
                    journals[journalIteration[i].label].push(journalIteration[i].content);
                } else {
                    journals[journalIteration[i].label] = [journalIteration[i].content];
                }
            }
            journalsFormatted = [];
            // format the journals object to be passed to handlebars
            for(const [key, value] of Object.entries(journals)) {
                const formatObj = {
                    label: key,
                    content: [],
                }
                for(item in value) {
                    contentObj = {
                        entry: value[item],
                    }
                    formatObj.content.push(contentObj);
                }
                journalsFormatted.push(formatObj);
            }
            trip.journals = journalsFormatted;
            formattedTrips.push(trip);
        }
        const trips = formattedTrips;
        res.render('pin', {
            trips,
            showNav: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
