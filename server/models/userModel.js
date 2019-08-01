const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, `Required input username`],
        validate: {
            validator: function (val) {
                return new Promise((resolve, reject) => {
                    User
                        .findOne({
                            username: val
                        })
                        .then((found) => {
                            if (found) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch((err) => {
                            reject(err)
                        })
                })
            },
            message: `Username has been used`
        }
    },
    email: {
        type: String,
        required: [true, `Required input email`],
        validate: [{
            validator: function (val) {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
                    throw `Invalid email Format`
                }
            }
        }, {
            validator: function (val) {
                return new Promise((resolve, reject) => {
                    User
                        .findOne({
                            email: val
                        })
                        .then((found) => {
                            if (found) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch((err) => {
                            reject(err)
                        })
                })
            },
            message: `Email has been used`
        }]
    },
    password: {
        type: String,
        required: [true, `Required input password`],
        minlength: [5, `Password must be 5 characters or more`],
        match: [/^[a-zA-Z0-9]*$/, 'Password can Only Contain Alpha Numeric']
    },
    profpic: {
        type: String
    }
}, { versionKey: false, timestamps: true })

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

userSchema.plugin(uniqueValidator)

let User = mongoose.model('user', userSchema)

module.exports = User