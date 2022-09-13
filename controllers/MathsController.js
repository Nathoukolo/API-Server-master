const path = require('path');
const fs = require('fs');
const { isNumber } = require('util');
const { isSet } = require('util/types');
const { off } = require('process');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.params = HttpContext.path.params
            this.response = this.HttpContext.response;
        }
        checkParamsCount(nbParams){
                if(Object.keys(this.params).length > nbParams){
                    return this.params.error="too many parameters";
                }
                return true;
            }
        checkDefinedParams(){
            if(this.params.x == undefined && this.params.y!=undefined)
                return this.params.error="x is undefined";
            else if(this.params.y == undefined && this.params.x!=undefined)
                return this.params.error="y is undefined";

            return true;
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
                        if(this.checkParamsCount(3) && this.checkDefinedParams()){
                            this.params.op = "+"
                            this.params.value = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                            this.response.JSON(this.HttpContext.path.params);
                        }                          
                        break;  

                case '-': 
                if(this.checkParamsCount(3)  && this.checkDefinedParams()){
                        this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                        break;

                case '*': 
                if(this.checkParamsCount(3) && this.checkDefinedParams()){
                        this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                        break;

                case '/': 
                if(this.checkParamsCount(3) && this.checkDefinedParams()){
                        if(parseInt(this.HttpContext.path.params.x) == 0 || parseInt(this.HttpContext.path.params.y) == 0)
                            this.HttpContext.path.params.error = "cannot divide by zero";
                        this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) / parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                        break;

                case '%': 
                if(this.checkParamsCount(3) && this.checkDefinedParams()){
                        if(parseInt(this.HttpContext.path.params.x) == 0 || parseInt(this.HttpContext.path.params.y) == 0)
                            this.HttpContext.path.params.error = "cannot modulo by zero";
                        this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) % parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                        break;
                case '!': 
                if(this.checkParamsCount(2) && this.checkDefinedParams()){
                        this.HttpContext.path.params.value = factorial(parseInt(this.HttpContext.path.params.n));
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                        break;
                case 'p': 
                if(this.checkParamsCount(2) && this.checkDefinedParams()){
                        this.HttpContext.path.params.value =isPrime(parseInt(this.HttpContext.path.params.n));
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                        break;
                case 'np': 
                if(this.checkParamsCount(2) && this.checkDefinedParams()){
                        this.HttpContext.path.params.value = findPrime(parseInt(this.HttpContext.path.params.n));
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
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
        }
    }
    
}