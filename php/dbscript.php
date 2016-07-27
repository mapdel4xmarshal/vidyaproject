<?php

$connection = mysqli_connect("localhost","bmtool_vidya","vidya01","bmtool_vidya");
if (mysqli_connect_errno())
{
    echo "Failed to connect to DB Server : " . mysqli_connect_error();
}


if($_POST['createUser'])
{
     $result = mysqli_query($connection,"SHOW TABLES LIKE 'users'") or die(mysql_error());
     //$tableExists = mysqli_num_rows($result);// > 0;    
    
    if(mysqli_num_rows($result) > 0)
    {
        $db_fid = $_POST['createUser'];
        $sql = "SELECT fid FROM users WHERE fid = '". $db_fid . "'";
        $result = mysqli_query($connection,$sql);

        if($result && mysqli_num_rows($result) > 0)
        {
            
        }
        else
        {
            $sql = "INSERT INTO users VALUES ('','" . $_POST['createUser'] . "','". $_POST['firstname'] ."','". $_POST['lastname'] ."','". $_POST['email'] ."')";
            $result = mysqli_query($connection,$sql);
            
            $sql = "INSERT INTO answers VALUES ('','" . $_POST['answer1'] . "','". $_POST['answer2'] ."','". $_POST['coord1'] ."','". $_POST['coord2'] ."')";
		$result = mysqli_query($connection,$sql);
        }
    }
    else
    {
        $sql = "CREATE table users (
                     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                     fid VARCHAR(30) NOT NULL,
                     firstname VARCHAR(30) NOT NULL,
                     lastname VARCHAR(30) NOT NULL,
                     email VARCHAR(50)
                 )";
            $mresult = mysqli_query($connection,$sql);            
            
            if($mresult)
            {
                $sql = "INSERT INTO users VALUES ('','" . $_POST['createUser'] . "','". $_POST['firstname'] ."','". $_POST['lastname'] ."','". $_POST['email'] ."')";
                $result = mysqli_query($connection,$sql);   
                
                if($result)
            	{
                
	                $sql = "CREATE table answers (
	                     id INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	                     fid VARCHAR(30) NOT NULL,
	                     answer1 VARCHAR(50) NOT NULL,
	                     answer2 VARCHAR(50) NOT NULL,
	                     coordinate1 VARCHAR(60) NOT NULL,
	                     coordinate2 VARCHAR(60) NOT NULL
	                 )";
	            	$mresult = mysqli_query($connection,$sql); 
	            	
	            	if($mresult)
		            {
		                $sql = "INSERT INTO answers VALUES ('','"  . $_POST['createUser'] . "','". $_POST['answer1'] . "','". $_POST['answer2'] ."','". $_POST['coord1'] ."','". $_POST['coord2'] ."')";
		                $result = mysqli_query($connection,$sql);  
	           	    } 		            	
	            	
                }                             
            }
    }
}

if($_POST['getQuestion'])
{
    $sql = "SELECT * FROM surveyQuestions";
    $result = mysqli_query($connection,$sql);
    
    if($result && mysqli_num_rows($result) > 0)
    {
        $row = array();$i = 0;
        while($rows = mysqli_fetch_row($result)){
            $row[$i] = $rows;
            $i++;
        }
        echo json_encode($row);
    }
    else
    {
        $result = mysqli_query($connection,"SHOW TABLES LIKE 'surveyQuestions'");
                
        $tableExists = mysqli_num_rows($result) > 0;
        
        if(!$tableExists)
        {
            $sql = "CREATE table surveyQuestions (
                     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                     question VARCHAR(300) NOT NULL
                     ) ";
            $mresult = mysqli_query($connection,$sql);
        }
        if($mresult || $tableExists)
        {
            $sql = "INSERT INTO surveyQuestions VALUES ('','Type the name of your favourite location in Hanover and indicate it on the map with a pin');
            INSERT INTO surveyQuestions VALUES ('','Type the name of your least favourite location in Hanover and indicate it on the map with a pin');";
            
            $result = mysqli_multi_query($connection,$sql) or die(mysql_error()); 
            $result = mysqli_query($connection,"SELECT * FROM surveyQuestions") or die(mysql_error());
            
            if($result && mysql_num_rows($result) > 0)
            {
                echo $query;
            }
        }
    }
}


mysqli_close($connection);
?>