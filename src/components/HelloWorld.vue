<template>
  <igt-form
    :model="model"
    :schema="schema"
    :immediate-validate="false"
    :options="options"
    @validate="validateHandler"
    @submit="submitHandler"
    @reset="resetHandler"
  >
    <igt-form-item>
      <igt-validator 
        v-model="inputValid"
        :model="model.inputValue"
        :rules="rules"
        :messages="messages"
      >
        <cube-input v-model="model.inputValue"></cube-input>
      </igt-validator>
    </igt-form-item>

    <igt-form-item>
      <cube-validator v-model="inputValid1" :model="model.inputValue1" :rules="rules1" :messages="messages">
        <cube-input v-model="model.inputValue1"></cube-input>
        <div slot="message" class="custom-msg" slot-scope="slotProps">
          <p>{{ slotProps.message }}</p>
        </div>
      </cube-validator>
    </igt-form-item>
    <!-- <igt-form-group>
      <igt-form-item>
        <cube-checkbox v-model="model.checkboxValue">Checkbox测试</cube-checkbox>
      </igt-form-item>
      <igt-form-item>
        <cube-checkbox-group v-model="model.checkboxGroupValue">
          <cube-checkbox option="1" shape="square">Checkbox 1</cube-checkbox>
          <cube-checkbox option="2" shape="square">Checkbox 2</cube-checkbox>
          <cube-checkbox option="3" shape="square">Checkbox 3</cube-checkbox>
        </cube-checkbox-group>
      </igt-form-item>
      <igt-form-item>
        <cube-input :clearable="true" v-model="model.inputValue"></cube-input>
      </igt-form-item>
      <igt-form-item>
        <cube-switch v-model="model.switchValue"></cube-switch>
      </igt-form-item>
    </igt-form-group> -->
  </igt-form>
</template>

<script>
import IgtForm from './igt-form';
import IgtFormGroup from './igt-form-group';
import IgtFormItem from './igt-form-item';
import IgtValidator from './igt-validator';

export default {
  name: 'HelloWorld',
  components: {
    IgtForm,
    IgtFormGroup,
    IgtFormItem,
    IgtValidator
  },
  inject: {
    $validator: '$validator'
  },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        checkboxValue: true,
        checkboxGroupValue: ['1'],
        inputValue: '',
        inputValue1: '',
        radioValue: '',
        rateValue: 0,
        selectValue: 2018,
        switchValue: true,
        textareaValue: '',
        uploadValue: []
      },
      schema: {
        groups: [
          {
            legend: '基础',
            fields: [
              {
                type: 'checkbox',
                modelKey: 'checkboxValue',
                props: {
                  options: {
                    label: 'CheckBox',
                    value: true
                  }
                },
                rules: {
                  required: true
                },
                messages: {
                  required: 'Please check this checkbox field'
                }
              },
              {
                type: 'checkbox-group',
                modelKey: 'checkboxGroupValue',
                label: 'CheckboxGroup',
                props: {
                  options: ['1', '2', '3'],
                  shape: 'square'
                },
                rules: {
                  required: true
                }
              },
              {
                type: 'input',
                modelKey: 'inputValue',
                label: 'Input',
                props: {
                  placeholder: '请输入'
                },
                rules: {
                  required: true
                },
                // validating when blur
                trigger: 'blur'
              },
              {
                type: 'switch',
                modelKey: 'switchValue',
                label: 'Switch',
                rules: {
                  required: true
                }
              },
              {
                type: 'submit',
                props: {
                  label: 'Submit'
                }
              },
              {
                type: 'reset',
                props: {
                  label: 'Reset'
                }
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard'
      },
      rules: {
        required: true,
        type: 'number',
        min: 4,
        // pattern: /ctrip.com$/,
        custom: val => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(val.length > 6);
              resolve(val.length > 6)
            }, 1000)
          })
        }
      },
      inputValid: false,
      rules1: {
        required: true,
        type: 'number',
        custom: val => {
          return val.length > 8
        }
      },
      messages: {
        // lengthValid: '至少6位',
        custom: '请输入至少8位数字'
      },
      inputValid1: false
    }
  },
  created() {
    console.log(this.$validator);
  },
  watch: {
    // model: {
    //   handler(newModel, oldModel) {
    //     for (let key in newModel) {
    //       console.log(`${key}: ${newModel[key]}`);
    //     }
    //   },
    //   deep: true
    // }
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      console.log('submit: ', e);
    },
    resetHandler(e) {
      console.log('reset: ', e);
    },
    validateHandler(result) {
      console.log('validate result: ', result);
    }
  }
}
</script>

<style scoped>

</style>
