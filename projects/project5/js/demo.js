/**
 * Created by yanjinhui on 2017/5/27.
 */
window.onload = function () {
	new Vue({
		el: '#editor',
		data() {
			return {
				input: '# hello'
			}
		},
		computed: {
			compiledMarkdown: function () {
				return marked(this.input, { sanitize: true })
			}
		},
		methods: {
			update: _.debounce(function (e) {
				this.input = e.target.value
			}, 300)
		}
	});
}
