<script lang="ts">
	import Vue from 'vue'

	export default Vue.extend({
		mpType: 'app',
		onLaunch (): void {
			console.log('App Launch')

			// TODO 微信小程序现在只支持button点击方式和open-data方式来获取用户信息：https://developers.weixin.qq.com/community/develop/doc/0000a26e1aca6012e896a517556c01。使用open-data的方式无法获取到里边的数据，只能用来展示，所以如果想拿到用户信息只能通过button的open-type：https://developers.weixin.qq.com/community/develop/doc/000a265b3bcdb0331bd63ad4b5b000

			this.$store.commit('user/USER_LOGIN')
			this.$store.commit('system/UPDATE_SYSTEM_INFO')
		},
		onShow (): void {
			console.log('App Show')
		},
		onHide (): void {
			console.log('App Hide')
		}
	})
</script>

<style lang="less">
	/*每个页面公共css */
	@import "./theme/index.less";
</style>
