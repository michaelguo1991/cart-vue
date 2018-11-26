<template>
    <igt-tab-bar :data="tabs">
        <igt-tab v-for="(item, index) in tabs" :key="index">
            {{ item.label + '--' }}
        </igt-tab>
    </igt-tab-bar>
</template>

<script>
    import IgtTab from './igt-tab';
    import IgtTabBar from './igt-tab-bar';

    export default {
        name: 'TabBarExample',
        components: {
            IgtTab,
            IgtTabBar
        },
        data() {
            return {
                tabs: [{
                    icon: 'recommend',
                    label: '推荐'
                }, {
                    icon: 'focus',
                    label: '关注'
                }, {
                    icon: 'mine',
                    label: '我的'
                }]
            }
        }
    }
</script>