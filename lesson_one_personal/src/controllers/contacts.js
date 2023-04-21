const mongodb = require("../config/mongodb");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db("CSE341").collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (request, response, next) => {
  const userId = new ObjectId(request.params.id);
  const result = await mongodb
    .getDb()
    .db("CSE341")
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    response.setHeader("Content-Type", "application/json");
    response.status(200).json(lists[0]);
  });
};

module.exports = { getAll, getSingle };