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

const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation
  if(abbreviation.length !== 2){
    next(`States abbreviations "${abbreviation}" is invalid.`)
  } else {
    next()
  }
}

app.use(morgan("dev"))

app.get("/hello", sayHello)

app.get("/say/goodbye", sayBye)

app.get("/say/:greeting", saySomething)

app.get(
  "/states/:abbreviation", 
  checkForAbbreviationLength, 
  (req, res, next) => {
    res.send(`${req.params.abbreviation} is a nice state, I'd like to visit soon! thanks`)
})
 
app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
   (req, res, next) => {
    res.send(`Enjoy your trip to ${req.params.abbreviation}`)
})

//error handling
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`)
}) 

app.use((err, req, res, next) => {
  console.error(err)
  res.send(err)
})


module.exports = app