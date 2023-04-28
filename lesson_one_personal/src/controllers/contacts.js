const mongodb = require('../config/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (request, response) => {
  try {
    const result = await mongodb.getDb().db('CSE341').collection('contacts').find();
    result.toArray().then((lists) => {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).json(lists);
    });
  } catch (err) {
    response.status(500).json(err);
  }
};

const getSingle = async (request, response) => {
  try {
    const userId = new ObjectId(request.params.id);
    const result = await mongodb.getDb().db('CSE341').collection('contacts').find({ _id: userId });
    result.toArray().then((lists) => {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).json(lists[0]);
    });
  } catch (err) {
    response.status(500).json(err);
  }
};

const createContact = async (request, response) => {
  try {
    const contact = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      favoriteColor: request.body.favoriteColor,
      birthday: request.body.birthday
    };
    const res = await mongodb.getDb().db('CSE341').collection('contacts').insertOne(contact);
    if (res.acknowledged) {
      response.status(201).json(res);
    } else {
      response.status(500).json(res.error || 'Error occurred while creating your contact.');
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

const updateContact = async (request, response) => {
  try {
    const userId = new ObjectId(request.params.id);
    const contact = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      favoriteColor: request.body.favoriteColor,
      birthday: request.body.birthday
    };
    const res = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    console.log(res);
    if (res.modifiedCount > 0) {
      response.status(204).send();
    } else {
      response.status(500).json(res.error || 'Error occurred while updating your contact.');
    }
  } catch (err) {
    try {
      const contact = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        favoriteColor: request.body.favoriteColor,
        birthday: request.body.birthday
      };
      const res = await mongodb
        .getDb()
        .db('CSE341')
        .collection('contacts')
        .replaceOne(
          { firstName: request.body.firstName, lastName: request.body.lastName },
          contact
        );
      console.log(res);
      if (res.modifiedCount > 0) {
        response.status(204).send();
      } else {
        response.status(500).json(res.error || 'Error occurred while updating your contact.');
      }
    } catch {
      try {
        const contact = {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          email: request.body.email,
          favoriteColor: request.body.favoriteColor,
          birthday: request.body.birthday
        };
        const res = await mongodb
          .getDb()
          .db('CSE341')
          .collection('contacts')
          .replaceOne({ email: request.body.email }, contact);
        console.log(res);
        if (res.modifiedCount > 0) {
          response.status(204).send();
        } else {
          response.status(500).json(res.error || 'Error occurred while updating your contact.');
        }
      } catch {
        response.status(500).json('Error occurred while updating your contact.');
      }
    }
  }
};

const deleteContact = async (request, response) => {
  try {
    const userId = new ObjectId(request.params.id);
    const res = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .remove({ _id: userId }, true);
    console.log(res);
    if (res.deletedCount > 0) {
      response.status(200).send();
    } else {
      response.status(500).json(res.error || 'Error occurred while deleting your contact.');
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
