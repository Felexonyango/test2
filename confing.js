var dotenv =require('dotenv');
dotenv.config()
require('process')

 var config ={}; 

 config.DB=""+process.env.DB,
 config.JWT_SECRETE=""+process.env.JWT_SECRETE,

 module.exports =config
