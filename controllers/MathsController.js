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
            switch(this.HttpContext.path.params.op){
                case ' ': 
                    this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                    break;

                case '-': 
                    this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                    break;

                case '*': 
                        this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;
                case '/': 
                        this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) / parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;
                case '%': 
                        this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) % parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;
                case '!': 
                        this.HttpContext.path.params.result = factorial(parseInt(this.HttpContext.path.params.n));
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;
                case 'p': 
                        this.HttpContext.path.params.result =isPrime(parseInt(this.HttpContext.path.params.n));
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;
                case 'np': 
                        this.HttpContext.path.params.result = findPrime(parseInt(this.HttpContext.path.params.n));
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;  
                default :  
                    this.HttpContext.path.params.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);                
            }
            function factorial(n){
                if(n===0||n===1){
                  return 1;
                }
                return n*factorial(n-1);
            }
            function isPrime(value) {
                for(var i = 2; i < value; i++) {
                    if(value % i === 0) {
                        return false;
                    }
                }
                return value > 1;
            }
            function findPrime(n){
                let primeNumer = 0;
                for ( let i=0; i < n; i++){
                    primeNumer++;
                    while (!isPrime(primeNumer)){
                        primeNumer++;
                    }
                }
                return primeNumer;
            }

            
            //if(this.HttpContext.path.params.op){
            //    if(this.HttpContext.path.params.op == ' '){
            //        this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
            //        this.HttpContext.response.JSON(this.HttpContext.path.params);
            //    }
            //    else if(this.HttpContext.path.params.op == '-'){
            //        this.HttpContext.path.params.result = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
            //        this.HttpContext.response.JSON(this.HttpContext.path.params);
            //    }
            //}
            //else{
            //    this.HttpContext.path.params.error = "parameter 'op' is missing";
            //    this.HttpContext.response.JSON(this.HttpContext.path.params);
            //}
        }
    }
    
}