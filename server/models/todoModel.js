const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require("moment")

let todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  description: {
    type: String
  },
  dueDate: {
    type : Date,
    required : [true , 'You need to set the Due Date'],
    validate : {
      validator : function (value) {
        if (value !== null) {
          let date = moment(value.toISOString().split(`T`)[0].split(`-`).join(``), `YYYYMMDD`).fromNow(); // 8 years ago
          return (date.includes(`ago`) === true ) ? false : true
        }
      },
      message : `Please Provide a Valid Date`
    }
  },
  status : {
    type : Boolean
  },
  moment : String,
  
}, { versionKey: false , timestamps : true})


let Todo = mongoose.model('todo', todoSchema)

module.exports = Todo