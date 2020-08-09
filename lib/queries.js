const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
  getCourses: async () => {
    let db;
    let courses = [];
    try {
      db = await connectDB();
      courses = await db.collection('courses').find().toArray();
    } catch (err) {
      console.error(err);
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
      console.error(err);
    }
    return course;
  },
  getStudents: async () => {
    let db;
    let students = [];
    try {
      db = await connectDB();
      students = await db.collection('students').find().toArray();
    } catch (err) {
      console.error(err);
    }

    return students;
  },
  getStudent: async (root, { id }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection('students').findOne({ _id: ObjectID(id) });
    } catch (err) {
      console.error(err);
    }
    return student;
  },
};