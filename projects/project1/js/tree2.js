/**
 * 树形结构参数设置
 */

var IDMark_A = "_a";
var setting1 = {
	view: {
		showLine: false,
		showIcon: true,
		selectedMulti: false, // 同时只能选中一个节点
		dblClickExpand: false, // 双击节点时，是否自动展开父节点的标识
		addDiyDom: addDiyDom1
	},
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pId",
			rootPId: 0
		}
	},
	callback: {
		beforeClick: beforeClick1, // 一级节点可以展开收拢
		onClick: onClick1 // 点击节点切换视频播放
	}
};
var setting2 = {
	view: {
		showLine: false,
		showIcon: true,
		selectedMulti: false,
		dblClickExpand: false,
		addDiyDom: addDiyDom2
	},
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pId",
			rootPId: 0
		}
	},
	callback: {
		beforeClick: beforeClick2, // 点击节点之前判断是否允许展开一级目录
		onClick: onClick2 // 点击节点切换视频播放
	}
};

/**
 * id 节点编号，全局唯一
 * pId 父节点编号
 * name 节点文字标题
 * open 是否展开下级目录
 * icon 同一种图标样式
 * iconOpen 展开子节点时图标样式
 * iconClose 关闭子节点时图标样式
 * videoUrl 视频源url，如果为空，会提示错误
 * posterUrl 视频封面图片url，如果为空，就显示黑色的背景，可单独设置也可以在html结构中默认设置一个共享封面图片
 */
var zNodes1 =[
	{ id: 1, pId:0, name: "第一章 资产", open: true, iconOpen:"./css/zTreeStyle/img/diy/up.png", iconClose:"./css/zTreeStyle/img/diy/down.png" },
	{ id:11, pId:1, name: "新教材解读", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
		posterUrl: ''
	},
	{ id:12, pId:1, name: "前言", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
		posterUrl: 'http://vjs.zencdn.net/v/oceans.png'
	},
	{ id:13, pId:1, name: "第一节 货币资金1", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4',
		posterUrl: ''
	},
	{ id:14, pId:1, name: "第一节 货币资金2", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'
	},
	{ id:15, pId:1, name: "第一节 货币资金3", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'
	},
	{ id:16, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:17, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:18, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:18, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:18, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id: 2, pId:0, name: "第二章 资产", open: true, iconOpen:"./css/zTreeStyle/img/diy/up.png", iconClose:"./css/zTreeStyle/img/diy/down.png" },
	{ id:21, pId:2, name: "新教材解读", videoUrl: '222222', icon:"./css/zTreeStyle/img/diy/right.png" , videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:22, pId:2, name: "前言", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:23, pId:2, name: "第一节 货币资金1", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:24, pId:2, name: "第一节 货币资金2", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:25, pId:2, name: "第一节 货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'}
];
var zNodes2 =[
	{ id: 1, pId:0, name: "第一章 资产", open: true, iconOpen:"./css/zTreeStyle/img/diy/up.png", iconClose:"./css/zTreeStyle/img/diy/down.png" },
	{ id:11, pId:1, name: "新教材解读", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
		posterUrl: ''
	},
	{ id:12, pId:1, name: "前言", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
		posterUrl: 'http://vjs.zencdn.net/v/oceans.png'
	},
	{ id:13, pId:1, name: "第一节 货币资金1", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4',
		posterUrl: ''
	},
	{ id:14, pId:1, name: "第一节 货币资金2", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'
	},
	{ id:15, pId:1, name: "第一节 货币资金3", icon:"./css/zTreeStyle/img/diy/right.png",
		videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'
	},
	{ id:16, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:17, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:18, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:18, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:18, pId:1, name: "第二节 货币资金3货币资金3货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id: 2, pId:0, name: "第二章 资产", open: true, iconOpen:"./css/zTreeStyle/img/diy/up.png", iconClose:"./css/zTreeStyle/img/diy/down.png" },
	{ id:21, pId:2, name: "新教材解读", videoUrl: '222222', icon:"./css/zTreeStyle/img/diy/right.png" , videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:22, pId:2, name: "前言", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:23, pId:2, name: "第一节 货币资金1", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'},
	{ id:24, pId:2, name: "第一节 货币资金2", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://butlerccwebdev.net//support/html5-video/media/bigbuckbunnytrailer-480p.mp4'},
	{ id:25, pId:2, name: "第一节 货币资金3", icon:"./css/zTreeStyle/img/diy/right.png", videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4'}
];

//添加自定义控件，这里给某些课程添加“免费”控件
function addDiyDom1(treeId, treeNode) {
	if (treeNode.parentNode && treeNode.parentNode.id!=2) return;
	var aObj = $("#" + treeNode.tId + IDMark_A);
	if (treeNode.id >= 11 && treeNode.id <= 16) {
		var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span class='button icon01'></span></span>";
		aObj.append(editStr);
		var btn = $("#diyBtn_"+treeNode.id);
		if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
	}
	// 设置其他节点的扩展图标
	/*else if (treeNode.id == 22) {
		var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span class='button icon02'></span></span>";
		aObj.after(editStr);
		var btn = $("#diyBtn_"+treeNode.id);
		if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
	}*/
}
function addDiyDom2(treeId, treeNode) {
	if (treeNode.parentNode && treeNode.parentNode.id!=2) return;
	var aObj = $("#" + treeNode.tId + IDMark_A);
	if (treeNode.id >= 11 && treeNode.id <= 12) {
		var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span class='button icon01'></span></span>";
		aObj.append(editStr);
		var btn = $("#diyBtn_"+treeNode.id);
		if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
	}
}

//一级节点可以展开收拢
function beforeClick1(treeId, treeNode) {
	if (treeNode.level == 0 ) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
		zTree.expandNode(treeNode);
		return false;
	}
	return true;
}
function beforeClick2(treeId, treeNode) {
	if (treeNode.level == 0 ) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo2");
		zTree.expandNode(treeNode);
		return false;
	}
	return true;
}

/**
 * 点击节点：重置视频、设置视频播放源、设置视频封面图片、重新加载视频
 * 加载完成视频：自动播放
 */
function onClick1(e, treeId, treeNode) {
	var videoUrl = treeNode.videoUrl,
		myPlayer =  videojs("my-video1");  //初始化视频
	myPlayer.reset(); // 重置播放器
	myPlayer.src(videoUrl);  //重置video的src，可以是多种播放源类型组成的对象数组
	myPlayer.poster(treeNode.posterUrl); //重置poster图片地址
	myPlayer.load(videoUrl);  //重新加载video
	//加载就绪
	myPlayer.ready(function(){
		myPlayer.play(); //自动播放
	});
}
function onClick2(e, treeId, treeNode) {
	var videoUrl = treeNode.videoUrl,
		myPlayer =  videojs("my-video2");  //初始化视频
	myPlayer.reset(); // 重置播放器
	myPlayer.src(videoUrl);  //重置video的src，可以是多种播放源类型组成的对象数组
	myPlayer.poster(treeNode.posterUrl); //重置poster图片地址
	myPlayer.load(videoUrl);  //重新加载video
	//加载就绪
	myPlayer.ready(function(){
		myPlayer.play(); //自动播放
	});
}