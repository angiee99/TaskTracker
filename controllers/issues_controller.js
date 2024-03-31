// const Issue = require("../models/issue")
// const ExpressError = require("../utils/ExpressError");

let issues = [
    {   "id": 1,
        "name": "Wash clothes", 
        "completed": false, 
        "details": "djfdksfjsld", 
        "priority": 2, 
        "time_start": "11:00", 
        "time_end": "13:00"
    }, 
    {   "id": 2,
        "name": "TNPW project", 
        "completed": true, 
        "details": "do it girl", 
        "priority": 1, 
        "time_start": "13:00", 
        "time_end": "15:30"
    }, 
    {   "id": 3,
        "name": "Rock it", 
        "completed": false, 
        "details": "yeah", 
        "priority": 1, 
        "time_start": "21:00", 
        "time_end": "21:30"
    }, 
]

module.exports.showIssues = async (req, res, next) => {
//   const comments = await Comment.find({});
  res.render("home", { issues });
};

module.exports.showIssueDetails = (req, res, next) => {
    const { id } = req.params;
    const issue = issues.find((i) => i.id == id)
    res.render("issue", { issue });

}

module.exports.updateIssue = (req, res, next) => {
    const { id } = req.params;
    const issue = issues.find((i) => i.id == id)
    issue.completed = !issue.completed;
}

module.exports.renderNew = (req, res, next) => {
    res.render("new");
}

module.exports.createNewIssue = (req, res, next) => {
    const { name, details, time_start, time_end, priority } = req.body.issue;
    issues.push({ "id" : issues.length + 1, 
        "name": name, 
        "completed": false, 
        "details" : details, 
        "priority": priority,
        "time_start":time_start, 
        "time_end": time_end })
        
    res.redirect("/issues")                        
}
