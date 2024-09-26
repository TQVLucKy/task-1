$("input[type='submit']").click(function(){
    event.preventDefault();
    var s= $("textarea").val();
    var t="";
    t.trim()
    s=s.split(" ");

    for(var i=s.length-1;i>=0;i--){
        var indexrandom=(Math.floor(Math.random()*s.length));
        var textrandom= s[indexrandom];
        t+= textrandom +" ";
        s.splice(indexrandom,1);
    }
    $("p").text(t.trim());
})