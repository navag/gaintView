const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');

const Student = require("../models/student");

router.get("/",(req, res, next) => {
  Student.find()
    .select("_id name rollNo degree city admDate")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        students: docs.map(doc => {
          return {
            name: doc.name,
            rollNo: doc.rollNo,  
            degree: doc.degree,
            city: doc.city,
            admDate: doc.admDate,
            _id: doc._id,
          };
        })
      };
        if (docs.length >= 0) {
      res.status(200).json(response);
        } else {
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
    console.log(req.body,"post")
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    rollNo: req.body.rollNo,
    degree: req.body.degree,
    city: req.body.city,
    admDate: req.body.admDate,
  });
  student
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Student added successfully."
      });
    })
    .catch(err => {
      console.log(err,"105");
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  console.log(id);
  Student.findById(id)
    .select('_id name rollNo degree city admDate')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            stdent: doc
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  console.log(req.body);
  Student.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Student updated.'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  Student.findById(id)
  .exec()
  .then(doc => {
    console.log(doc);
    if (doc) {
      Student.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Student deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
    } else {
     res.status(404).json({
        message:"student not found."
      });
    }
  });
  
});

module.exports = router;
