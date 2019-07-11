
import './css.css'
import Vue from './vue.js'
import App from './App.js'
import './main.less'


new Vue({
	el:"#app",
	data(){
		return {
			
		}
	},
	components:{
		App
	},
	template:'<App />'
});


//  // npm run bulid  no   webpack ./main.js ./bulid.js