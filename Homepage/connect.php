<?php
    $name = $_POST['name'];
    $street = $_POST['street'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $phone = $_POST['phone'];

    //connect to db
    $conn = new mysqli('localhost', 'root', '', 'customer_order');
    //check for connection
    if($conn->connect_error){
        echo "$conn->connect_error";
        die('Connection Failed : ' $conn->connect_error );
    }
    //insert data into db table
    else{
        $stmt = $conn->prepare("insert into orders(cust_name, street, city, state, phone)
        values(?,?,?,?,?)");
        $stmt->bind_param("ssssi", $name,$street,$city,$state,$phone);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
        //close connections
		$stmt->close();
		$conn->close();
    }
?>

