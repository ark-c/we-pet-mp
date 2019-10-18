<template>
	<view class="content">
		<NavBar></NavBar>
		<block v-for="(item, index) in 2" :key="index">
			<pet-item :petInfo="item" class="u-mg-b-20"></pet-item>
		</block>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import { Getter, Mutation } from 'vuex-class';
	import { User } from '@/store/types';
	import petItem from '@components/petItem.vue';

	const namespace: string = 'user';

	@Component({
		components: {
			petItem
		}
	})
	export default class Index extends Vue {
		@Getter('user', { namespace }) userInfo: User;
		@Mutation('UPDATE_USER', { namespace }) updateUser: any;

		/**
		 * 授权用户信息
		 * @param $event
		 */
		getUser($event: any): void {
			if ($event.detail.errMsg !== 'getUserInfo:ok') return;
			this.updateUser($event.detail.userInfo);
		};
	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #f9f9f9;
		width: 100vw;
		min-height: 100vh;
	}
</style>
