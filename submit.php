<?php
if(!($_SERVER["REQUEST_METHOD"] == "POST")){
    header("Location: /index.html");
} else {
    $firstname = $_REQUEST['firstname'];
    $lastname = $_REQUEST['lastname'];
    $country = $_REQUEST['country'];
    $email = $_REQUEST['email'];
    $subject = $_REQUEST['subject'];

    // enter data to db

    echo "Successful entry";
}