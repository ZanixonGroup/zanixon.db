const { ZanixonDB } = require("./index.js");
const _ = require("lodash");

const db = new ZanixonDB({
  showLogs: true,
  tables: {
    user: "/user/users.json",
    rank: "/user/rank.json"
  }
});

db.variables({
  money: 10000
})
db.variables({
  token: 10000,
  id: "dancok"
})

db.get("user.profile.id").then(d => console.log("Get:", d))
db.setKey("user.wallet", "dompet").then(console.log)