const router = require("express").Router();
const { User, Pin, Trip, Journal } = require("../models/index");
const withAuth = require("../utils/auth");


router.get("/", (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  const data = {
    logo: {
      imagePath: "/images/dropin.PNG",
      imageAlt: "Drop In logo",
    },
    bgImage: "/images/loginbg-2.png",
    showNav: false,
  };

  res.render("login", data);
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id,
            },
          });
        const data = {
            logo: {
                imagePath: "/images/dropin.PNG",
                imageAlt: "Drop In logo" 
            },
            showNav: true,
            loggedIn: req.session.loggedIn,
            display_name: userData.display_name,
        }; 
      
        res.render("dashboard", data);
      } catch (err) {
        res.status(500).json(err);
      };
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
                {
                  model: User,
                }
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
                notes: pin.trips[i].notes,
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
                     const contentObj = {
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
            pin,
            showNav: true,
            display_name: pin.user.display_name,
            logo: {
                imagePath: "/images/dropin.PNG",
                imageAlt: "Drop In logo" 
            }   
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
