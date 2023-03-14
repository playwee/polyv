const state = {
    currentUser:{},
    token:""
}
const actions = {}
const mutations = {
    updateCurrentUser(state,data){
        state.currentUser = data
    },
    updateToken(state){
        state.token = localStorage.getItem("living_token")
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}