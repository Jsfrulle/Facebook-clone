const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      require: [true, "firstname is required"],
      trim: true,
      text: true
    },
    last_name: {
      type: String,
      require: [true, "lastname is required"],
      trim: true,
      text: true
    },
    username: {
      type: String,
      require: [true, "username is required"],
      trim: true,
      text: true,
      unique: true
    },
    email: {
      type: String,
      require: [true, "email is required"],
      trim: true,
      text: true,
      unique: true
    },

    password: {
      type: String,
      require: [true, "password is required"]
    },

    picture: {
      type: String,
      default:
        "https://timesaver247.com/wp-content/uploads/2020/10/default-user-image.png"
    },
    cover: {
      type: String,
      default:
        "https://www.viewstorm.com/wp-content/uploads/2014/10/default-img.gif"
    },
    gender: {
      type: String,
      require: [true, "gender is required"],
      trim: true
    },
    bYear: {
      type: Number,
      require: true,
      trim: true
    },
    bMonth: {
      type: Number,
      require: true,
      trim: true
    },
    bDay: {
      type: Number,
      require: true,
      trim: true
    },

    verified: {
      type: Boolean,
      default: false
    },

    friends: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    followers: {
      type: Array,
      default: []
    },
    requests: {
      type: Array,
      default: []
    },
    search: {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      details: {
        bio: {
          type: String
        },
        otherName: {
          type: String
        },
        job: {
          type: String
        },
        workPlace: {
          type: String
        },
        highSchool: {
          type: String
        },
        college: {
          type: String
        },
        currentCity: {
          type: String
        },
        homeTown: {
          type: String
        },
        realtionship: {
          type: String,
          enum: ["Single", "In a relationship", "Married", "Divorced", "Other"]
        },
        instagram: {
          type: String
        }
      },

      savedPosts: [
        {
          post: { type: ObjectId, ref: "Post" },

          savedAt: {
            type: Date,
            default: new Date()
          }
        }
      ]
    }
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
