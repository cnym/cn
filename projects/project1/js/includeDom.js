window.onload = function () {
	//引入文件
	$('.includeDom').each(function () {
		var _this = $(this);
		if (!!_this.attr('file')) {
			_this.load(_this.attr('file'), function(html) {
				/*_this.after(html).remove();*/
				if (_this.data('name') == 'onlineAsk') {
					//在线咨询
					var content = document.querySelector('.online-content');
					var contentBtn = document.querySelector('.on-c-btn');
					var switchBtn = document.querySelector('.online-switch');
					contentBtn.onclick = function () {
						content.className = 'online-content hide';
						setTimeout(function () {
							switchBtn.className = 'online-switch show';
						}, 300);
					}
					switchBtn.onclick =	function () {
						switchBtn.className = 'online-switch';
						setTimeout(function () {
							content.className = 'online-content';
						}, 300);
					}
				} else if (_this.data('name') == 'navigator') {
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
				}
			});
		}
	});
}