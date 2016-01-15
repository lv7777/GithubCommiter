$(function(){
    
//alert(jQuery);//ok
$github_checkbox=$("#githubon");
$local_checkbox=$("#localon");


$ltime=$("#localtime");
$gtime=$("#githubtime");
$url=$("#url");
$url.click(function (e){
    //クリックされると<input>が増える。
    //tureはeventもコピーするか
    $(this).clone(true).insertAfter(this);
})
$repo=$("#repo");
$pass=$("#pass");
$username=$("#username");

$local_checkbox.click(background);
$github_checkbox.click(background);
function background(e){
    //onにすると設定ができるようになる。
}
$(".save").click(checkmain);

function checkmain(e){
    console.log("fe");
    sendgithub()
}

function sendgithub(){
    console.log("fefe");
    var user=$username;
    
   var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
      
      var res=JSON.parse(this.responseText);
      dataparse(res)

  }
});

xhr.open("GET", "https://api.github.com/users/"+user+"repos");
xhr.send(null);
     
}


function dataparse(res){
    //xhrで帰ってきたオブジェクトを整形して確認する。
    console.log(res);
    console.log(res.name);

    
    if(1){
        return 1;
    }else{
        return 0;
    }
}
    
    
});


function last(bool){
    if(0){
        
    //あったら保存
    }else{
        
    //なければダイアログを出す。
    //エラーが出てる部分の上に赤い文字でエラーを出したり、inputを赤くする。
    }
    
}