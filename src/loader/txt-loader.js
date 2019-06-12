const utils = require('loader-utils');

module.exports = function (source) {
    const optionis = utils.getOptions(this);
    const {name=''} = optionis;
    source = source.replace(/\[name]/g,name);
    return `export default ${JSON.stringify({
        content:source,
        filename:this.resourcePath,
    })}`;
}