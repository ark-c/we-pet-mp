<template>
	<view class="content">
		<view>
			<NavBar :config="navConfig"></NavBar>
		</view>
		<view class="top u-flex-c-c">
			<pet-picker @changePicker="changePicker($event,'area')" :option="areaPickerConfig" class="picker"></pet-picker>
			<pet-picker @changePicker="changePicker($event,'breedIndex')" :option="breedPickerConfig" class="picker"></pet-picker>
		</view>
		<view class="list-wrap">
			<block v-for="(item, index) in 2" :key="index">
				<pet-item :petInfo="item" @detailClick="toDetail"></pet-item>
			</block>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator'
	import { Getter, Mutation } from 'vuex-class'
	import { User } from '@/store/types'
	import PetItem from '@components/PetItem.vue'
	import { uNavigateTo } from '@/utils/navigateAction'
	import { NavBarOptions } from '@/interfaces/navBar'
	import PetPicker from '@components/PetPicker.vue'
	import { PickerOptions } from '@/interfaces/petPicker'
	import { apiPetList } from '@/service/api'
	import { PetParaDto } from '@/interfaces/api'

	const namespace: string = 'user'

	@Component({
		components: {
			PetItem,
			PetPicker
		}
	})
	export default class Index extends Vue {
		@Getter('user', { namespace }) userInfo: User
		@Mutation('UPDATE_USER', { namespace }) updateUser: any
		// 导航栏参数
		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: '#EC6863',
			title: 'WePet领养',
			back: false
		}
		// 宠物可选种类列表
		breedList: string[] = ['不限', '猫咪', '狗狗', '其他宠物']
		// 可选地区参数
		areaPickerConfig: PickerOptions = {
			mode: 'region',
			region: ['全国', '', '']
		}
		// 可选宠物种类参数
		breedPickerConfig: PickerOptions = {
			mode: 'selector',
			pickerList: this.breedList,
			staticText: '品种/'
		}
		// 当前选中的地区
		area: string[] = ['全国', '', '']
		// 当前选中的宠物种类的索引
		breedIndex: string | number = 0
		// 宠物列表
		petList: any[]

		created () {
			this.getList()
		}

		/**
		 * 获取宠物列表
		 */
		getList () {
			let params: PetParaDto = {
				page: 1,
				rows: 10,
				petAssortment: this.breedList[Number(this.breedIndex)],
				petProvince: this.area[0],
				petCity: this.area[1],
				petDistrict: this.area[2]
			}
			apiPetList(params).then((res) => {
				this.petList = res.items
			})
		}

		/**
		 * 授权用户信息
		 * @param $event
		 */
		getUser ($event: any): void {
			if ($event.detail.errMsg !== 'getUserInfo:ok') return
			this.updateUser($event.detail.userInfo)
		}

		/**
		 * 详情跳转
		 */
		toDetail () {
			uNavigateTo('/pages/preview/petDetail').then()
		}

		/**
		 * 子组件传过来的当前选中的picker的索引
		 * @param val
		 * @param picker
		 */
		changePicker (val: number, picker: string) {
			interface IParams { // 解决this[picker]报错的问题
				[key: string]: any
			}

			(<IParams>this)[picker] = val
			this.getList()
		}
	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #f9f9f9;
		width: 100vw;
		min-height: 100vh;
		.top {
			background: #fff;
			padding: 28px 0;
			margin-bottom: 20px;
			font-size: 28px;
			color: #434343;
			.picker {
				flex: 1;
				text-align: center;
			}
		}
		.list-wrap {
			overflow: hidden;
			padding-bottom: 22px;
		}
	}
</style>
