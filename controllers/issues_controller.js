const Issue = require("../models/issue")
const ExpressError = require("../utils/ExpressError");
const session = require("express-session");

module.exports.showIssues = async (req, res, next) => {
  const issues = await Issue.find({author: req.session.userId}); 
  res.render("home", { issues});
};

module.exports.showIssueDetails = async (req, res, next) => {
    const { id } = req.params;
    const issue = await Issue.findById(id)
    if(!issue){
        throw new ExpressError(404, `Not known issue with id ${id}`)
    }
    res.render("issue", { issue });
}

module.exports.updateIssue = async (req, res, next) => {
    const { id } = req.params;
    const issue = await Issue.findById(id)
    if(!issue){
        throw new ExpressError(404, `Not known issue with id ${id}`)
    }
    const completed = !issue.completed;

    const updatedIssue = await Issue.findByIdAndUpdate(id, { completed });
    if(!updatedIssue){
        throw new ExpressError(404, `Failed to update issue with id ${id}`)
    }
    await updatedIssue.save()

    res.redirect("/issues")     
}

module.exports.renderNew = (req, res, next) => {
    res.render("new");
}

module.exports.createNewIssue = async (req, res, next) => {
    const { name, details, time_start, time_end, priority } = req.validatedIssue; 

    const issue = new Issue({ name, details, priority, time_start, time_end })

    issue.author = req.session.userId;

    await issue.save()
    res.redirect("/issues")                        
}

module.exports.deleteIssue = async (req, res, next) => {
    const { id } = req.params;
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!deletedIssue) {
        throw new ExpressError(404, `Failed to delete issue with id ${id}`)
    }
    res.redirect("/issues")                        
}

module.exports.showEditForm = async (req, res, next) => {
    const { id } = req.params;
    const issue = await Issue.findById(id)
    if(!issue){
        throw new ExpressError(404, `Not known issue with id ${id}`)
    }
    res.render("edit", { issue });
}

module.exports.saveEditedIssue = async (req, res, next) => {
    const { id } = req.params;
    const { name, details, time_start, time_end, priority } = req.validatedIssue; 
    const updatedIssue = await Issue.findByIdAndUpdate(id, 
        { name, details, time_start, time_end, priority });
        
    if(!updatedIssue){
        throw new ExpressError(404, `Failed to save edited issue with id ${id}`)
    }
    await updatedIssue.save()
    res.redirect("/issues")                        
}


