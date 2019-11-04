<template>
	<view class="pet-detail-wrap">
		<view class="u-nav-no-size">
			<NavBar :config="navConfig"></NavBar>
		</view>
		<view class="header-swiper">
			<swiper class="swiper" :indicator-dots="swiperConfig.indicatorDots" :indicator-color="swiperConfig.indicatorColor" :indicator-active-color="swiperConfig.indicatorActiveColor" :autoplay="swiperConfig.autoplay" :interval="swiperConfig.interval" :duration="swiperConfig.duration">
				<swiper-item v-for="(item, index) in detailInfo.petImages" :key="index">
					<image class="carousel-img" :src="item" @click="previewPetImage(item)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!--pet info-->
		<view class="info">
			<view class="basic-info u-flex-b-c">
				<text>{{detailInfo.petNikeName ? detailInfo.petNikeName : '还没有名字的' + detailInfo.petAssortment}}</text>
				<text :class="detailInfo.adoptionStatus === 0 ? 'green' : 'gray-e4'">{{petStatus[detailInfo.adoptionStatus]}}</text>
			</view>
			<view class="detail">
				<view class="detail-row" v-for="(row,index) in basicInfo" :key="index">
					<view :class="{'item-large' : item.flex === 2}" class="u-flex-s-c item" v-for="(item,itemIdx) in row" :key="itemIdx">
						<image :src="item.iconUrl" class="icon"></image>
						<text>{{item.key}}：</text>
						<text v-if="!item.obj">{{detailInfo[item.value]}}</text>
						<text v-else-if="item.key === '性别'">{{petSex[detailInfo[item.value]]}}</text>
						<text v-else-if="item.key === '费用'">{{petCostAdoption[detailInfo[item.value]]}}</text>
						<text v-else>{{trueOrNot[detailInfo[item.value]]}}</text>
					</view>
				</view>
			</view>
			<view class="publish">
				<view class="u-flex-b-c">
					<view class="u-flex-s-c">
						<image :src="detailInfo.createAvatarUrl" class="avatar"></image>
						<view>
							<view>{{detailInfo.createUser}}</view>
							<view class="u-flex-b-c publish-time">{{detailInfo.createTime}} 发布该领养信息</view>
						</view>
					</view>
					<view class="publish-count">{{detailInfo.readSum}}人看过</view>
				</view>
				<view class="publish-desc">{{detailInfo.petIntroduction}}</view>
			</view>
			<view class="adoption">
				<view class="adoption-top">如需领养，请通过以下方式联系</view>
				<view class="adoption-contact u-flex-b-c">
					<button @click="handleActionSheet('电话')" :class="{'disabled' : !detailInfo.petContactsPhone}">
						<text class="iconfont icon-phone"></text>
						<text>电话</text>
					</button>
					<button @click="handleActionSheet('微信')" :class="{'disabled' : !detailInfo.petContactsWx}">
						<text class="iconfont icon-weixin"></text>
						<text>微信号</text>
					</button>
					<button :class="{'disabled' : !detailInfo.petContactsWxQccodeUrl}">
						<text class="iconfont icon-qrcode"></text>
						<text>微信二维码</text>
					</button>
				</view>
			</view>
		</view>
		<view class="footer u-flex-b-c">
			<view class="tab" @click="handleCollect">
				<view class="iconfont icon-collect" :class="{'yellow' : detailInfo.userIsStar === 1}"></view>
				<view class="tab-text">{{detailInfo.starSum}}人关注</view>
			</view>
			<button class="tab" open-type="share">
				<view class="iconfont icon-share"></view>
				<view class="tab-text">{{detailInfo.shareSum}}人分享</view>
			</button>
			<view class="tab" @click="showPoster = true">
				<view class="iconfont icon-frame"></view>
				<view class="tab-text">生成海报</view>
			</view>
			<view class="tab" @click="handleActionSheet('更多')">
				<view class="iconfont icon-more"></view>
				<view class="tab-text">更多</view>
			</view>
		</view>

		<action-sheet class="action-sheet-container" v-if="showPhone" @close="closeAction">
			<view class="list disabled">{{detailInfo.petContactsPhone}}</view>
			<view class="list">
				<a :href="'tel:' + detailInfo.petContactsPhone">呼叫</a>
			</view>
			<view class="list" @click="copyData(detailInfo.petContactsPhone)">复制号码</view>
		</action-sheet>
		<action-sheet class="action-sheet-container" v-if="showWechat" @close="closeAction">
			<view class="list disabled">{{detailInfo.petContactsWx}}</view>
			<view class="list" @click="copyData(detailInfo.petContactsWx)">复制微信号</view>
		</action-sheet>
		<action-sheet class="action-sheet-container" v-if="showMore" @close="closeAction">
			<view class="list">删除内容</view>
			<view class="list">编辑内容</view>
			<view class="list">设置为『已被领养』</view>
		</action-sheet>

		<canvas-poster v-if="showPoster" :imgList="detailInfo.petImages" @close="closePoster"></canvas-poster>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { NavBarOptions } from '@/interfaces/navBar'
	import ActionSheet from '@components/ActionSheet.vue'
	import CanvasPoster from '@components/CanvasPoster.vue'
	import { petStatus, petSex, trueOrNot, petCostAdoption } from '@/utils/const'
	import { apiPetDetail, apiReadPet, apiSharePet, apiStarPet } from '@/service/api'

	@Component({
		components: {
			ActionSheet,
			CanvasPoster
		}
	})
	export default class PetDetail extends Vue {
		petId: number
		petStatus = petStatus
		petSex = petSex
		trueOrNot = trueOrNot
		petCostAdoption = petCostAdoption
		detailInfo: any = {}
		swiperConfig: any = {
			indicatorDots: true,
			indicatorColor: 'rgba(255,255,255,0.6)',
			indicatorActiveColor: '#fff',
			autoplay: false,
			interval: 2000,
			duration: 1000
		}
		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: 'transparent',
			title: '',
			back: true
		}
		showPhone: boolean = false
		showWechat: boolean = false
		showMore: boolean = false
		showPoster: boolean = false
		basicInfo = [
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '品种',
					value: 'petAssortmentName'
				}
			],
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '性别',
					value: 'petSex',
					obj: true
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '年龄',
					value: 'petAge'
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '状态',
					value: 'petSource'
				}
			],
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '绝育',
					value: 'petIsSterilization',
					obj: true
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '驱虫',
					value: 'petInsectRepellent',
					obj: true
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '疫苗',
					value: 'petIsVaccine',
					obj: true
				}
			],
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '费用',
					value: 'petCostAdoption',
					obj: true
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '位置',
					value: 'petProvince',
					flex: 2
				}
			]
		]

		onLoad (option: any) {
			this.petId = option.petId
			this.getReadCount(option)
		}

		onShareAppMessage (res: any) {
			return {
				title: '布丁领养',
				path: `/pages/preview/petDetail?petId=${ this.petId }&source=share`,
				success: () => {   // TODO 微信小程序不支持分享的回调了，下边的代码不执行
					this.handleShare()
				}
			}
		}

		/**
		 * 获取详情
		 */
		getDetail (id: number) {
			apiPetDetail(id).then((res: object) => {
				this.detailInfo = res
			})
		}

		/**
		 * 阅读宠物信息
		 */
		getReadCount (params: any) {
			// readSource来源: share-分享，list-列表，poster-海报
			let data = {
				petId: params.petId,
				readSource: params.source
			}
			apiReadPet(data).then(() => {
				this.getDetail(params.petId)
			})
		}

		/**
		 * 预览图片
		 * @param url
		 */
		previewPetImage (url: string) {
			uni.previewImage({
				current: url,
				indicator: 'number',
				urls: this.detailInfo.petImages
			})
		}

		/**
		 * 显示上拉菜单
		 */
		handleActionSheet (type: string) {
			switch (type) {
				case '电话':
					if (this.detailInfo.petContactsPhone) {
						this.showPhone = true
					} else {
						uni.showToast({
							title: '发布者未提供手机号'
						})
						return
					}
					break
				case '微信':
					if (this.detailInfo.petContactsWx) {
						this.showWechat = true
					} else {
						uni.showToast({
							title: '发布者未提供微信号'
						})
						return
					}
					break
				case '更多':
					this.showMore = true
					break
			}
		}

		/**
		 * 关闭上拉菜单
		 */
		closeAction () {
			this.showPhone = false
			this.showWechat = false
			this.showMore = false
		}

		/**
		 * 关闭海报
		 */
		closePoster () {
			this.showPoster = false
		}

		/**
		 * 点击关注或取消关注
		 */
		handleCollect () {
			apiStarPet(this.petId).then((res) => {
				this.detailInfo.userIsStar = this.detailInfo.userIsStar === 1 ? 0 : 1
				this.detailInfo.starSum = res.count
				uni.showToast({
					icon: 'success',
					title: this.detailInfo.userIsStar ? '关注成功' : '取消关注成功',
					duration: 2000
				})
			})
		}

		/**
		 * 点击分享
		 */
		handleShare () {
			apiSharePet(this.petId).then((res) => {
				this.detailInfo.shareSum = res.count
			})
		}

		/**
		 * 复制
		 * @param text
		 */
		copyData (text: string | number) {
			uni.setClipboardData({
				data: String(text),
				success: () => {
					console.log(text)
				}
			})
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	@import "~@/theme/actionSheet.less";
	.pet-detail-wrap {
		padding-bottom: 170px;
		background-color: #f9f9f9;
		.header-swiper {
			.swiper {
				height: 672px;
			}
			.carousel-img {
				width: 100vw;
				height: 100%;
			}
		}
		.info {
			padding: 0 32px;
			.basic-info {
				padding: 35px 0 28px;
				font-size: 32px;
			}
			.detail {
				box-sizing: border-box;
				padding: 6px 23px 6px 29px;
				background-color: #ffffff;
				font-size: 24px;
				color: #232323;
				border: 1px solid #E2E2E2;
				margin-bottom: 50px;
				.detail-row {
					padding: 17px 0 14px;
					display: flex;
					&:not(:last-child) {
						border-bottom: 2px solid #f6f6f6;
					}
					.item {
						flex: 1;
						&.item-large {
							flex: 2;
						}
					}
				}
				.icon {
					.base-square(30px);
					margin-right: 4px;
				}
			}
			.publish {
				font-size: 24px;
				padding: 0 20px;
				.avatar {
					.base-square(54px);
					border-radius: 100%;
					margin-right: 18px;
				}
				.publish-time {
					color: #D8D8D8;
				}
				.publish-count {
					color: #D5D5D5;
					padding-top: 20px;
				}
				.publish-desc {
					padding: 36px 0 70px;
					color: #353535;
				}
			}
			.adoption {
				padding: 0 20px;
				font-size: 24px;
				.adoption-top {
					color: #2C2C2C;
					text-align: center;
					position: relative;
					margin-bottom: 40px;
					&:before, &:after {
						content: '';
						width: 150px;
						background: #878787;
						height: 1px;
						position: absolute;
						top: 49%;
					}
					&::before {
						left: 0;
					}
					&::after {
						right: 0;
					}
				}
				.adoption-contact {
					> button {
						width: 182px;
						text-align: center;
						font-size: 20px;
						color: #fff;
						padding: 18px 0;
						.flex-box-align-justify(center, center);
						&:after {
							border: 0;
						}
						&:nth-child(1) {
							background: #9eb6f8;
						}
						&:nth-child(2) {
							background: #83D16C;
						}
						&:nth-child(3) {
							background: #EE8491;
						}
						&.disabled {
							background: #E5E5E5;
						}
						.iconfont {
							font-size: 28px;
							margin-right: 10px;
						}
					}
				}
			}
		}
		.footer {
			width: 100vw;
			height: 117px;
			position: fixed;
			z-index: 10;
			bottom: 0;
			background: #fff;
			color: #202020;
			font-size: 18px;
			border-top: 1px solid rgba(11, 5, 9, 0.21);
			button {
				background: #fff;
				color: #202020;
				font-size: 18px;
				padding: 0;
				line-height: initial;
				&::after {
					border: none;
				}
			}
			.tab {
				flex: 1;
				text-align: center;
			}
			.iconfont {
				margin-bottom: 4px;
				font-size: 36px;
				color: #878787;
			}
		}
	}
</style>
