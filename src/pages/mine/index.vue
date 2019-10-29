<template>
	<view class="mine-wrap">
		<nav-bar :config="navConfig">
			<text slot="left">关于这个小程序</text>
		</nav-bar>
		<view class="header">
			<view class="">
				<image :src="userInfo.avatarUrl"></image>
				<view class="u-fz-small">{{userInfo.nickName || 'Merlin'}}</view>
			</view>
			<view class="tab u-fz-middle u-mg-t-40 u-fz-w">
				<view class="" :class="{'active': activeTab === 0}" @click="activeTab = 0">
					我发布的<text v-if="releaseList.length">({{releaseList.length}})</text>
				</view>
				<view class="" :class="{'active': activeTab === 1}" @click="activeTab = 1">
					我关注的<text v-if="flowList.length">({{flowList.length}})</text>
				</view>
			</view>
		</view>

		<view class="content">
			<block v-if="true">
				<!--<pet-item></pet-item>-->
			</block>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import PetItem from '@components/PetItem.vue';
	import { Getter } from 'vuex-class';
	import { User } from '@/store/types';
	import { NavBarOptions } from '@/interfaces/navBar'

	const namespace: string = 'user';
	@Component({
		components: { PetItem }
	})
	export default class Index extends Vue {
		@Getter('user', { namespace }) userInfo: User;

		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: '#EC6863',
			title: '',
			back: false
		};
		activeTab: number = 0; // tab
		releaseList: Array<any> = []; // 我的发布
		flowList: Array<any> = []; // 我的关注

		created() {
			this.initData();
		};

		initData() {
			console.log('=====');
		}
	}
</script>

<style lang="less" scoped>
	.mine-wrap {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		.header {
			padding-top: 50px;
			padding-bottom: 20px;
			background-color: #EC6863;
			text-align: center;
			> view > image {
				.base-circle(145px);
			}
			.tab {
				display: flex;
				height: 100px;
				color: #ffffff;
				> view {
					flex: 1;
					text-align: center;
					position: relative;
				}
			}
		}
	}
</style>
