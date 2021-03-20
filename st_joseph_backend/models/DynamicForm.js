const mongoose = require("mongoose");

const DynamicFormSchema = new mongoose.Schema({
  FormName: {
    type: String,
  },
  Values: {},
  // columnname: {
  //   type: String,
  // },
  // input: {
  //   type: String,
  // },
  // id: {
  //   type: String,
  // },
  //   interested: {
  //     type: String,
  //   },
});

module.exports = mongoose.model("DynamicForm", DynamicFormSchema);
