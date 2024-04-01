module.exports = (functionToWrapp) => {
    const wrappingFunction = (req, res, next) => {
        functionToWrapp(req, res, next).catch(next);
    };
    return wrappingFunction;
};