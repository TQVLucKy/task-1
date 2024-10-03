<!--Cho trước số nguyên n. tạo mảng n phần tử, 
phần tử chẵn (từ 0) là cấp số cộng công sai -0.5số lẽ -1. -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="" method="POST">
        <input type="number" name="n" value="1">
        <input type="submit" value="in">
    </form>
    <?php
    $arr[0]=1;
    if (isset($_SERVER["REQUEST_METHOD"])=="POST") {
        if (isset($_POST["n"]) && is_numeric($_POST["n"]) &&  $_POST["n"]>0) {
            $num = $_POST["n"];
            for($i=1;$i<$num;$i++){
                if($i%2==0){
                    $arr[$i]=$arr[$i-2]-0.5;
                }
                else{
                    $arr[$i]=-1;
                }
            }
            for($i=0;$i<$num-1;$i++){
                echo $arr[$i].", ";
            }
            echo $arr[$num-1];
        }
        else{
            echo "vui lòng nhập một số nguyên dương";
        }
    }
    ?>
</body>

</html>