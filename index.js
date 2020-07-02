const express = require('express')
const app = express()
const port = 3001
const Pool = require('pg').Pool
const cors = require('cors')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'base_trello',
  password: '92303305',
  port: 5432,
});

app.use(express.json())
app.use(cors())
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

//list e cards

app.get('/', (req, res, next ) => {
  var data = [];
  pool.query(`SELECT * FROM lists ORDER BY id ASC`, (q_err, q_res) => {
      // console.log(q_res.rows.name);
      // jsonRes = { data : {"lists" : q_res.rows }, "listIds": q_res.rows};
      // res.json(jsonRes)
      const data = {
        lists: {
          'list-1': {
            id: 'list-1',
            title: 'A Fazer',
            cards: [
              {
                id: 'card-4',
                title: 'Learning how to cook',
              },
              {
                id: 'card-5',
                title: 'Making sandwich',
              },
              {
                id: 'card-6',
                title: 'Taking the trash out',
              },
            ],
          },
          'list-2': {
            id: 'list-2',
            title: 'Fazendo',
            cards: [
              {
                id: 'card-4',
                title: 'Learning how to cook',
              },
              {
                id: 'card-5',
                title: 'Making sandwich',
              },
              {
                id: 'card-6',
                title: 'Taking the trash out',
              },
            ],
          },
        },
        listIds: ['list-1', 'list-2'],
      };
      res.json(data);
  })
})

// list

app.get('/lists', (req, res, next ) => {
  pool.query(`SELECT * FROM lists ORDER BY id ASC`, (q_err, q_res) => {
      res.json(q_res.rows)
  })
})

app.post('/addlist', (req, res, next) => {
  const values = [ req.body.name, req.body.idlist ]
  
  console.log('list: ',values);

  pool.query(`INSERT INTO lists (name, idlist) VALUES($1, $2)`, values, (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res.rows)
    })
})


//cards

app.get('/cards', (req, res, next ) => {
  pool.query(`SELECT * FROM cards ORDER BY id ASC`, (q_err, q_res) => {
      res.json(q_res.rows)
  })
})

app.post('/addcard', (req, res, next) => {
  const values = [ req.body.name, req.body.idlist ]
  
  console.log('card: ',values);

  pool.query(`INSERT INTO cards (list, idlist) VALUES($1, $2)`, values, (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res.rows)
    })
})

// app.post('/list', (req, res) => {
//   list_model.createList(req.body)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.delete('/list/:id', (req, res) => {
//   list_model.deleteList(req.params.id)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.put('/list/:id', (req, res) => {
//   list_model.updateList(req.params.id)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})