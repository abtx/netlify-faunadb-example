import faunadb from 'faunadb'
import getId from './utils/getId'
const chalk = require('chalk')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})


// owner 461f31e8-5f74-41f2-91df-83dc6c1dcb88


exports.handler = (event, context, callback) => {

  const id = getId(event.path)
  console.log(chalk.yellow(id))

  return client.query(q.Paginate(q.Match(q.Index('todos_by_owner'), id)))
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
