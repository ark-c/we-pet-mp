<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        onLaunch(): void {
            console.log('App Launch')
	        this.$store.commit('user/USER_LOGIN')
        },
        onShow(): void {
            console.log('App Show')
        },
        onHide(): void {
            console.log('App Hide')
        }
    });
</script>

<style lang="less">
    /*每个页面公共css */
	@import "./theme/index.less";
</style>
