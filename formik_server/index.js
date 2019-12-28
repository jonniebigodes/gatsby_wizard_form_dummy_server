const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
const port = 3000;

app.get("/", (_, res) => res.send("Hello World!"));
// creates a route for the requests
app.use("/data", (req, res) => {
  if (req.method === "POST") {
    const { body } = req;
    console.log(`form data recieved:${JSON.stringify(body)}`);
    return res.status(200).json({ message: "Data OK" });
  } else {
    return res.status(200).json({
      formInformation: {
        firstName: "",
        lastName: "",
        email: "",
        favoriteColor: ""
      }
    });
  }
});
app.listen(port, () =>
  console.log(`Example server listening on port ${port}!`)
);
