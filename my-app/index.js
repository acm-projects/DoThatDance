const mongoose = require("mongoose")

const mongoString = "mongodb+srv://sxk:123@acmcluster.snqyjcv.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})