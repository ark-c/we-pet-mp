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

	export default Vue.extend({
		data() {
			return {
				title: 'Hello',
				userInfo: {
					avatarUrl: '../../static/logo.png'
				}
			};
		},
		onLoad() {

		},
		methods: {
			getUser($event: any) {
				console.log($event)
				if ($event.detail.errMsg === 'getUserInfo:ok') {
					this.userInfo = $event.detail.userInfo
					// this.UPDATE_USER(this.userInfo)
				}
			}
		}
	});
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
