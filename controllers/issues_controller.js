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
    const completed = !issue.completed;

    const updatedIssue = await Issue.findByIdAndUpdate(id, 
        { completed });

    await updatedIssue.save()
    
    res.redirect("/issues")     
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

module.exports.renderEdit = async (req, res, next) => {
    const { id } = req.params;
    const issue = await Issue.findById(id)
    res.render("edit", { issue });
}

module.exports.saveEditedIssue = async (req, res, next) => {
    const { id } = req.params;
    const { name, details, time_start, time_end, priority } = req.body.issue; // to  be validated
    const updatedIssue = await Issue.findByIdAndUpdate(id, 
        { name, details, time_start, time_end, priority });

    await updatedIssue.save()
    res.redirect("/issues")                        
}


