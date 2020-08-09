const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    };
    const newCourse = {
      ...defaults,
      ...input
    };
    try {
      const db = await connectDB();
      const course = await db.collection('courses').insertOne(newCourse);
      input._id = course.insertedId;
    } catch (error) {
      console.error(error);
    }
    return input;
  },
  createStudent: async (root, { input }) => {
    try {
      const db = await connectDB();
      const student = await db.collection('students').insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      console.error(error);
    }
    return input;
  },
  editCourse: async (root, { _id, input }) => {
    let course;
    try {
      const db = await connectDB();
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      );
      course = await db.collection('courses').findOne({ _id: ObjectID(_id) });

    } catch (error) {
      console.error(error);
    }
    return course;
  },
  editStudent: async (root, { _id, input }) => {
    let student;
    try {
      const db = await connectDB();
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      );
      student = await db.collection('students').findOne({ _id: ObjectID(_id) });

    } catch (error) {
      console.error(error);
    }
    return student;
  },
  deleteCourse: async (root, { _id }) => {
    try {
      const db = await connectDB();
      await db.collection('courses').deleteOne(
        { _id: ObjectID(_id) }
      );
    } catch (error) {
      console.error(error);
    }
    return `Course Deleted: ${_id}`;
  },
  deleteStudent: async (root, { _id }) => {
    try {
      const db = await connectDB();
      await db.collection('students').deleteOne(
        { _id: ObjectID(_id) }
      );
    } catch (error) {
      console.error(error);
    }
    return `Student Deleted: ${_id}`;
  }
}