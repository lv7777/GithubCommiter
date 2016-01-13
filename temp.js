(function check() {
  if (document.designMode == 'on') {
    console.log('ok');
    autosave();
  } else {
    console.log('まだあわてるような時間じゃない');
    setTimeout(check, 10000);
  }
}) ();
function autosave() {
  console.log('in')
  var src = document.getElementsByTagName('html') [0].innerHTML;
  //indexedDB(src);
  blobfile2(src);
  setTimeout(autosave, 10000);
}


//////////////////////////////////////////////新しく作りなおす

class Github{
  contructor(username, password, savedir, name, path) {
  
  }
  
  //このファイルはどっちのメソッドで送ればいいかを判断します。
  filesendAPIararysis(){
    
  }
  
  create(data) {
  
    var data = JSON.stringify({
  "message": "my commit message",
  "branch": "master",
  "content": "bXkgbmV3IGZpbGUgY29udGVudHM="
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("PUT", "https://api.github.com/repos/lv7777/WebOS/contents"+path);
xhr.setRequestHeader("authorization", "Basic bHY3Nzc3OmltaW5vNzFtb2ppcmV0dW51bGw=");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
    
xhr.send(data);
    
    
    
    
  }
  update(data) {
    
    var sha = getsha1(this.path);
    
    var data = JSON.stringify({
  "message": "update",
  "branch": "master",
  "content": "bXkgbmV3IGZpbGUgY29udGVudHM=",
  "sha": sha
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("PUT", "https://api.github.com/repos/lv7777/WebOS/contents/test.txt");
xhr.setRequestHeader("authorization", "Basic bHY3Nzc3OmltaW5vNzFtb2ppcmV0dW51bGw=");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
    
  }
  
  
  getsha1() {
    
    var data = new FormData();
    data.append('branch', 'master');
    data.append('message', 'frompowershell');
    data.append('content', 'aGVsbG8=');
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open('GET', 'https://api.github.com/repos/lv7777/WebOS/contents/test.txt');
    xhr.setRequestHeader('authorization', 'Basic bHY3Nzc3OmltaW5vNzFtb2ppcmV0dW51bGw=');
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.setRequestHeader('postman-token', '91b531c5-dcd4-b49d-4216-99e616f8eda1');
    xhr.send(data);
    
  }
  
}

//localに保存するclass
class Local{

savelocalstrage(data) {
  if (('localStorage' in window) && (window.localStorage !== null)) {
    // ローカルストレージが使える
    window.localStorage.setItem('backup', data);
    console.log('localstrageに保存しました');
  } else {
    // 使えない。。。
    alert('!?')
  }
}
  
/*
//this function will delete
saveindexedDB(data) {
  alert('ok?')
  var db = new Dexie('backupDB');
  var dbStructure = {
    backup: 'length,data,date'
  }
  //storesがtableか。だったら tableにしろよな

  db.version(1).stores(dbStructure);
  db.open().catch (function (error) {
    alert('Uh oh : ' + error);
  });
  db.backup.add(dbAddObject);
  var dbAddObject = {
    length: data.length,
    data, //es6
    date: new Date()
  }
  console.log(new Date())
}
*/
  
savelocal(data) {
  var text = 'テキストデータ';
  var blob = new Blob([text], {
    type: 'text/plain'
  }); // バイナリデータを作ります。
  // IEか他ブラウザかの判定
  if (window.navigator.msSaveBlob)
  {
    // IEなら独自関数を使います。
    window.navigator.msSaveBlob(blob, 'ファイル名.txt');
  } else {
    // それ以外はaタグを利用してイベントを発火させます
    var a = document.createElement('a');
    var e = document.createEvent('MouseEvent');
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = 'ファイル名.txt';
    e.initEvent('click', false, true);
    a.dispatchEvent(e);
  }
}
  
  fileSystemAPI(data) {
  
  
  }
  
  xpcom(data) {
    
    
    
    
  }

  
}

//htmlの状態を判断したり色々するクラス
class Handan{
 
  //ファイル名をurlから取得
getFileName(){
  var filename="default.html";
  var path=window.location.href;
  
    var arr=path.match(/.*\/(.*?\..*)/);//別解  [^/]*$
    //最後のスラッシュの前まで。
    filename=arr[1];
  return filename;
  
}
  getDomain(){
    
    //http or https
    if(analyseSchime()==="uri"){
      //どっかから持ってくる
      
     var arr_uri = url.match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i);
	   console.log(arr_uri);
      return arr_uri[3];
    }
    
  }
  //Schemeを判断します。
  analyseSchime(path){
    var schime="";
    
    
  var fileSchimeRegEx=/file:\/\/\//;
  var  uriSchimeRegEx=/https?\/\//;
  //ifでやるならやっぱtestが一番かな。str.matchはgflagがついてないと
  if( fileSchimeRegEx.test(path) ){
    //fileSchemeなら
    schime="file";
  }else if( uriSchimeRegEx.test(path) ){
    //URI系なら
    
    
    schime="uri";
  }else{
    throw new Error("まずいですよ！";)
  }
  return schime;
    
  }
  
}

/////////////////////////
(function main(){
  console.log("hello!");
  configload(); 
  init();
})();

//各種クラスのインスタンス化を担当します。エラーを判断します。
function init(){
  
}
//configをロードします。
function configload(){
  
}