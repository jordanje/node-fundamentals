const express = require('express');
const app = express();
const morgan = require("morgan")

const sayHello = (req, res, next) => {
  res.send("Hello");
}

const sayBye = (req, res) => {
  res.send("Sorry to see you go!")
}

const saySomething = (req, res) => {
  console.log(req.params)
  const greeting = req.params.greeting;
  const name = req.query.name
  const content = greeting && name? `${greeting}, ${name}!` : `${greeting}!` 
  res.send(content)
}

app.use(morgan("dev"))

app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`)
}) 

app.use((err, req, res, next) => {
  console.error(err)
  res.send(err)
})

app.get("/hello", sayHello)
app.get("/say/goodbye", sayBye)
app.get("/say/:greeting", saySomething)
app.get("/states/:abbreviation", (req, res, send) => {
  
})
 
module.exports = app