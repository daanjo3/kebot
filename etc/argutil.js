function filterQuotes(argument) {
    return argument.replace(/^"(.+(?="$))"$/, '$1');
}

module.exports.filterQuotes = filterQuotes;