const prisma = require("../prisma");

const seed = async () => {
  const createPlayers = async () => {
    const players = [
      {
        name: "Logan",
        breed: "Italian Greyhound",
        status: "field",
      },
      {
        name: "Chase",
        breed: "Italian Greyhound",
        status: "field",
      },
      {
        name: "Sam",
        breed: "Golden Retriever",
        status: "bench",
      },
    ];
    await prisma.Players.createMany({ data: players });
  };
  await createPlayers();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
