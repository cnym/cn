window.onload = function () {
	var arr = [];
	var len = 100;
	/*for(var i=0;i<len;i++){
		arr.push({id:i+1});
	}*/
	var swiperWrapper = $('#swiperWrapper');
	var str = '';
	for(var j=0;j<len;j++){
		str += '<div class="swiper-slide">slider'+(j+1)+'</div>';
	}
	swiperWrapper.html(str);
	var mySwiper = new Swiper('.swiper-container', {
		//autoplay: 5000,//可选选项，自动滑动
	});
};