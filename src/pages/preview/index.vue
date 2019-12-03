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
			<block v-for="(item, index) in petList" :key="index">
				<pet-item :petInfo="item" @toDetail="toDetail"></pet-item>
			</block>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { Getter, Mutation } from 'vuex-class'
	import { User } from '@/store/types'
	import PetItem from '@components/PetItem.vue'
	import PetPicker from '@components/PetPicker.vue'
	import { uNavigateTo } from '@/utils/navigateAction'
	import { NavBarOptions } from '@/interfaces/navBar'
	import { PickerOptions } from '@/interfaces/petPicker'
	import { apiPetAssortment, apiPetList } from '@/service/api'
	import { PetItemInfo, PetParaDto } from '@/interfaces/api'
	import loginMixin from '@/mixins/loginMixin'

	const namespace: string = 'user'

	@Component({
		components: {
			PetItem,
			PetPicker
		},
		mixins: [
			loginMixin
		]
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
		breedList: any[] = [
			{
				dicDesc: '不限',
				dicCode: 'unlimited'
			}
		]
		// 可选地区参数
		areaPickerConfig: PickerOptions = {
			mode: 'region',
			region: ['全国', '', '']
		}
		// 可选宠物种类参数
		breedPickerConfig: PickerOptions = {
			mode: 'selector',
			pickerList: this.breedList,
			rangeKey: 'dicDesc',
			staticText: '品种/'
		}
		// 当前选中的地区
		area: string[] = ['全国', '', '']
		// 当前选中的宠物种类的索引
		breedIndex: string | number = 0
		// 宠物列表
		petList: PetItemInfo[] = []
		page: number = 1
		pageSize: number = 10
		total: number = -1

		created () {
			this.getPetAssortment()
			this.getList(this.page, this.pageSize)
		}

		onReachBottom () {
			this.getList(++this.page, this.pageSize)
		}

		getPetAssortment () {
			apiPetAssortment().then(res => {
				this.breedList = [...this.breedList, ...res]
				this.breedPickerConfig.pickerList = this.breedList
			})
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
				rows: pageSize,
				petRace: this.breedList[Number(this.breedIndex)].dicDesc === '不限' ? null : this.breedList[Number(this.breedIndex)].dicCode,
				petProvince: this.area[0] === '全国' ? null : this.area[0],
				petCity: this.area[1] || null,
				petDistrict: this.area[2] || null
			}
			apiPetList(params).then((res) => {
				this.total = res.total
				let data = (<PetItemInfo[]>res.items).filter((item) => item.effectiveStatus === 0)
				this.petList = this.petList.concat(data)
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
		toDetail (id: number) {
			uNavigateTo(`/pages/preview/petDetail?petId=${id}&source=list`).then()
		}

		/**
		 * 子组件传过来的当前选中的picker的索引或value值
		 * @param val
		 * @param picker
		 */
		changePicker (val: number, picker: string) {
			interface IParams { // 解决this[picker]报错的问题
				[key: string]: any
			}

			(<IParams>this)[picker] = val
			this.page = 1
			this.total = -1
			this.petList = []
			this.getList(this.page, this.pageSize)
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
