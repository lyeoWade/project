<?php

	include "../phpdata/datapage/com.php";
	
	$type     = $_POST['type'];
	$times     = $_POST['times'];
	//echo $hotid;
	switch($type){
		case 'first':
			$first="SELECT * FROM first WHERE playtime like '%$times%' order by playtime ASC";

			


			$query=mysql_query($first);
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				$hometeamName=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["hometeam"]."'")) or die("查询主队失败:".mysql_error());
				$guestteamName=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestteam"]."'")) or die("查询客队失败:".mysql_error());



				$result[$i]="{'id':'".$row["id"]."','hometeam':'".$row["hometeam"]."','homelogo':'".$hometeamName["logo"]."','hometeamName':'".$hometeamName["team"]."','guestteam':'".$row["guestteam"]."','guestlogo':'".$guestteamName["logo"]."','guestteamName':'".$guestteamName["team"]."','hC':'".$row["hC"]."','hPF':'".$row["hPF"]."','hSF':'".$row["hSF"]."','hSG':'".$row["hSG"]."','hPG':'".$row["hPG"]."','gC':'".$row["gC"]."','gPF':'".$row["gPF"]."','gSF':'".$row["gSF"]."','gSG':'".$row["gSG"]."','gPG':'".$row["gPG"]."','playtime':'".$row["playtime"]."','league':'".$row["league"]."'}";
				$i++;									
			};
			$a=json_encode($result);
			//var_dump($a);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
		break;
	};
?>