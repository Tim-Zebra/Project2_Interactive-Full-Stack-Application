const router = require('express').Router();
const { User, Appointment, Admin } = require('../../models');
var bcrypt = require('bcrypt');
const withAuthUser = require('../../utils/auth');
const helper = require('../../utils/helpers');
// Routing end point "api/users"

// User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.password === req.body.password;

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add an appointment to the database
router.post('/createAppt', async (req, res) => {
  console.log('\x1b[36m', '\n\n----------------req BODY-------------------\n\n', req.body, '\x1b[37m');
  // Actual code
  try {
    const newAppt = await Appointment.create({
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      cost: helper.random_cost(),
      user_id: req.body.user_id,
      admin_id: req.body.admin_id
    });

    res.json(newAppt);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Update an appointment in the database


// Delete and appointment in the database




// Can re-enable if landing page changes. Currently landing pages destroys session
// router.post('/logout', (req, res) => {
//   if (req.session.user_logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
