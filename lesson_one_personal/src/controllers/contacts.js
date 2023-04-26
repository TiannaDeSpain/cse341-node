const mongodb = require('../config/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (request, response) => {
  const result = await mongodb.getDb().db('CSE341').collection('contacts').find();
  result.toArray().then((lists) => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(lists);
  });
};

const getSingle = async (request, response) => {
  const userId = new ObjectId(request.params.id);
  const result = await mongodb.getDb().db('CSE341').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(lists[0]);
  });
};

const createContact = async (request, response) => {
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
};

const updateContact = async (request, response) => {
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
};

const deleteContact = async (request, response) => {
  const userId = new ObjectId(request.params.id);
  const res = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .remove({ _id: userId }, true);
  console.log(res);
  if (res.deletedCount > 0) {
    response.status(204).send();
  } else {
    response.status(500).json(res.error || 'Error occurred while deleting your contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
