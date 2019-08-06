const fs = require('fs');

function comppileTemp(options){
    const {template='',filename='',params={}} = options;
    this.templateDir = template
    this.targetDir = filename
    this.params = params
}

comppileTemp.prototype.apply = function(compiler){
    const {templateDir='',targetDir='',params={}} = this;
    compiler.hooks.compilation.tap('compile temp', (compilation, callback) => {
        fs.readFile(templateDir,(err,data)=>{
            if (err) throw err;
            const reg = new RegExp(`{{\\s*(${Object.keys(params).join('|')})\\s*}}`, 'g')
            const html = data.toString().replace(reg, function (str, key, index) {
              return params[key]
            });
            fs.writeFile(targetDir, html, function () {
                console.log('模版写入成功')
                // callback();//调用这个方法表示此plugin编译完毕，继续编译进程
            });
        });
    });
}

module.exports = comppileTemp;