const {SteamCMD}= require('steamcmd-wrapper');
const cliProgress = require('cli-progress');
const path= require("path");

var Cmd= new SteamCMD({Bindir:path.resolve("./test/steamcmd.exe")});

const ProgressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
var IsStart=false;

console.clear();

(async function () {
    await Cmd.Create(function() {});
    console.log("Waiting login response !");
    var Login= await Cmd.Login({Username:"YOURUSERNAME",Password:"YOURPASS",Guard:"YOURGUARD"});
    

    if(Login.type==0){
        console.log("Logged in");
        console.log("Waiting app info");

        var Download= await Cmd.AppUpdate({
            AppID:610360,
            InstPath:"./GameDir/",
            Cb:function (Response) {
                if(!IsStart){
                    ProgressBar.start(Number(Response.data.max),0);
                    IsStart=true;
                }

                ProgressBar.update(Number(Response.data.current));
            }
        });

        ProgressBar.stop();

        console.log(Download);  

    }else{
        console.log(Login);
    }
})()