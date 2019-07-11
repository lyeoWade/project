

$(function(){
	//ajaxreq('times');
	
	listclick();
	function listclick(){
		$('.teamList li').each(function(index, element) {
			$('.teamList li').eq(index).on('click',function(){
				$('.showChoose').html($(this).html());

				var teamID=$(this).find('a').attr('teamid');
				ajaxreq(teamID);
				$('.teamList').eq(0).css('display','none');	
			});
		});
	};
	$('.sorttype').each(function(index, element) {
		$('.sorttype').eq(index).on('click',function(event){
			$('.sorttype').removeClass('active');
			$(this).addClass('active');	
			var oList=$(this).next(".teamList");
			if(oList.html()!=undefined){
				event.stopPropagation();
				oList.css('display','block');	
			}else{
				ajaxreq('times');	
			}
		});
	});	
	$(document.body).on('click',function(){
		$('.teamList').css('display','none');	
	});
	
	
	
	
	
});

function ajaxreq(teamID){

	var datas="type=GetInjuriesList&teamID="+teamID;

	$.ajax({
		url:'../phpdata/datapage/nbainj.php',
		type:"POST",
		beforeSend: function(data){
			loading();
		},
		data:datas,
		success: function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			var reqdata=eval('('+data+')');
			if(reqdata.counts==0){
				$('#tbody').html("<p style='line-height:100px; text-align:center; width:1100px;'>暂无伤病信息</p>");
			}else{
				var str='';
				for(var i=0; i<reqdata.result.length; i++){
					var detaildata=eval('('+reqdata.result[i]+')');
					str+='<tr><td class="w130">'+detaildata.teamName+'</td>\
	                     <td class="w130">'+detaildata.player+'</td>\
	                     <td class="w130">'+detaildata.state+'</td>\
	                     <td class="w230">'+detaildata.reason+'</td>\
	                     <td class="w480">'+detaildata.timetable+'</td></tr>';
				}
				$('#tbody').html(str);
			}
			console.log(reqdata);
			
		}
	});	
}

