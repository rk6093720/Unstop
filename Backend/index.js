const express = require("express")
const cors = require("cors")
const {connection} = require("./config/db");
const { Unstop } = require("./modal/unstop.modal")
const app = express();
const PORT = 8080 || process.env.PORT;
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home page")
})

app.use(cors())

// app.use("/user", userController)

async function reserveSeats(numSeats) {
    const availableSeats = await Unstop.find({ isReserved: false })
      .sort({ row: 1, Unstop: 1 })
      .limit(numSeats);
  
    if (availableSeats.length >= numSeats) {
      for (const Unstop of availableSeats) {
        Unstop.isReserved = true;
        await Unstop.save();
      }
      return { success: true, reservedSeats: availableSeats };
    } else {
      return { success: false, message: 'Seats not available' };
    }
  }
  app.post('/api/reserve', async (req, res) => {
    const numSeats = req.body.numSeats;
  
    try {
      const result = await reserveSeats(numSeats);
      res.json(result);
    } catch (error) {
      console.error('Error occurred while reserving seats:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });  

app.listen(PORT, async () => {
    try{
        await connection;
        console.log("Connected to db")
    }
    catch(err){
        console.log("Error connnecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})