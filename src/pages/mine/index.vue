<template>
	<view class="mine-wrap">
		<nav-bar :config="navConfig">
			<view class="about" slot="left">
				<text class="iconfont icon-about"></text>
				关于这个小程序
			</view>
		</nav-bar>
		<view class="header">
			<view>
				<image :src="userInfo.avatarUrl || 'https://xcauto-static.oss-cn-beijing.aliyuncs.com/pic/20190613/code.jpg'" class="avatar-img"></image>
				<view class="u-fz-small">{{userInfo.nickName || 'Merlin'}}</view>
			</view>
			<view class="tab u-fz-middle u-mg-t-40">
				<view class="tab-list" :class="{'active': activeTab === 0}" @click="switchTab(0)">
					我发布的
					<text v-if="releaseList.length">({{releaseList.length}})</text>
				</view>
				<view class="tab-list" :class="{'active': activeTab === 1}" @click="switchTab(1)">
					我关注的
					<text v-if="flowList.length">({{flowList.length}})</text>
				</view>
			</view>
		</view>
		<view class="content">
			<block v-for="(item, index) in petList" :key="index">
				<pet-item :petInfo="item" @toDetail="toDetail"></pet-item>
			</block>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import PetItem from '@components/PetItem.vue'
	import { Getter } from 'vuex-class'
	import { User } from '@/store/types'
	import { NavBarOptions } from '@/interfaces/navBar'
	import { PetItemInfo, PetParaDto } from '@/interfaces/api'
	import { apiPetList } from '@/service/api'

	const namespace: string = 'user'
	@Component({
		components: { PetItem }
	})
	export default class Index extends Vue {
		@Getter('user', { namespace }) userInfo: User

		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: '#EC6863',
			title: '',
			back: false
		}
		activeTab: number = 0 // tab
		releaseList: Array<any> = [] // 我的发布
		flowList: Array<any> = [] // 我的关注
		petList: PetItemInfo[] = []
		page: number = 1
		pageSize: number = 10
		total: number = -1

		created () {
			this.getList(this.page, this.pageSize)
		}

		onReachBottom () {
			this.getList(++this.page, this.pageSize)
		}

		/**
		 * 获取宠物列表
		 */
		getList (page: number = 1, pageSize: number = 10) {
			if (this.petList.length === this.total) {
				return
			}
			let params: PetParaDto = {
				page: page,
				rows: pageSize
			}
			apiPetList(params).then((res) => {
				this.total = res.total
				let data = (<PetItemInfo[]>res.items).filter((item) => item.effectiveStatus === 0)
				this.petList = this.petList.concat(data)
			})
		}

		/**
		 * 切换tab
		 * @param type
		 */
		switchTab (type: number) {
			this.activeTab = type
			this.page = 1
			this.total = -1
			this.petList = []
			this.getList(this.page, this.pageSize)
		}
	}
</script>

<style lang="less" scoped>
	.mine-wrap {
		width: 100vw;
		height: 100vh;
		background: #F6F6F6;
		box-sizing: border-box;
		.about {
			font-size: 24px;
			padding-left: 28px;
			display: flex;
			align-items: center;
			.icon-about {
				font-size: 36px;
				padding-right: 8px;
			}
		}
		.header {
			padding-top: 50px;
			padding-bottom: 20px;
			background-color: #EC6863;
			text-align: center;
			.avatar-img {
				.base-circle(145px);
			}
			.tab {
				display: flex;
				color: #ffffff;
				> .tab-list {
					flex: 1;
					position: relative;
					padding-bottom: 18px;
					display: flex;
					justify-content: center;
					&.active::after {
						content: '';
						width: 50px;
						height: 6px;
						background: #fff;
						position: absolute;
						bottom: 0;
						border-radius: 4px;
					}
				}
			}
		}
		.content {
			background: #F6F6F6;
			padding: 20px 0;
			overflow: hidden;
		}
	}
</style>
