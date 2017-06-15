<<template>
  <div class="register">
    <h1 class="welcome">欢迎来到豆瓣</h1>
    <form id="form" v-on:submit.prevent="register">
      <group class="input-wrap">
         <x-input v-model="form.account" is-type="china-mobile" debounce="500" required placeholder="手机号"></x-input>
      </group>
			<group class="input-wrap">
         <x-input v-model="form.pwd" min="6" required type="password" placeholder="密码（最少6位）"></x-input>
      </group>
			<group class="input-wrap">
         <x-input v-model="form.name" required placeholder="呢称"></x-input>
      </group>
    	<input class="submit" type="submit" value="注册">
    </form>
			<toast v-model="toast.show" position="top" width="40%" :time="toast.time" type="text" >{{toast.text}}</toast>
  </div>
</template>

<script>
import { XInput, Group,Toast } from 'vux'
export default {
	data(){
		return{
			form:{
				account:'',
				pwd:'',
				name:''
			},
			toast:{
				text:'',
				show:false,
			}
		}
	},
	components: {
		'x-input': XInput,
		Group,
		Toast
	},
	methods: {
		register() {
			if(!this.form.account||!this.form.pwd||!this.form.name){
				return;
			}
			this.$store.dispatch({
				type:'REGISTER',
				user:this.form
			}).then((text)=>{
				this.toast.text=text;
				this.toast.show=true;
				setTimeout(()=>{
					this.$router.push({name:'Login'})
				},3000);
			}).catch((err)=>{
				this.toast.text=err;
				this.toast.show=true;
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
.welcome {
	color: #42bd56;
	@include font-dpr(80);
	margin: px2rem(100) auto;
	font-weight: 300;
	text-align: center;
}

form {
	@include font-dpr(30);
	padding: 0 px2rem(50);
	.input-wrap{
		border:1px solid #d7d7d7;
		border-top:0;
		overflow:hidden;
		&:first-child{
			border-top:1px solid #d7d7d7;
			border-top-left-radius:px2rem(6);
			border-top-right-radius:px2rem(6);
		}
		&:last-child{
			border-top:1px solid #d7d7d7;
			border-bottom-left-radius:px2rem(6);
			border-bottom-right-radius:px2rem(6);
		}
		.vux-x-input{
			height:px2rem(90);
		}
	}
	.submit {
		@include font-dpr(32);
		border-radius: px2rem(6);
		margin-top:px2rem(20);
		border: 0 none;
		background: #42bd56;
		display: block;
		width: 100%;
		height: px2rem(88);
		color: #fff;
		transition: all 0.3s ease-out;
	}
}
</style>
