<template>
	<view class="pet-detail-wrap">
		<view class="u-nav-no-size">
			<NavBar :config="navConfig"></NavBar>
		</view>
		<view class="header-swiper">
			<swiper class="swiper" :indicator-dots="swiperConfig.indicatorDots" :indicator-color="swiperConfig.indicatorColor" :indicator-active-color="swiperConfig.indicatorActiveColor" :autoplay="swiperConfig.autoplay" :interval="swiperConfig.interval" :duration="swiperConfig.duration">
				<swiper-item v-for="(item, index) in detailInfo.petImages" :key="index">
					<image class="carousel-img" :src="item" @click="previewImage(item)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!--pet info-->
		<view class="info">
			<view class="basic-info u-flex-b-c">
				<text>{{detailInfo.petNikeName ? detailInfo.petNikeName : '还没有名字的' + detailInfo.petAssortment}}</text>
				<text :class="detailInfo.adoptionStatus === 0 ? 'green' : 'gray-e4'">{{petInfoStatus[detailInfo.adoptionStatus]}}</text>
			</view>
			<view class="detail">
				<view class="detail-row" v-for="(row,index) in basicInfo" :key="index">
					<view :class="{'item-large' : item.flex === 2}" class="u-flex-s-c item" v-for="(item,itemIdx) in row" :key="itemIdx">
						<image :src="item.iconUrl" class="icon"></image>
						<text>{{item.key}}：</text>
						<text>{{item.value}}</text>
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
					<view class="publish-count">254人看过</view>
				</view>
				<view class="publish-desc">{{detailInfo.petIntroduction}}</view>
			</view>
			<view class="adoption">
				<view class="adoption-top">如需领养，请通过以下方式联系</view>
				<view class="adoption-contact u-flex-b-c">
					<button>
						<text class="iconfont icon-phone"></text>
						<text>电话</text>
					</button>
					<button>
						<text class="iconfont icon-weixin"></text>
						<text>微信号</text>
					</button>
					<button>
						<text class="iconfont icon-qrcode"></text>
						<text>微信二维码</text>
					</button>
				</view>
			</view>
		</view>
		<view class="footer u-flex-b-c">
			<view class="tab">
				<view class="iconfont icon-collect"></view>
				<view class="tab-text">3人关注</view>
			</view>
			<view class="tab">
				<view class="iconfont icon-share"></view>
				<view class="tab-text">3人分享</view>
			</view>
			<view class="tab">
				<view class="iconfont icon-frame"></view>
				<view class="tab-text">生成海报</view>
			</view>
			<view class="tab">
				<view class="iconfont icon-more"></view>
				<view class="tab-text">更多</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { NavBarOptions } from '@/interfaces/navBar'
	import { petStatus } from '@/utils/const'

	const detailInfo = {
		adoptionStatus: 0,
		createAvatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
		createTime: '2018',
		createUser: '创建人',
		createUserId: 0,
		effectiveStatus: 0,
		petAdoptionRequirements: '宠物领养要求',
		petAge: '0-3个月',
		petAssortment: '宠物品种',
		petCity: '北京',
		petContactsName: '联系人称呼',
		petContactsPhone: '联系人电话',
		petContactsWx: '联系人微信',
		petContactsWxQccodeUrl: '微信二维码图片',
		petCostAdoption: '领养费用情况number',
		petDepositAmount: '押金金额number',
		petDistrict: '朝阳',
		petId: 0,
		petImages: ['https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132'],
		petInsectRepellent: true, // 是否驱虫：1:TRUE,0:FALSE
		petIntroduction: '宠物介绍',
		petIsSterilization: true, // 是否绝育：1:TRUE,0:FALSE
		petIsVaccine: true, // 是否打疫苗：1:TRUE,0:FALSE
		petNikeName: '宠物昵称',
		petOtherCommon: '宠物其他信息',
		petProvince: '北京',
		petSex: 0, // 性别：0:公 1:母
		petSource: '收养来源'
	}

	@Component({})
	export default class PetDetail extends Vue {
		detailInfo = detailInfo
		petInfoStatus = petStatus
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
		basicInfo = [
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '品种',
					value: '中华田园猫'
				}
			],
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '性别',
					value: 'MM'
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '年龄',
					value: '0-3个月'
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '状态',
					value: '流浪'
				}
			],
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '绝育',
					value: '否'
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '驱虫',
					value: '是'
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '疫苗',
					value: '未知'
				}
			],
			[
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '费用',
					value: '免费领养'
				},
				{
					iconUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
					key: '位置',
					value: '北京市',
					flex: 2
				}
			]
		]
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
						padding: 0;
						text-align: center;
						font-size: 20px;
						color: #fff;
						.flex-box-align-justify(center, center);
						&:after {
							border: 0;
						}
						&:nth-child(1) {
							background: #E5E5E5;
						}
						&:nth-child(2) {
							background: #83D16C;
						}
						&:nth-child(3) {
							background: #EE8491;
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
			bottom: 0;
			background: #fff;
			color: #202020;
			font-size: 18px;
			border-top: 1px solid rgba(11, 5, 9, 0.21);
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
