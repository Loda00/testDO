const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { pool } =require('./connection')
const { PORT } = process.env
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason)
  process.exit(1)
});

app.get('/', async (req, res) => {
  const query = 'CALL getUsers();'

  res.send({
    rs: 200,
    data: [
      'Juan', 17
    ]
  })
  // try {
  //   const result = await pool.query(query)
  // } catch (error) {
  //   throw new Error(error)
  // }
})

app.post('/', async (req, res) => {
  console.log('req', req.body)
  const { nombres, apellidos, edad, email } = req.body
  const sql = 'CALL addUser (?, ?, ?, ?);'

  res.send({
    rs: 200,
    data: [
      'Juan', 17
    ]
  })
  // try {
  //   const result = await pool.query(sql, [nombres, apellidos, edad, email])
  // } catch (error) {
  //   throw new Error(error)
  // }
})

app.listen(PORT, () => {
  console.log('SERVEERRR', PORT)
})