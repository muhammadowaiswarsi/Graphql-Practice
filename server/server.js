const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require("./Schema/schema")
const mongoose = require("mongoose")

mongoose.connect("mongodb://muhammadowaiswarsi:owais123@ds143614.mlab.com:43614/graphql-practice", { useNewUrlParser: true })

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