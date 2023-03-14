import api from "@/api/index.js"
const state = {
    roomList: []
}
const actions = {
    async setRoomList({ commit }, data) {
        let res = await api.livingRoomApi.getRoomList(data)
        commit("updateRoomList", res)
    }
}
const mutations = {
    updateRoomList(state, data) {
        state.roomList = data
    }
}
const getters = {}

export default {
    namespace: "livingRoom",
    state,
    actions,
    mutations,
    getters
}