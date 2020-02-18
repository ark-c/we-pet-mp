<template>
	<view class="release-wrap">
		<nav-bar :config="navConfig">
			<text class="nav-cancel" slot="left" @click="handleCancel">取消</text>
		</nav-bar>

		<view class="content">
			<view class="header info">
				<view class="title">说说宠物情况以及领养要求</view>
				<textarea name="" id="" placeholder="输入宠物信息" v-model="releasePetInfo.petAdoptionRequirements" class="pet-info" placeholder-class="placeholder-class	"></textarea>
				<img-upload :limit="6" :multipleJudge="true" @imgUpload="imgUpload($event,'petImages')"></img-upload>
			</view>
			<view class="contact-info info">
				<view class="title">联系信息</view>
				<view class="line">
					<label for="phone">手机号</label>
					<input id="phone" v-model="releasePetInfo.petContactsPhone" placeholder-class="placeholder" maxlength="11" placeholder="输入手机号" type="number">
				</view>
				<view class="line">
					<label for="weChat">微信号</label>
					<input id="weChat" v-model="releasePetInfo.petContactsWx" placeholder-class="placeholder" maxlength="11" placeholder="输入微信号" type="text">
				</view>
				<view class="line no-border">
					<label for="weChatImg">微信号二维码</label>
					<input id="weChatImg" type="text">
				</view>
			</view>
			<view class="more-info info">
				<view class="title">更多信息</view>
				<view class="line">
					<label>宠物昵称</label>
					<input v-model="releasePetInfo.petName" placeholder-class="placeholder" maxlength="11" placeholder="输入宠物昵称" type="text">
				</view>
				<view class="line">
					<label>所在城市</label>
					<pet-picker @changePicker="changePicker($event,'area')" :option="areaPickerConfig" class="picker"></pet-picker>
				</view>
				<view class="line">
					<label>品种</label>
					<!--<pet-picker @changePicker="changePicker($event,'')" :option="areaPickerConfig" class="picker"></pet-picker>-->
				</view>
				<view class="line">
					<label>年龄</label>
					<input v-model="releasePetInfo.petAge" placeholder-class="placeholder" maxlength="11" placeholder="输入宠物年龄" type="text">
				</view>
				<view class="line">
					<label>收养类型</label>
					<!--<pet-picker @changePicker="changePicker($event,'area')" :option="areaPickerConfig" class="picker"></pet-picker>-->
				</view>
				<view class="line">
					<label>性别</label>
					<radio-group @change="radioChange($event, 'petSex')">
						<radio :value="0" checked>MM</radio>
						<radio :value="1">GG</radio>
					</radio-group>
				</view>
				<view class="line">
					<label>绝育</label>
					<radio-group @change="radioChange($event, 'petIsSterilization')">
						<radio :value="1" checked>是</radio>
						<radio :value="0">否</radio>
						<radio :value="2">未知</radio>
					</radio-group>
				</view>
				<view class="line">
					<label>驱虫</label>
					<radio-group @change="radioChange($event, 'petInsectRepellent')">
						<radio :value="1" checked>是</radio>
						<radio :value="0">否</radio>
						<radio :value="2">未知</radio>
					</radio-group>
				</view>
				<view class="line">
					<label>疫苗</label>
					<radio-group @change="radioChange($event, 'petIsVaccine')">
						<radio :value="1" checked>是</radio>
						<radio :value="0">否</radio>
						<radio :value="2">未知</radio>
					</radio-group>
				</view>
				<view class="line">
					<label>领养费用</label>
					<radio-group @change="radioChange($event, 'petCostAdoption')">
						<radio :value="1">免费</radio>
						<radio :value="2" checked>押金</radio>
						<radio :value="3">有偿</radio>
					</radio-group>
				</view>
				<view class="line" v-if="releasePetInfo.petCostAdoption === 2'">
					<label>押金金额</label>
					<input v-model="releasePetInfo.petDepositAmount" placeholder-class="placeholder" placeholder="输入押金金额" type="number">
				</view>
			</view>
		</view>

		<button :disabled="canSubmit" class="submit btn" @click="submit">确认发布领养信息</button>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { NavBarOptions } from '@/interfaces/navBar';
	import ImgUpload from '@components/ImgUpload.vue';
	import PetPicker from '@components/PetPicker.vue';
	import { PickerOptions } from '@/interfaces/petPicker';
	import { apiPetRelease } from '@/service/api';
	import { uSwitchTab } from '@/utils/navigateAction';

	@Component({
		components: { ImgUpload, PetPicker }
	})
	export default class Index extends Vue {
		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: '#EC6863',
			title: '发布领养信息',
			back: false
		};
		canSubmit: boolean = false; // 是否可提交
		releasePetInfo: any = {
			petAdoptionRequirements: '', // 收养要求
			petContactsName: '', // 联系人名字
			petContactsPhone: '', // 联系人电话
			petContactsWx: '', // 联系人微信号
			petContactsWxQccodeUrl: '', // 联系人微信二维码
			petName: '', // name
			petAge: '', // age
			petAssortment: 1, // 品种
			petSource: '', // 收养类型
			petProvince: '', // 所在地-省
			petCity: '', // 所在地-市
			petDistrict: '', // 所在地-区
			petSex: 0, // 性别
			petImages: [], // 宠物图片列表
			petIsSterilization: 1, // 绝育
			petInsectRepellent: 1, // 驱虫
			petIsVaccine: 1, // 疫苗
			petCostAdoption: 2,
			petDepositAmount: 0 // 押金
		};
		// 可选地区参数
		areaPickerConfig: PickerOptions = {
			mode: 'region',
			region: ['全国', '', '']
		};

		/**
		 * 单选
		 * @param $event
		 * @param name
		 */
		radioChange($event: any, name: string) {
			this.releasePetInfo[name] = +$event.detail.value;
		};

		/**
		 * picker 选择
		 * @param $event
		 * @param name
		 */
		changePicker($event: any, name: string) {
			switch (name) {
				case 'area':
					// [this.releasePetInfo.petProvince, this.releasePetInfo.petCity, this.releasePetInfo.petDistrict] = $event;
					break;
				default:
					break;
			}

		};

		async submit() {
			await apiPetRelease(this.releasePetInfo);
			uni.showToast({ title: '发布成功' });
		}

		imgUpload($event: any, name: string) {
			if (name === 'petImages') this.releasePetInfo[name] = $event;
		}

		/**
		 * 取消发布
		 */
		handleCancel() {
			uSwitchTab('/pages/preview/index');
		}
	}
</script>

<style lang="less" scoped>
	.release-wrap {
		font-size: 24px;
		background-color: #f6f6f6;
		color: #000;
		.nav-cancel {
			padding-left: 16px;
			color: #E0DEE3;
			font-size: 32px;
		}
		.content {
			padding: 0 32px 120px;
		}
		.info {
			> textarea {
				width: 100%;
				min-height: 70px;
			}
			.title {
				color: #000;
				font-weight: bold;
				font-size: 32px;
				margin: 40px 0;
			}
			.line {
				.flex-box-align-justify(space-between, center);
				font-size: 24px;
				border-bottom: 2px solid #878787;
				height: 70px;
				&.no-border {
					border: none
				}
				> label {
					color: #001;
				}
				> input {
					text-align: right;
				}
				radio {
					/*transform:scale(0.7);*/
					width: 120px;
				}
			}
		}

		.submit {
			width: 100%;
			height: 110px;
			line-height: 110px;
			position: fixed;
			bottom: 0;
			border: none !important;
			text-align: center;
			vertical-align: center;
			color: #ffffff;
			font-size: 32px;
			background-color: #EC5C56;
			clear: both;
			z-index: 9;
		}
	}
</style>
