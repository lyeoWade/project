
<?php
	header('Cache-control:private,must-revalidate');
	header("Content-type: text/html; charset=utf-8"); 

	include "com.php";

	$t=date('Y-m-d H:i:s');

	$act  =htmlspecialchars($_POST['act']);
	$ids    =htmlspecialchars($_POST['ids']);
	$column     =htmlspecialchars($_POST['column']);
	$arc_id  =htmlspecialchars($_POST['arc_id']);
	$user_id    =htmlspecialchars($_POST['user_id']);

	echo $act;

	//获取评论列表 返回给前端-----------

	switch($act){

		case 'conmentAdd':
			$sql="INSERT INTO comment ( content ,column, c_time , user_id , arc_id ) VALUES ( '{$content}','{$column}','{$t}','{$user_id}','$arc_id')";
			$desc=mysql_query($sql) or die("插入错误:".mysql_error());
			if($desc){
				echo '{"rcode":"1","desc":"发布成功"}';	
			}else{
				echo '{"rcode":"0","desc":"发布失败"}';	
			}
		break;
		
		// 评论
		case 'conmentList':
			$z_sql="SELECT * FROM comment  WHERE arc_id=".$arc_id." and column=".$column." order by c_time desc";
		    $sql=mysql_query($z_sql) or die ("查询失败");
		    $i=0;
			$result=array();
			var_dump($sql);
			while($row=mysql_fetch_array($sql)){
				
				$c_username=mysql_fetch_array(mysql_query("SELECT * FROM blong_logon WHERE id='".$row["user_id"]."'"));
				
				$result[$i]="{'id':'".$row["id"]."','content':'".$row["content"]."','times':'".$row["c_time"]."','username':'".$c_username["username"]."','userid':'".$row["user_id"]."'}";
				$i++;
				
			};
			
			$a=str_replace('\n',"<br/>",json_encode($result));
			echo '{"result":'.$a.',"counts":'.count($result).'}';
		  
		break;
		// case 'deletes':
		// 	$deletes=mysql_query("DELETE FROM comment WHERE id = ".$ids."") or die('2'.mysql_error());
		// 	if($deletes){
		// 		echo '{"des":"1"}';	
		// 	}else{
		// 		echo '{"des":"0"}';	
		// 	}
		// break;
	}
		

?>