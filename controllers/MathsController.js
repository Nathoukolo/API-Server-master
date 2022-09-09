const path = require('path');
const fs = require('fs');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }

    get(){    
        if(this.HttpContext.path.queryString == '?'){
            //Send helpPage
            let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
            let content = fs.readFileSync(helpPagePath);
            this.HttpContext.response.content("text/html",content);
        }
        else{
            if(this.HttpContext.path.params.op){
                if(this.HttpContext.path.params.op == ' '){
                    this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                else if(this.HttpContext.path.params.op == '-'){
                    this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }
            else{
                this.HttpContext.path.params.error = "parameter 'op' is missing";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
            }

        }
    }
}