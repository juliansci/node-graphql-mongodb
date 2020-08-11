const connectDB = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  getCourses: async () => {
    let db;
    let courses = [];
    try {
      db = await connectDB();
      courses = await db.collection('courses').find().toArray();
    } catch (err) {
      errorHandler(err);
    }

    return courses;
  },
  getCourse: async (root, { id }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection('courses').findOne({ _id: ObjectID(id) });
    } catch (err) {
      errorHandler(err);
    }
    return course;
  },
  getPeople: async () => {
    let db;
    let students = [];
    try {
      db = await connectDB();
      students = await db.collection('students').find().toArray();
    } catch (err) {
      errorHandler(err);
    }
    return students;
  },
  getPerson: async (root, { id }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection('students').findOne({ _id: ObjectID(id) });
    } catch (err) {
      errorHandler(err);
    }
    return student;
  },
};