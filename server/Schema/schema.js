const graphql = require("graphql")
const _ = require("lodash");
const Book = require("../Models/Book")
const Author = require("../Models/Author")


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = graphql;


////dummay data

// var books = [
//     { name: "this is book 1", genre: "book genre1", id: "1", authorID: "1" },
//     { name: "this is book 2", genre: "book genre2", id: "2", authorID: "2" },
//     { name: "this is book 3", genre: "book genre3", id: "3", authorID: "3" },
//     { name: "this is book 4", genre: "book genre4", id: "4", authorID: "2" },
//     { name: "this is book 5", genre: "book genre5", id: "5", authorID: "3" },
//     { name: "this is book 6", genre: "book genre6", id: "6", authorID: "3" },

// ]

// var authors = [
//     { name: "Author 1", age: "42", id: "1" },
//     { name: "Author 2", age: "52", id: "2" },
//     { name: "Author 3", age: "62", id: "3" }
// ]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                /////loadash find method is used to find id 
                // return _.find(authors, { id: parent.authorID })
                return Author.findById(parent.authorID);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            ///GraphQLList is used for filter out all data against ID
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorID: parent.id })
                return Book.find({ authorID: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        Book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                ///code to get data form database
                // return _.find(books, { id: args.id });
                return Book.findById(args.id)
            }
        },
        Author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                ///code to get data form database
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        Books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                return Book.find({})
            }
        },
        Authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorID: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID,
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})