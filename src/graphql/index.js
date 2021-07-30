const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLID } = require("graphql")
const Contract = require("../models/Contract")

const authors = [
    { id: 1, name: "silas", },
    { id: 2, name: "kena", },
    { id: 3, name: "abush", }
]

const books = [
    { id: 1, name: "Rich dada", authorId: 1 },
    { id: 2, name: "kena", authorId: 1 },
    { id: 3, name: "abush", authorId: 1 }
]
const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "about the author",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },

    })
})
const booktype = new GraphQLObjectType({
    name: "Book",
    description: "about the book",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        authorId: {
            type: GraphQLNonNull(GraphQLInt)
        },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id = book.authorId)
            }
        }
    })
})
const ContractType = new GraphQLObjectType({
    name: "ContractType",
    fields: () => ({
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        price: { type: GraphQLString },
        customerId: { type: GraphQLString },
        status: { type: GraphQLString },
    })

})
const updateContractType = new GraphQLObjectType({
    name: "UpdateContractType",
    fields: () => ({
        price: { type: GraphQLString },
        id: { type: GraphQLString },
        status: { type: GraphQLString },

    })

})

const rootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query ",
    fields: () => ({
        status: {
            type: GraphQLString,
            resolve: () => "welcome to graphql"
        },
        contract: {
            type: GraphQLList(ContractType),
            resolve: () => {
                return Contract.find()
            }
        },
        books: {
            type: new GraphQLList(booktype),
            description: "book list",
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "Author list",
            resolve: () => authors
        },

    })
})

const Mutations = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutations query",
    fields: () => ({
        addContract: {
            type: ContractType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                customerId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let contract = new Contract({
                    name: args.name,
                    description: args.description,
                    price: args.price,
                    type: args.type,
                    customerId: args.customerId
                })
                return contract.save();
            }
        },
        updateContract: {
            type: updateContractType,
            args: {
                price: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Contract.updateOne({ _id: args.id }, { price: args.price, status: args.status })
            }
        },
    })
})
module.exports = {
    rootQuery,
    Mutations
}