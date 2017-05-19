$(function () {
//保存变量
	var cardLi = document.getElementsByClassName('card-ul')[0].getElementsByTagName('li'); //所有一级卡片
	var cardIndexCon = document.getElementsByClassName('card-index-con'); //一级卡片对应的所有容器
	var card1Title = document.getElementsByClassName('card1-title')[0].getElementsByTagName('a'); //第一级卡片中所有的卡片
	var card1Body = document.getElementsByClassName('card1-body'); //第一级卡片中所有的卡片对应的容器
	
	//动态注册切换一级卡片的事件
	for (var i = 0, iL = cardLi.length; i < iL; i++) {
		(function () {
			var thisObj = cardLi[i];
			var thisIndex = i;
			cardLi[i].onclick = function () {
				switchLevelCard(cardLi, cardIndexCon, thisObj, thisIndex, 1);
			};
		})();
	}
	//动态注册切换第一级卡片中所有卡片的事件
	for (var si = 0, siL = card1Title.length; si < siL; si++) {
		(function () {
			var thisObj = card1Title[si];
			var thisIndex = si;
			card1Title[si].onclick = function () {
				switchLevelCard(card1Title, card1Body, thisObj, thisIndex, 2);
			}
		})();
	}
	
	//切换卡片时执行的方法，卡片的数量和顺序要和卡片对应容器的数量和顺序一致
	//level 标志切换的是哪个卡片
	function switchLevelCard(cardList, cardCon, thisObj, index, level) {
		if (thisObj.className == 'actived') { return;}
		for (var k = 0, kL = cardList.length; k < kL; k++) {
			cardList[k].className = '';
			cardCon[k].style.display = 'none';
		}
		thisObj.className = 'actived';
		cardCon[index].style.display = 'block';
		//如果是切换视频容器，如果没有结束就暂停播放，当前视频自动播放
		if (level == 2) {
			if (index == 0) {
				!myPlayer2.ended() && myPlayer2.pause() && myPlayer1.play();
			} else if (index == 1) {
				!myPlayer1.ended() && myPlayer1.pause() && myPlayer2.play();
			}
		} else if (level == 1) {
			// 如果不是切换的视频容器，两个视频都暂定播放
			!myPlayer2.ended() && myPlayer2.pause();
			!myPlayer1.ended() && myPlayer1.pause();
		}
	}
	
	//初始化课程目录树
	var treeObj1 = $("#treeDemo1");
	$.fn.zTree.init(treeObj1, setting1, zNodes1);
	$("#treeDemo1_2_a").addClass("curSelectedNode");//默认播放第二个节点的视频即id为11的视频
	
	var treeObj2 = $("#treeDemo2");
	$.fn.zTree.init(treeObj2, setting2, zNodes2);
	$("#treeDemo2_2_a").addClass("curSelectedNode");//默认播放第二个节点的视频即id为11的视频
	
	//初始化视频播放
	var myPlayer1 = videojs('my-video1'); //创建播放实例
	var myPlayer2 = videojs('my-video2'); //创建播放实例
	myPlayer1.ready(function(){
		myPlayer1.play(); // 这里自动播放
	});
	myPlayer2.ready(function(){
		//myPlayer2.play(); // 这里自动播放
	});
	
	//页面滚动时改变导航条的透明度
	var navigator = document.getElementById('navigator');
	var last_known_scroll_position = 0;
	var ticking = false;
	$(document).scroll(function () {
		last_known_scroll_position = $(document).scrollTop();
		if (!ticking) {
			window.requestAnimationFrame(function() {
				controlNavOpacity(last_known_scroll_position);
				ticking = false;
			});
		}
		ticking = true;
	})
	function controlNavOpacity (scrollY) {
		if (scrollY >= 50 && !$(navigator).hasClass('opacity')) {
			$(navigator).addClass('opacity')
		} else if (scrollY < 50 && $(navigator).hasClass('opacity')) {
			$(navigator).removeClass('opacity')
		}
	}
});