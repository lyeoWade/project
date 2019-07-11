<?php

include "com.php";
date_default_timezone_set('Asia/Shanghai');
	
$t=date('Y-m-d H:i:s');
$type=$_POST['type'];
$ids=$_POST['id'];  

//"act=NbaInj&team="+oTeam+"&timetable="+oTime.val()+"&reason="+oReason.val()+"&state="+oState.val()+"&player="+oPlayer.val();
switch($type){
	case 'NbaInj':
		$team=$_POST['team'];
		$player=$_POST['player'];
		$timetable=$_POST['timetable'];
		$reason=$_POST['reason'];
		$state=$_POST['state'];
		$sql="INSERT INTO injuries_nba ( 
			team , player , state  , reason , timetable ,datetime
		) VALUES ( 
			'{$team}','{$player}','{$state}','{$reason}' , '{$timetable}' , '{$t}'
		)";
		$error=mysql_query($sql) or die("插入错误:".mysql_error());
		if($sql){
			echo '"发布成功"';
		}else{
			echo '"发布失败"';
		}
	break;
	case 'GetInjuriesList':

		$teamID=$_POST['teamID'];
		//var_dump($teamID);
		if($teamID){
			$newTeamname="WHERE team = ".$teamID;
		}else{
			$newTeamname="";
		};
		$Injuries="SELECT * FROM injuries_nba ".$newTeamname." ORDER BY datetime desc";
//<b>Warning</b>:  mysql_fetch_array(): supplied argument is not a valid MySQL result resource in <b>C:\wamp\www\nba2\phpdata\datapage\nbainj.php</b> on line <b>52</b><br />


		$time="SELECT * FROM injuries_nba ORDER BY datetime  desc limit 1";

		
		$times=mysql_query($time) or die("获取失败:".mysql_error());

		$query=mysql_query($Injuries) or die("获取失败:".mysql_error());
		$i=0;
		$result=array();
		while ($row=mysql_fetch_array($query)) {
			
			//var_dump($row['team']);
			
			$teamName=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id=".$row['team'].""));

			//var_dump($teamName);

			$result[$i]="{'id':'".$row["id"]."','teamid':'".$row["team"]."','teamName':'".$teamName["team"]."','player':'".$row["player"]."','state':'".$row["state"]."','reason':'".$row["reason"]."','timetable':'".$row["timetable"]."','datetime':'".$row["datetime"]."'}";
			$i++;
		}
		

		while ($rows=mysql_fetch_array($times)) {
			
			$newTime=$rows['datetime'];
			
		}


		
		$arr=json_encode($result);
		echo '{"result":'.$arr.',"counts":'.count($result).',"newTime":"'.$newTime.'"}';
	break;
	case 'deletes':
			deletesfn('injuries_nba',$ids);
	break;	
	case 'oneInjPlayer':
		$oneInjPlayer="SELECT * FROM injuries_nba WHERE id=".$ids;
		$query=mysql_query($oneInjPlayer) or die("获取失败:".mysql_error());
		if($query){
			while ($row=mysql_fetch_array($query)) {

				$teamName=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id=".$row['team'].""));

				echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"team"=>$row['team'],"teamName"=>$teamName['team'],"player"=>$row['player'],"state"=>$row['state'],"reason"=>$row['reason'],"timetable"=>$row['timetable'],"datetime"=>$row['datetime']));
			}
		}else{
			echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
		}
	break;
	case 'UpdateInj':

		$teamId=$_POST['team'];
		$timetable=$_POST['timetable'];
		$reason=$_POST['reason'];
		$state=$_POST['state'];
		$player=$_POST['player'];
		$teamId=$_POST['team'];
		$teamId=$_POST['team'];

		$UpdateInj='UPDATE injuries_nba SET team="'.$teamId.'",player="'.$player.'",state="'.$state.'",reason="'.$reason.'",timetable="'.$timetable.'",datetime="'.$t.'"  WHERE id='.$ids;

			$query=mysql_query($UpdateInj) or die("更新失败:".mysql_error());
		if($query){
			echo_status(array("respondCode"=>"0","respondMsg"=>"更新成功！"));
			
		}else{
			echo_status(array("respondCode"=>"1","respondMsg"=>"更新失败"));
		}
		break;
}


?>