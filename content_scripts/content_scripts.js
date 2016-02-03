function getdata(){
    //設定からどこのhtml要素を読み込むか判断する。e.g. MDNならedit部分とか    
   var d = document.getElementsByTagName("html")[0].innerHTML;
   return d;
}
 
  //ファイル名をurlから取得
function getFileName(){
  var filename="default.html";
  var path=window.location.href;
  
    var arr=path.match(/.*\/(.*?\..*)/);//別解  [^/]*$
    //最後のスラッシュの前まで。
    filename=arr[1];
  return filename;
  
}
function getDomain(){
    
    //http or https
    if(analyseSchime()==="uri"){
      //どっかから持ってくる
      
     var arr_uri = url.match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i);
	   console.log(arr_uri);
      return arr_uri[3];
    }
    
  }
  //Schemeを判断します。
function  analyseSchime(path){
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
    throw new Error("まずいですよ！");
  }
  return schime;  
}




//(
function check(){
    if(1){//正規表現にマッチしているか？
        
        if (/*document.designMode == "on"*/  1) {
            console.log("ok");
            var src = getdata();
            //sendbackgroundscript( getFileName(),getDomain(),src);
            var encodesrc=window.btoa(unescape(encodeURIComponent(src)))
            
            

            chrome.storage.local.get(["url","repo","pass","username"], function (result) {
                console.log( result.url,result.repo, result.pass, result.username);
               // create2(encodesrc,result.username,result.pass,"lastremote.txt");
           
            });
            
        } else {
            console.log("no active");
            setTimeout(check, 3000);
        } 
        
    }

}
//)();


//sconsole.log("?");
check();

/*
  function create(encodedata) {
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

        xhr.open("PUT", "https://api.github.com/repos/lv7777/WebOS/contents/firstextension2.txt");
        xhr.setRequestHeader("authorization", "Basic bHY3Nzc3OmltaW5vNzFtb2ppcmV0dW51bGw=");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);




    }

 

*/
  function create2(encodedata,username,pass,path) {
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

        xhr.open("PUT", "https://api.github.com/repos/"+username+"/WebOS/contents/"+path);
        let basic=window.btoa(unescape(encodeURIComponent(username+":"+pass)));
        xhr.setRequestHeader("authorization", "Basic "+basic);
        
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);




    }


chrome.storage.onChanged.addListener(function(changes, namespace) {

/*            
                    for (var key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
 */           
            chrome.storage.local.get(["url","repo","pass","username"], function (result) {
                console.log(result.url,result.repo, result.pass, result.username);
               // create2(encodesrc,result.username,result.pass,"lastremote.txt");
           
            });
            
});