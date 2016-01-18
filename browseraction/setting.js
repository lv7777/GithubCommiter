$(function () {
    
    //alert(jQuery);//ok
    $github_checkbox = $("#githubon");
    $local_checkbox = $("#localon");


    $ltime = $("#localtime");
    $gtime = $("#githubtime");
    $url = $("#url");
    $url.click(function (e) {
        //クリックされると<input>が増える。
        //tureはeventもコピーするか
        $(this).clone(true).insertAfter(this);
    })
    $repo = $("#repo");
    $pass = $("#pass");
    $username = $("#username");

    $local_checkbox.click(background);
    $github_checkbox.click(background);
    function background(e) {
        //onにすると設定ができるようになる。
    }
    $(".save").click(checkmain);

    function checkmain(e) {
       console.log("checkmain");
       last(true);
       // check_inputdata();
        //sendgithub();
    }
    
    //データがちゃんと入力されているかどうか。
    function check_inputdata(){
        $ltime = $("#localtime");
        $gtime = $("#githubtime");
        $url = $("#url");
        $repo = $("#repo");
        $pass = $("#pass");
        $username = $("#username");
        let inputarray = [$ltime, $gtime, $url,$repo,$pass,$username];
        
        for(let i of inputarray){            
            if(i.val()===""){

                inputerror(i);
            }
        }
        
        
        
    }

    function sendgithub() {
        var user = $("#username").val();//.text();
        //inputにはval()を使う
        var xhr = new XMLHttpRequest();

        console.log($("#username"));
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var res = JSON.parse(this.responseText);
                last(dataparse(res))

            }
        });

        xhr.open("GET", "https://api.github.com/users/" + user + "/repos");
        xhr.send(null);

    }


    function dataparse(res) {
        let flag = false;
    
        //xhrで帰ってきたオブジェクトを整形して確認する。
        console.log(res);
        //配列にonjが入っている。
        //console.log(res.name);
        for (let data of res) {
            alert(data.name + "   " + $("#repo").val())
            if (data.name === $("#repo").val()) {
                alert("ありますねぇ！");
                flag = true;
            }
            return flag;
        }
    }


        function last(bool) {
            if (bool) {
                //あったらlocalstrageに保存
                
                $ltime = $("#localtime");
                $gtime = $("#githubtime");
                $url = $("#url");
                $repo = $("#repo");
                $pass = $("#pass");
                $username = $("#username");
                let inputarray = [$ltime, $gtime, $url, $repo, $pass, $username];
        
                //:TODO localstrageが使えるかの確認
                
                //もしかしたらbackgroundscriptに投げることが必要かも
                for (let i of inputarray) {
                    localStorage.setItem(i.attr("id"),i.val())
                }
                
            } else {
        
                //なければダイアログを出す。
                //エラーが出てる部分の上に赤い文字でエラーを出したり、inputを赤くする。
            }

        }


        function inputerror(jq){
             //エラーが出てる部分の上に赤い文字でエラーを出したり、inputを赤くする。
            // jq.after("未入力です。")
             jq.css("border-color","#fb4721");
             jq.css("box-shadow","inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(233, 102, 102, 0.6)");
        }
        
    });


