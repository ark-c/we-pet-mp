<template>
	<view class="content">
		<image class="logo" :src="userInfo.avatarUrl"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view>
			<button class="title" open-type="getUserInfo" @getuserinfo="getUser">{{title}}</button>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component'
	import { User } from '@/store/types'
	import { Getter } from 'vuex-class'

	@Component
	export default class Index extends Vue {
		@Getter('user', { namespace: 'user' }) user!: User;
		title: string = 'hello';
		userInfo: any = {
			avatarUrl: '../../static/logo.png'
		};

		/**
		 * 授权用户信息
		 * @param $event
		 */
		getUser($event: any): void {
			console.log($event);
			if ($event.detail.errMsg === 'getUserInfo:ok') {
				this.userInfo = $event.detail.userInfo;
				// this.UPDATE_USER(this.userInfo)
			}
		};

		mounted() {
			console.log('=======', this.user);
		}
	}
</script>

<style lang="less">
	.content {
		text-align: center;
		height: 400px;
	}
	.logo {
		height: 200px;
		width: 200px;
		margin-top: 200px;
	}
	.title {
		font-size: 36px;
		color: @uni-color-warning;
	}
</style>
