<template>
    <form class="igt-form">
        <slot>
            <igt-form-group 
                v-for="(group, index) in groups"
                :key="index"
                :legend="group.legend"
                :fields="group.fields"
            ></igt-form-group>
        </slot>
    </form>
</template>

<script>
    import IgtFormGroup from './igt-form-group';

    export default {
        name: 'IgtForm',
        components: {
            IgtFormGroup
        },
        props: {
            model: {
                type: Object,
                default() {
                    return {};
                }
            },
            schema: {
                type: Object,
                default() {
                    return {};
                }
            },
            options: {
                type: Object,
                default: {
                    immediateValidate: false,
                    scrollToInvalidField: false,
                    layout: 'standard'
                }
            }
        },
        data() {
            return {

            }
        },
        computed: {
            groups() {
                const schema = this.schema;
                let groups = schema.groups || [];
                if (schema.fields) {
                    groups.push({ fields: schema.fields });
                }
                return groups;
            }
        },
        methods: {

        },
        beforeCreate() {
            
        },
        created() {
          console.log(this.model);
        }
    }
</script>
