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
    throw new Error("まずいですよ！";)
  }
  return schime;
    
  }
  
}




(function check(){
  if(document.designMode=="on"){
    console.log("ok");
    var src = getdata();
    sendbackgroundscript( getFileName(),getDomain(),src);
  }else{
      console.log("no active");
      setTimeout(check,3000);
  } 
})();


