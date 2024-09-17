<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>

<body>
    <b>Contact Us</b>
    <form method="POST" action="">
        <table>
            <tr>
                <td colspan="3">
                    <label for="name">Your Name (required)</label><br>
                    <input type="text" name="name" placeholder="enter your name" required>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="number">Your Phone Number</label><br>
                    <input type="number" name="number" placeholder="enter your phone number">
                </td>
                <td>
                    <label for="email">Your Email (required)</label><br>
                    <input type="email" name="email" placeholder="enter your email" required>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="Major">Major</label><br>
                    <select name="major">
                        <option value="1">Computer science</option>
                        <option value="2">Computer science 2</option>
                        <option value="3">Computer science 3</option>
                        <option value="4">Computer science 4</option>
                    </select>
                </td>
                <td>
                    <label for="location">Location to study</label><br>
                    <select name="location">
                        <option value="1">New York</option>
                        <option value="2">Hue</option>
                        <option value="3">Ha Noi</option>
                        <option value="4">Ho Chi Minh</option>
                        <option value="5">Quang Tri</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Register to</label>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input name="checkbox[]" type="checkbox" value="Study">
                    <label class="register">Study</label>
                    <input name="checkbox[]" type="checkbox" value="Take a tour">
                    <label class="register">Take a tour</label>
                    <input name="checkbox[]" type="checkbox" value="Consult">
                    <label class="register">Consult</label>
                </td>
            </tr>
            <tr>
                <td><input type="submit" value="Submit"></td>
            </tr>
        </table>
    </form>
    <?php
    // if ($_SERVER["REQUEST_METHOD"] === "GET" && !empty($_GET)) {
    //     echo "Your Name:" . htmlspecialchars($_GET["name"]) . "<br>";
    //     echo "Your Phone Number:" . htmlspecialchars($_GET['number']) . "<br>";
    //     echo "Your Email:" . htmlspecialchars($_GET['email']) . "<br>";
    //     echo "Major:" . htmlspecialchars($_GET["major"]) . "<br>";
    //     echo "Location:" . htmlspecialchars($_GET["location"]) . "<br>";
    //     if ($_GET["checkbox"]) {
    //         foreach ($_GET["checkbox"] as $selected)
    //             echo "Register to: " . htmlspecialchars($selected) . "<br>";
    //     }
    //     else echo "No register .";
    // }

    if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST)) {
        echo "Your Name:" . htmlspecialchars($_POST["name"]) . "<br>";
        echo "Your Phone Number:" . htmlspecialchars($_POST['number']) . "<br>";
        echo "Your Email:" . htmlspecialchars($_POST['email']) . "<br>";
        echo "Major:" . htmlspecialchars($_POST["major"]) . "<br>";
        echo "Location:" . htmlspecialchars($_POST["location"]) . "<br>";
        if ($_POST["checkbox"]) {
            foreach ($_POST["checkbox"] as $selected)
                echo "Register to: " . htmlspecialchars($selected) . "<br>";
        }
        else echo "No register .";
    }
    ?>
</body>

</html>