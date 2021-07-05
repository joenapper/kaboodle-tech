const { accommodations } = require("./accommodation.json");

export default (req, res) => {
  const accommodation = accommodations.filter(
    (accommodation) => accommodation.id.toString() === req.query.id
  );

  // const room = accommodations.filter(
  //   ({ rooms }) => rooms.id.toString() === req.query.id
  // );

  if (req.method === "GET") {
    res.status(200).json(accommodation);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
