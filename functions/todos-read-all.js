import faunadb from 'faunadb'
const chalk = require('chalk')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

// client.query(q.Get(q.Ref(q.Collection("todos"), "240216403867599368")))
//   .then((ret) => {
//     console.log(ret.data)
//     console.log(ret.data.owner)
//   })

// owner 461f31e8-5f74-41f2-91df-83dc6c1dcb88

  client.query(q.Get(q.Ref(`classes/todos`))).then((response) => {
    console.log(response)
  })

exports.handler = (event, context, callback) => {
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_todos'))))
    .then((response) => {

      const todoRefs = response.data
      // console.log('Todo refs', todoRefs)
      // console.log(`${todoRefs.length} todos found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = todoRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllTodoDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
