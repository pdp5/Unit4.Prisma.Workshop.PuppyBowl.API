const express = require("express");
const app = express();
const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));
const port = 3000;

app.get("/api/players", async (req, res, next) => {
  try {
    const response = await prisma.Players.findMany();
    console.log("listening to port: ", port);
    res.json(response);
  } catch (error) {
    console.log("error while getting players ", error);
    next(error);
  }
});

app.get("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const response = await prisma.Players.findUnique({ where: { id } });
    if (!response) {
      res.sendStatus("Player not found");
    }
    res.json(response);
  } catch (error) {
    console.log("Error while getting player ", error);
    next(error);
  }
});

app.post("/api/players", async (req, res, next) => {
  try {
    const response = req.body;
    const player = await prisma.Players.create({
      data: {
        name: response.name,
        breed: response.breed,
        status: response.status,
      },
    });
    res.json(player);
  } catch (error) {
    console.log("Error creating a player ", error);
    next(error);
  }
});

app.put("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const response = req.body;
    const player = await prisma.Players.update({
      where: { id },
      data: { status: response.status },
    });
    res.json(player);
  } catch (error) {
    console.log("Error while modifiying a player ", error);
    next(error);
  }
});

app.delete("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const player = await prisma.Players.delete({ where: { id } });
    res.json(player).status(204);
  } catch (error) {
    console.log("Error while deleting a player ", error);
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
