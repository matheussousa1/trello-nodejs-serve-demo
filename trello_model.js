const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'base_trello',
  password: '92303305',
  port: 5432,
});

const getLists = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM lists ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createList = (body) => {
  return new Promise(function(resolve, reject) {
    const { name } = body
    
    console.log(body.name);

    pool.query('INSERT INTO lists (name) VALUES ($1) ', [name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

const deleteList = (merchantId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(merchantId)

    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
  })
}

const updateList = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body

    pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

module.exports = {
  getLists,
  createList,
  deleteList,
  updateList,
}