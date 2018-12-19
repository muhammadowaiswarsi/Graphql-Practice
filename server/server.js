const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require("./Schema/schema")

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))

app.listen(3000, ()=>{
    console.log("your server is running on 3000" )
})