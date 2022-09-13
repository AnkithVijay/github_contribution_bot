const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");
const FILE_PATH = "./data.json";
require('dotenv');

const USER = process.env.USER;
const PASS = process.env.PASS;
const REPO = process.env.REPO;

const remote = `https://${USER}:${PASS}@${REPO}`;

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = {
    date: DATE,
  };
  jsonfile.writeFile(FILE_PATH, data, () => {
    try{
      simpleGit()
        .add([FILE_PATH])
        .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n))
        .push();
    }catch(e){
      console.log(e);
    }
    
  });
};
makeCommit(120);
