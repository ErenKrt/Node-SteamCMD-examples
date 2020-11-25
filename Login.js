const {SteamCMD}= require('steamcmd-wrapper');
const inquirer = require('inquirer');
const path= require('path');
var Cmd= new SteamCMD({Bindir:path.resolve("./test/steamcmd.exe")});

var SuccessLogin=0;
(async function() {
    await Cmd.Create(function(data) {});

    while(SuccessLogin==0){
        var {username,password,guard}=await inquirer.prompt([
            {
                type:"input",
                name:'username',
                message:"What's your Steam username ?",
                validate(val){
                    if(val!=""){
                        return true;
                    }else{
                        return "Please write your username"
                    }
                }
            },
            {
                type:"password",
                name:"password",
                message:"What's your Steam password ?",
                validate(val){
                    if(val!=""){
                        return true;
                    }else{
                        return "Please write your password"
                    }
                }
            },
            {
                type:"input",
                name:"guard",
                message:"What's your Steam Guard Code ?",
                validate(val){
                    if(val.length!=5){
                        return "Please check your steam guard code"
                    }else{
                        return true;
                    }
                }
            }
        ])
        console.log("WAITING RESPONSE...");

        var Login= await Cmd.Login({
            Username:username,
            Password:password,
            Guard:guard
        });

        if(Login.type==0){
            SuccessLogin=1;
        }else{
            console.log("Error Code: "+Login.data.type," | Message: "+Login.data.message)
        }

    }

    console.log("logged in");
    
    Cmd.Exit();
})()