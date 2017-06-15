<template>
	<div class="login">
		<h1 class="welcome">欢迎登录豆瓣</h1>
		  <form id="form" v-on:submit.prevent="login">
      <group class="input-wrap">
         <x-input v-model="form.account" is-type="china-mobile" debounce="500" required placeholder="手机号"></x-input>
      </group>
			<group class="input-wrap">
         <x-input v-model="form.pwd" min="6" required type="password" placeholder="密码"></x-input>
      </group>
    	<input class="submit" type="submit" value="登录">
    </form>
		<toast v-model="toast.show" position="top" width="40%" :time="toast.time" type="text" >{{toast.text}}</toast>
	</div>
</template>

<script>
import { XInput, Group,Toast } from 'vux'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return{
			form:{
				account:'',
				pwd:''
			},
			toast:{
				text:'',
				show:false,
				time:1000
			}
		}
	},
	components: {
		'x-input': XInput,
		Group,
		Toast
	},
	methods: {
		login(){
			if(!this.form.account||!this.form.pwd){
				return;
			}
			this.$store.dispatch({
				type:'LOGIN',
				user:this.form
			}).then((text)=>{
					this.toast.show=true;
					this.toast.text='登录成功，3秒后跳转';
					setTimeout(()=>{
						this.$router.go(-1)
					},3000);
			}).catch((err)=>{
					this.toast.show=true;
					this.toast.text=err;
					this.toast.time=2500;
			})
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
	}
	.login{
		@include font-dpr(32);
		padding:0 px2rem(30);
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
</style>
