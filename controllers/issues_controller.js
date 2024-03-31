const Issue = require("../models/issue")
// const ExpressError = require("../utils/ExpressError");


module.exports.showIssues = async (req, res, next) => {
  const issues = await Issue.find({});
  res.render("home", { issues});
};

module.exports.showIssueDetails = async (req, res, next) => {
    const { id } = req.params;
    const issue = await Issue.findById(id)
    res.render("issue", { issue });

}

module.exports.updateIssue = async (req, res, next) => {
    const { id } = req.params;
    const issue = await Issue.findById(id)
    issue.completed = !issue.completed;
    // ?? save updated to db
}

module.exports.renderNew = (req, res, next) => {
    res.render("new");
}

module.exports.createNewIssue = async (req, res, next) => {
    const { name, details, time_start, time_end, priority } = req.body.issue; // to  be validated
    const issue = new Issue({
        "name": name, 
        "completed": false, 
        "details" : details, 
        "priority": priority,
        "time_start":time_start, 
        "time_end": time_end })

    await issue.save()
    res.redirect("/issues")                        
}

module.exports.deleteIssue = async (req, res, next) => {
    const { id } = req.params;
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!deletedIssue) {
        throw new Error("Document not found", 404);
    }
    res.redirect("/issues")                        
}
