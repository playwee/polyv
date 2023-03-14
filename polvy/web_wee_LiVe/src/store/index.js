//vuex统一入口
import Vue from 'vue'
import Vuex from 'vuex'
import room from "./modules/room"
import user from "./modules/user"
import barrage from "./modules/barrage"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        room,
        user,
        barrage
    }
})