//流れ
//chromestrageからデータを取ってくる→正規表現のmatch->main(繰り返し)=>onになったらanalysis=>send
(function init() {
    //setting.jsからchrome.strage.localに保存したデータの読み出し
    //TODO:"object{url:xpath}"なデータを追加urlの正規表現がキーでvalはそのURLのどの部分のhtmlを抜き出すかのxpath
    chrome.storage.local.get(["url", "repo", "pass", "username"], function (result) {
        console.log(result.url, result.repo, result.pass, result.username);
        if (checkRegEx(result.url)) {//正規表現にマッチしているか？        
            console.log(result);
            main(result);
        }
    });
})();

function checkRegEx(reg) {
    //TODO:中身を作る
    //TODO:データ構造を変更
    //regはオブジェクトにする予定
    console.log(reg);
    return 1;
}
function main(d) {
    if (document.designMode == "on") {
        console.log(d);
        var src = getpagedocument("url:xpath");
        var encodesrc = window.btoa(unescape(encodeURIComponent(src)));
        if (filesendAPIararysis(d.username, d.repo, d.pass)) {
            //update
            
            
        } else {
            //create
            
            
            
        }
    } else {
        console.log("no active");
        setTimeout(main, 3000, d);
    }
}



function getpagedocument(contentxpath) {
    //設定からどこのhtml要素を読み込むか判断する。e.g. MDNならedit部分とか    
    var alldocument = document.getElementsByTagName("html")[0].innerHTML
   
    //TODO:文字列からXpathで対象のデータを抜き出して返す。
    var littlecontent = alldocument;
    return littlecontent;
}
 
//TODO:ちゃんと作る。
//ファイル名をurlから取得
function getFileName() {
    var filename = "default.html";
    var path = window.location.href;

    var arr = path.match(/.*\/(.*?\..*)/);//別解  [^/]*$
    //最後のスラッシュの前まで。
    //もし最後がスラッシュで終わってたらその前のスラッシュまでを取ってくる
    //もしそれがドメインなら取らずにdefault.htmlにする
    //もしdefault.htmlがすでにあるなら新しくランダムでHTMLを決定。
    filename = arr[1];
    return filename;

}
function getDomain() {
    var domain = [];//[第一ドメイン,第二ドメイン,第三ドメイン]
    //http or https
    if (analyseSchime() === "uri") {
        //どっかから持ってくる
      
        var arr_uri = window.location.href.match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i);
        console.log(arr_uri);
        return domain;
    }

}
//Schemeを判断します。
function analyseSchime(path) {
    var schime = "";
    path = window.location.href;

    var fileSchimeRegEx = /file:\/\/\//;
    var uriSchimeRegEx = /https?:\/\//;
    //ifでやるならやっぱtestが一番かな。str.matchはgflagがついてないと
    if (fileSchimeRegEx.test(path)) {
        //fileSchemeなら
        schime = "file";
    } else if (uriSchimeRegEx.test(path)) {
        //URI系なら
    
    
        schime = "uri";
    } else {
        throw new Error("まずいですよ！");
    }
    return schime;
}


chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.storage.local.get(["url", "repo", "pass", "username"], function (result) {
        console.log(result.url, result.repo, result.pass, result.username);
        // create2(encodesrc,result.username,result.pass,"lastremote.txt");
           
    });

});



//このファイルはどっちのメソッドで送ればいいかを判断します。
function filesendAPIararysis(username, repo, pass) {

    var arr = window.location.href.match(/.*\/(.*)(\#.*)$/);
    //arr[1];
    var arr2 = window.location.href.match(/^(.*?:\/\/)(?:(.*?)\.)*([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i);
    //arr[2]//domain
    //arr[3]//subdomain
    //TODO: getfilenameなどを使え。現在はドライバーで済ませてる。
    //    getDomain();
    //    getFileName();
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var obj = JSON.parse(this.responseText);
            if (obj.name) {
                console.log("update")
            } else if (typeof (obj.name) === undefined || obj.message == "Not Found") {
                console.log("use create")
            }

        }
    });


    xhr.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/contents/" + arr2[2] + "/" + arr[1]);
    xhr.send(null);
}

function create(encodedata, username, pass, repo, path, file) {
    var data = JSON.stringify({
        "message": "my commit message",
        "branch": "master",
        "content": encodedata
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });


    xhr.open("PUT", "https://api.github.com/repos/" + username + "/" + repo + "/contents/" + path);
    let basic = window.btoa(unescape(encodeURIComponent(username + ":" + pass)));
    xhr.setRequestHeader("authorization", "Basic " + basic);

    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}


function update(encodedata, username, pass, repo, path, file) {

    var sha = getsha1(this.path);

    var data = JSON.stringify({
        "message": "update",
        "branch": "master",
        "content": encodedata,
        "sha": sha
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });


    xhr.open("PUT", "https://api.github.com/repos/" + username + "/" + repo + "/contents/" + path);
    let basic = window.btoa(unescape(encodeURIComponent(username + ":" + pass)));
    xhr.setRequestHeader("authorization", "Basic " + basic);

    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

}


function getsha1(username, pass, repo, path, file) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });


    xhr.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/contents/" + path);
    let basic = window.btoa(unescape(encodeURIComponent(username + ":" + pass)));
    xhr.setRequestHeader("authorization", "Basic " + basic);//ていうかホントは認証もいらないんだよね
    xhr.setRequestHeader('cache-control', 'no-cache');


    xhr.send(null);
}