<template>
    <li class="igt-tab">
        <slot>
            <i class="icon" :class="icon" v-if="!!icon"></i>
            {{ label }}
        </slot>
    </li>
</template>

<script>
    export default {
        name: 'IgtTabBar',
        props: {
            icon: String,
            label: String
        }
    }
</script>

<style lang="scss">
    .igt-tab {
        flex: 1;
    }
</style>