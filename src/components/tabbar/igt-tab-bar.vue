<template>
    <div class="igt-tab-bar-wrapper">
        <ul class="igt-tab-bar">
            <slot>
                <igt-tab
                    v-for="(item, index) in data" 
                    :key="index"
                    :icon="item.icon"
                    :label="item.label"
                ></igt-tab>
            </slot>
        </ul>
        <div class="igt-bar-scroll" ref="barScroller"></div>
    </div>
</template>

<script>
    import IgtTab from './igt-tab';

    export default {
        name: 'IgtTabBar',
        components: {
            IgtTab
        },
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        mounted() {
            // const itemWidth = this.$slots[0].clientWidth;
            // console.log(itemWidth);
        }
    }
</script>

<style lang="scss">
    .igt-tab-bar-wrapper {
        position: relative;
        width: 100%;
    }
    .igt-tab-bar {
        display: flex;
        height: 40px;
        align-items: center;
    }
    .igt-bar-scroll {
        position: absolute;
        height: 2px;
        background-color: blue;
        width: 30px;
        transition: transform .5s ease;
    }
</style>