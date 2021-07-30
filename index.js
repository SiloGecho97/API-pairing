require("dotenv").config()
const express = require('express')
const helmet = require('helmet');
const morgan = require('morgan')
const expressGraphQL = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType } = require("graphql")
const cors = require('cors')
const connectMongose = require('./db_connection');
const routes = require('./src/routes')
const app = express();
const PORT = process.env.PORT || 8585

const schema = new GraphQLSchema({
    query: {}
})

/**
 * Express middlerware to halder json data
 * Morgan for logging
 * Helmet for security
 * 
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use('/graphql', expressGraphQL({ graphql: true }))
/**
 * DB connection,MONGO DB,CONNECTION POOL
 */
connectMongose()

/**
 * Router to handle endpoint for API callback
 */
app.use(routes)
/**
 * For unknown api end point called
 */
app.get("*", (req, res, next) => {
    res.status(404).send("Not found")
})

/**
 * App listening at port
 */
app.listen(PORT, () => {
    console.log("App is listening in " + PORT)
})


