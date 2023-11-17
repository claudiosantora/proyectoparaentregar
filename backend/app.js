const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const port = 3500

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));




app.use(bodyParser.json());



// Devuelve el html login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
  
})

//  Devuelve el html login.html
app.get('/assets/css/styleslogin.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/assets/css/styleslogin.css'));

})

//  Devuelve el html login.html
app.get('/assets/css/stylespanel.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/assets/css/stylespanel.css'));
  
  })



app.get('/registro', (  req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/registro.html'));

})

// Ruta para obtener la lista de clientes
app.get('/clients', (req, res) => {
    res.json(clients);
  });





// Recibiendo por GET
app.get('/login', (req, res) => {
  var email = req.query.email;
  var password = req.query.password;
  console.log(email);
  console.log(password);

  if (email == "a@a.com" && password == "1") {
    // Email y contraseña validas
    res.send({"estado":"exito"})
    
  } else {
    // Email y contraseña incorrecta
    res.send({"estado":"invalido"});

  }
  
})

app.post('/registro', (req, res) => {
  let nombre= req.body.nombre
  let email= req.body.email
  let password=req.body.password
  console.log (nombre)
  console.log (email)
  console.log (password)

    res.send({"estado": "enviado"})
    

})

// Simulación de una base de datos temporal
let clients = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
  ];

  

  // Ruta para agregar un nuevo cliente
app.post('/clients', (req, res) => {
    const { name } = req.body;
    const newClient = { id: clients.length + 1, name };
    clients.push(newClient);
    res.json({ success: true });
  });
  
  // Ruta para eliminar un cliente
  app.delete('/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    clients = clients.filter(client => client.id !== clientId);
    res.json({ success: true });
  });
  
// Ruta para actualizar un cliente
app.put('/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const { name } = req.body;
  
    // Buscar el cliente por su ID y actualizar la información
    const updatedClient = clients.find(client => client.id === clientId);
    if (updatedClient) {
      updatedClient.name = name;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
  








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})