const {Downloader}= require('steamcmd-wrapper');
const cliProgress = require('cli-progress');

const ProgressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

(async function () {
    
    var MaxSize= await Downloader.GetMaxSize();

    ProgressBar.start(Number(MaxSize),0);

    var Bin= await Downloader.Download("./testdown/",function (data) {
        ProgressBar.update(data.Current);
    });
    ProgressBar.stop();
    
    console.log("");
    console.log(Bin);

})()