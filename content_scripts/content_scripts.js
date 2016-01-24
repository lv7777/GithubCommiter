//流れ
//chromestrageからデータを取ってくる→正規表現のmatch->main(繰り返し)=>onになったらanalysis=>send
(function init() {
    //setting.jsからchrome.strage.localに保存したデータの読み出し
    //TODO:"object{url:xpath}"なデータを追加urlの正規表現がキーでvalはそのURLのどの部分のhtmlを抜き出すかのxpath
    chrome.storage.local.get(["url", "repo", "pass", "username", "RegEx_Xpath_obj"], function (result) {
        console.log(result.url, result.repo, result.pass, result.username, result.RegEx_Xpath_obj);
        if (checkRegEx(result.url)) {//正規表現にマッチしているか？        
            console.log(result);
            main(result);
        }
    });
})();


//未テスト
function checkRegEx(reg) {
    //TODO:中身を作る
    //TODO:データ構造を変更
    //regはオブジェクトにする予定
    console.log(reg);
    var url = window.location.href;
    for (var i in reg) {
        if (i.test(url){
           return 1;
        }
    }
    return 0;
}
function main(d) {
    if (document.designMode == "on") {
        console.log(d);
        var src = getpagedocument(d.RegEx_Xpath_obj);
        var encodesrc = window.btoa(unescape(encodeURIComponent(src)));
        var urlobj = analyzeURL();//2回呼んでる。メモリ的にアレ
        if (filesendAPIararysis(d.username, d.repo, d.pass)) {
            //update
            update(encodesrc, d.username, d.pass, d.repo, urlobj.dirpath, urlobj.filename);
        } else {
            //create
            create(encodesrc, d.username, d.pass, d.repo, urlobj.dirpath, urlobj.filename);
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
function getFileName(o) {
    var lastdomain = o.domainarr[o.domainarr.length - 1]
    var patharr = o.patharr;
    var filename = "";
    //最後のスラッシュの前まで。
    //もし最後がスラッシュで終わってたらその前のスラッシュまでを取ってくる
    if (patharr[patharr.length - 1] === "") {
        filename = patharr[patharr.length - 2];
        if (patharr[patharr.length - 2] === lastdomain) {
            //もしそれがドメインなら取らずにdefault.htmlにする
            filename = "default.html";

            if (0) {
                //これは面倒だしその確率は殆ど無いからいいや
                //もしdefault.htmlがすでにあるなら新しくランダムでHTMLを決定。
             
            }

        }
    }

    if (0) {
        //設定に自動的に拡張子htmlをつけるにチェックが入っている場合、htmlをつける。
        filename = filename + ".html"

    }
    return filename;
}
function analyzeURL() {
    var retobj = {};
    /*
    {
        allurl:URL全て
        urlarr:各部分をarrに分割
        
    }
     */
    
    //部分に分割
    retobj.allurl = window.location.href;
    //汚いobjだなあ
    var arr = retobj.allurl.match(/^(.*?)(\:\/\/\/?)(.*?)[\:[0-9]*]?(\/.*?)?$/i);//でもこれよく考えたら認証情報がドメインパートにはいってるな
    retobj.urlarr = arr;
    retobj.schimeonly = arr[1];
    retobj.urisubpart = arr[2];
    retobj.domainall = arr[3];
    retobj.pathall = arr[4];

    retobj.domainarr = retobj.domainall.split(".");
    retobj.patharr = retobj.pathall.split("/");
    retobj.filename = getFileName(retobj);

    retobj.dirpath = retobj.domainarr.join("/");
    return retobj;
}


chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.storage.local.get(["url", "repo", "pass", "username"], function (result) {
        console.log(result.url, result.repo, result.pass, result.username);
    });
});



//このファイルはどっちのメソッドで送ればいいかを判断します。
function filesendAPIararysis(username, repo, pass) {
    var obj = analyzeURL();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var obj = JSON.parse(this.responseText);
            if (obj.name) {
                console.log("update")
                return 1;
            } else if (typeof(obj.name) === undefined || obj.message == "Not Found") {
                console.log("use create")
                return 0;
            }

        }
    });


    xhr.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/contents/" + obj.dirpath + "/" + obj.filename);
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