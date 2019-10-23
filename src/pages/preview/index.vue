<template>
	<view class="content">
		<!--<NavBar></NavBar>-->
		<block v-for="(item, index) in 2" :key="index">
			<pet-item :petInfo="item" @detailClick="toDetail"></pet-item>
		</block>
		<button @click="again">重新获取</button>
		<button @click="copy">复制</button>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component } from 'vue-property-decorator'
	import { Getter, Mutation } from 'vuex-class';
	import { User } from '@/store/types';
	import petItem from '@components/petItem.vue';
	import { uNavigateTo } from '@/utils/navigateAction'

	declare const uni: any;
	const namespace: string = 'user';

	@Component({
		components: {
			petItem
		}
	})
	export default class Index extends Vue {
		@Getter('user', { namespace }) userInfo: User;
		@Mutation('UPDATE_USER', { namespace }) updateUser: any;
		@Mutation('USER_LOGIN', { namespace }) userLogin: any;

		/**
		 * 授权用户信息
		 * @param $event
		 */
		getUser($event: any): void {
			if ($event.detail.errMsg !== 'getUserInfo:ok') return;
			this.updateUser($event.detail.userInfo);
		};

		/**
		 * 详情跳转
		 */
		toDetail () {
			uNavigateTo('/pages/preview/petDetail').then()
		};

		copy () {
			uni.setClipboardData({
				data: this.userInfo.code
			})
		};
		again () {
			this.userLogin()
			console.log(this.userInfo, '=======')
		}

	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #f9f9f9;
		width: 100vw;
		min-height: 100vh;
	}
</style>
