const database = require('../models/database');
const bcrypt = require('bcrypt');

module.exports = {
// Handle GET request to the main page
getMainPage: function (req, res) {
res.render('requestForm');
},

// Handle GET request to the Skyward form page
getSkywardForm: function (req, res) {
res.render('skywardForm');
},

// Handle POST request to the Skyward form page
postSkywardForm: function (req, res) {
  // Validate user input
  const { head_date, head_name, head_signature, head_campus_department, head_campus_dept_num, firstName, middleInitial, lastName, userId, accessRequested, otherAccessRequested, notes, additions, deletions, justification, screenId, approved, approvalSignature, userIdAssigned, completedSignature, officeDate } = req.body;
  const errors = [];
  if (!firstName) {
    errors.push('First name is required');
  }
  if (!lastName) {
    errors.push('Last name is required');
  }
  if (!userId) {
    errors.push('User ID is required');
  }
  if (errors.length > 0) {
    res.render('skywardForm', { errors });
  } else {
    // Encrypt user input
    const saltRounds = 10;
    bcrypt.hash(userId, saltRounds, function (err, hash) {
      if (err) throw err;
      // Save user input to database
      const db = database.getDB();
      let accessReq = accessRequested;
      if (otherAccessRequested) {
        accessReq.push(otherAccessRequested);
      }
      const values = [
        hash,
        firstName,
        middleInitial,
        lastName,
        JSON.stringify(accessReq),
        head_date,
        head_name,
        head_signature,
        head_campus_department,
        head_campus_dept_num,
        JSON.stringify(additions),
        JSON.stringify(deletions), // convert deletions array to a JSON string
        justification,
        screenId,
        approved,
        approvalSignature,
        userIdAssigned,
        completedSignature,
        officeDate,
        notes
      ];
      const query = 'INSERT INTO information (user_id, first_name, middle_initial, last_name, access_requested, head_date, head_name, head_signature, head_campus_department, head_campus_dept_num, additions, deletions, justification, screen_id, approved, approval_signature, user_id_assigned, completed_signature, office_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.run(query, values, function (err) {
        if (err) throw err;
        res.redirect('/confirmation');
      });
    });
  }
},




// Handle GET request to the request status page
getRequestStatus: function (req, res) {
const db = database.getDB();
const query = 'SELECT * FROM information ORDER BY id DESC LIMIT 1';
db.get(query, function (err, row) {
if (err) throw err;
if (row) {
const dateSubmitted = row.date_submitted;
const processed = true; // Assume application has been processed successfully
res.render('requestStatus', { dateSubmitted, processed });
} else {
res.render('requestStatus');
}
});
},

// Handle POST request to the save and exit button on the Skyward form page
postSaveAndExit: function (req, res) {
// Save user input to session
req.session.firstName = req.body.firstName;
req.session.middleInitial = req.body.middleInitial;
req.session.lastName = req.body.lastName;
req.session.userId = req.body.userId;
req.session.accessRequested = req.body.accessRequested;
res.redirect('/');
},

// Handle GET request to the confirmation page
getConfirmation: function (req, res) {
res.render('confirmation');
}
};