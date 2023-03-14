// 弹幕相关
import { common } from "@/assets/js/common.js"
const state = {
    barrageMsgList: [
        // {user:"你说的对",msg:"6666"},
        // {user:"我觉得我说的也对",msg:"777"},
        // {user:"我觉得我说的也对",msg:"说的好啊"}
    ],
}
const actions = {}
const mutations = {
    pushbarrageMsgList(state, data) {
        state.barrageMsgList.push(data)
    },
    unshiftbarrageMsgList(state) {
        state.barrageMsgList.unshift()
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}