/**
 * 所有Rules的集合
 * 每个Rule都会暴露2个参数： validate方法 和 paramNames规则参数
 * 其中，validate返回值支持2种方式：Promise 和 非Promise
 * 返回值类型也有2种：{Object/Boolean}
 * 无特殊需求，只需要返回Boolean即可
 * 如有特殊需求，比如需要用服务端的返回值作为错误消息提示，则需要返回Object类型
 * Object的数据结构如下：
 * ```
 * {
 *  valid: true/false,
 *  data: {
 *      msg: '',
 *      ...others
 *  }
 * }
 * ```
 */

import required from './required';
import minVal from './minVal';
import between from './between';

export {
    required,
    minVal,
    between
}