$(function(){
    
alert(jQuery);//ok
$github_checkbox=$("#githubon");
$local_checkbox=$("#localon");


$ltime=$("#localtime");
$gtime=$("#githubtime");
$url=$("#url");
$repo=$("#repo");
$pass=$("#pass");
$username=$("#username");

$local_checkbox.click(background);
$github_checkbox.click(background);
function background(e){
    //onにすると設定ができるようになる。
}
$(".save").click(check);
function check(e){
    if(check_to_github()){
        
    //あったら保存
    }else{
        
    //なければダイアログを出す。
        
    }
    
}
function check_to_github(){
    //username,password,ripoを読みだし,fetchで確認。
    if(1){
        return 1;
    }else{
        return 0;
    }
}
    
    
});
