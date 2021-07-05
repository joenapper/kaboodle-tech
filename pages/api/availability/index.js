const { rooms } = require("./accommodation_availability.json");

export default (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(rooms);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
