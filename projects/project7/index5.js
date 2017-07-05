window.onload = function () {
	//创建slides数组
	var sliders_arr = [];//存放所有slider
	var data_len = 500;//假设数据长度
	for(var i=0;i<data_len;i++){
		var str = '';
		str+= '<div class="swiper-slide" data-index="'+i+'">';
		str+='<h5>第 '+(i+1)+' 个slider</h5>';
		str+= '<label><input type="checkbox" class="myCheck"/>选择，看值是否改变</label>';
		str += '现在我们已经有两个viewport了：layout viewport 和 visual viewport。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的viewport。所谓的完美适配指的是，首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二，显示的文字的大小是合适，比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。ppk把这个viewport叫做 ideal viewport，也就是第三个viewport——移动设备的理想viewport。';
		str += 'slider'+(i+1);
		str += '再总结一下：ppk把移动设备上的viewport分为layout viewport  、 visual viewport   和 ideal viewport';
		str+='<div class="swiper-container swiper-container-child" id="swiper-container'+i+'"><div class="swiper-wrapper">' +
			'<div class="swiper-slide"><input type="checkbox" class="myCheck"/>选择，看值是否改变</label></div>'+
			'<div class="swiper-slide">22</div>'+
			'</div></div>';
		str+='</div>';
		sliders_arr.push(str);
	}
	//变量
	var max_len = 16,
		front_point = max_len*(1/4),
		back_point = max_len*(3/4),// 4 12
		btw = front_point;
	var need_refresh = false;
	//初始化swiper
	var init_child_swiper = [],//已经初始化的子swiper
		init_slide_index = 0,
	  move_slide_index;
	$('#swiperContainer>.swiper-wrapper').html(sliders_arr.slice(init_slide_index, max_len).join(''));
	var mySwiper = new Swiper('#swiperContainer', {
		speed: 0,
		onInit: function (swiper) {
			console.log('init')
			var child_swiper_id = '#swiper-container'+$(swiper.slides[swiper.activeIndex]).data('index');
			//初始化子滑块
			if (init_child_swiper.indexOf(child_swiper_id) == -1 && $(child_swiper_id).length > 0) {
				var childSwiper = new Swiper(child_swiper_id, {});
				init_child_swiper.push(child_swiper_id);
			}
		},
		onSlideChangeEnd: function(swiper){
			console.log('in',swiper.activeIndex)
			var child_swiper_id = '#swiper-container'+$(swiper.slides[swiper.activeIndex]).data('index');
			//初始化子滑块
			if (init_child_swiper.indexOf(child_swiper_id) == -1 && $(child_swiper_id).length > 0) {
				var childSwiper = new Swiper(child_swiper_id, {});
				init_child_swiper.push(child_swiper_id);
			}
			
			//swiper.unlockSwipes();
			if (!need_refresh) return;//少于最大slides数，不需要更新
			//保存上一个滑块dom,离开时还要保存一次当前滑块
			var previous_slide = swiper.slides[swiper.previousIndex];
			var previous_slide_index = $(previous_slide).data('index');
			sliders_arr[previous_slide_index] = previous_slide;
			//setTimeout(function(){
			//var fTime = new Date().getTime();
			//swiper.lockSwipes();
			//某些节点处更新swiper
			var activeIndex = swiper.activeIndex,
				begin_slide = swiper.slides[0],
				begin_slide_index = $(begin_slide).data('index'),
				end_slide = swiper.slides[max_len-1],
				end_slide_index = $(end_slide).data('index');
			if (activeIndex+1 == front_point) {
				//console.log(swiper.activeIndex)
				if (begin_slide_index == 0) {
					//swiper.unlockSwipes();
					return;
				};
				//var temp_prepend_arr = [];
				var temp_prepend_arr_len = 0;
				for (var j = begin_slide_index-1 ; j >= begin_slide_index-(btw-1); j--) {
					//if (j >= 0) temp_prepend_arr.push(sliders_arr[j]);
					if(j >= 0){
						temp_prepend_arr_len++;
						swiper.prependSlide(sliders_arr[j]);
					}
				}
				//swiper.prependSlide(temp_prepend_arr);//加进来sliders数组
				//console.log(swiper.activeIndex)
				var remove_right_slides = [],
					temp_len = max_len+temp_prepend_arr_len-1;
				for (var k = 0,kL = temp_prepend_arr_len; k < kL; k++) {
					remove_right_slides.push(temp_len-k);
				}
				swiper.removeSlide(remove_right_slides);//移除数组
			} else if (activeIndex+1 == back_point) {
				if (data_len > end_slide_index+1) {
					var temp_append_arr = sliders_arr.slice(end_slide_index+1, end_slide_index+btw);//追加到右边的slide数组
					var remove_left_slides = [];//需要移除左边的slide个数
					for (var i = 0, iL = temp_append_arr.length; i < iL; i++) {
						remove_left_slides.push(i);
					}
					//console.log(3)
					swiper.appendSlide(temp_append_arr);//加进来sliders数组
					swiper.removeSlide(remove_left_slides);//移除数组
					//console.log(4)
				}
			}
			//swiper.unlockSwipes();
			//console.log(new Date().getTime()-fTime);
			//},2000)
		}
	});
	
	if (data_len > max_len) {
		need_refresh = true;
	}
	//mySwiper.appendSlide(sliders_arr.slice(init_slide_index, max_len));//第一次更新的slider数目
	
	$('#btn').click(function(){
		console.log(mySwiper)
		mySwiper.slideTo(0);
	});
	$('#btn2').click(function(){
		mySwiper.slideTo(back_point-1);
	});
	
	//锁定Swiper，阻止其滑动。可以使用 mySwiper.unlockSwipes() 解锁。
	//mySwiper.wrapper  swiper的wrapper的Dom7/jQuery对象。可以通过mySwiper.wrapper[0]得到wrapper的HTML元素。
	/*
	 * mySwiper.slides
	 获取Swiper的slides对象数组。通过mySwiper.slides[1]获取特定的slide。*/
	
	/*function getSlide(s, e) {
	 var arr = [];
	 for(var i = s; i < e; i++){
	 str+= '<div class="swiper-slide" data-index="'+i+'">';
	 str+='<h5>'+(j+1)+'</h5>';
	 str += '现在我们已经有两个viewport了：layout viewport 和 visual viewport。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的viewport。所谓的完美适配指的是，首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二，显示的文字的大小是合适，比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。ppk把这个viewport叫做 ideal viewport，也就是第三个viewport——移动设备的理想viewport。';
	 str += 'slider'+(j+1);
	 str += '再总结一下：ppk把移动设备上的viewport分为layout viewport  、 visual viewport   和 ideal viewport  三类，其中的ideal viewport是最适合移动设备的viewport，ideal viewport的宽度等于移动设备的屏幕宽度，只要在css中把某一元素的宽度设为ideal viewport的宽度(单位用px)，那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为100%的效果。ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport 而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。';
	 str+='</div>';
	 }
	 return str;
	 }*/
	
	
};