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

  try {
    const result = await pool.query(query)
    res.send(result[0][0])
  } catch (error) {
    throw new Error(error)
  }
})

app.post('/', async (req, res) => {
  console.log('req', req.body)
  const { nombres, apellidos, edad, email } = req.body
  const sql = 'CALL addUser (?, ?, ?, ?);'

  try {
    const result = await pool.query(sql, [nombres, apellidos, edad, email])
    res.send(result[0].data)
  } catch (error) {
    throw new Error(error)
  }
})

app.listen(PORT, () => {
  console.log('SERVEERRR', PORT)
})