<?php
	header("Content-type:text/html;charset=utf-8");
	
	$username=$_POST['username'];
	$password=$_POST['password'];
	$email=$_POST['email'];
	$act=$_POST['act'];
	$content=$_POST['content'];
	
	date_default_timezone_set('Asia/Shanghai');
	
	$t=date('Y-m-d H:i:s');
	
	include("com.php");
	
	
	switch ($act){
		
		case 'reg':
		// 判断是否已注册
		$res=mysql_query("SELECT * FROM member WHERE username='".$username."'") or die("对比失败:".mysql_error());
		
		$row=mysql_fetch_array($res);//依次调用 mysql_fetch_row() 将返回结果集中的下一行，如果没有更多行则返回 FALSE。
		
		if($row){ //找到了 已经注册了
			echo "{error:1,des:'用户名已被注册!'}";	
		}else{
			// 之后注册
			$sql="INSERT INTO member ( username , password  , pic , email , regtime ) VALUES ( '{$username}','{$password}', 'images/8.jpg' ,'$email','$t')";
			$regsuccess=mysql_query($sql) or die("插入错误:".mysql_error());

			if($regsuccess){
				$log_res=mysql_query("SELECT * FROM member WHERE username='".$username."'") or die("对比失败:".mysql_error());
		
				$log_row=mysql_fetch_array($log_res);//依次调用 mysql_fetch_row() 将返回结果集中的下一行，如果没有更多行则返回 FALSE。

				//var_dump($log_row);
				
						//echo "{error:0,des:'登陆成功!',id:'".$log_row[0]."',name:'".$log_row[1]."'}";

				echo "{error:0,des:'注册成功',id:'".$log_row[0]."',pic:'".$log_row['pic']."',username:'".$log_row[1]."'}";
				

			}

		};
		break;
		
		
		case 'login':
		// 判断是否已注册
		$log_res=mysql_query("SELECT * FROM member WHERE username='".$username."'") or die("对比失败:".mysql_error());
		
		$log_row=mysql_fetch_array($log_res);//依次调用 mysql_fetch_row() 将返回结果集中的下一行，如果没有更多行则返回 FALSE。
		//var_dump($log_row);
		if($log_row){ 
			if($password==$log_row[2]){
				//setcookie('username',$log_row[1],time()+3600,'/');
				//setcookie('userid',$log_row[0],time()+3600,'/');
				echo "{error:0,des:'登陆成功!',id:'".$log_row[0]."',pic:'".$log_row['pic']."',username:'".$log_row[1]."'}";
			}else{
				echo "{error:1,des:'用户名或者密码错误!'}";		
			}
		}else{
			echo "{error:1,des:'对不起,没有此用户!'}";
		};
		break;

		case 'contact':
			// 之后注册
			$sql="INSERT INTO contact ( name , tel , content , QQ , email , reqtime ) VALUES ( '{$username}','{$tel}','{$content}','{$qq}','{$email}','$t')";
			mysql_query($sql) or die("插入错误:".mysql_error());
			
			echo "{error:0,des:'提交成功,请你耐心等待！'}";
			break;
		//default;
	};
	
		
	
?>