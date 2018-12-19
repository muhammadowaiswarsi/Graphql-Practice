const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require("./Schema/schema")
const mongoose = require("mongoose")

mongoose.connect("mongodb://<dbuser>:<password>@ds161653.mlab.com:61653/graphql-practice")

mongoose.connection.once("open", () => {
    console.log("connected to database")
})

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000, () => {
    console.log("your server is running on 3000")
})