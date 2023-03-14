import baseEnv from "@/assets/js/config.js"
import axios from "@/assets/js/http.js"

class User{
    // 用户登录接口
    userLogin(params){
        return axios.post(`${baseEnv.webUrl}/users/login`,params).then(res=>{
            return res.data
        })
    }
    // 获取用户信息（没写好，搞了个默认的）
    getUserInfo(id="RGmP7jpNuXRleQhHBHGmLnIjkKUaPA8i"){
        return axios.get(`${baseEnv.webUrl}/users/getUserInfo`,{params:{id:id}}).then(res=>{
            return res.data
        })
    }

    // 新增用户
    addUser(params){
        return axios.post(`${baseEnv.webUrl}/users/addUser`,params).then(res=>{
            return res.data
        })
    }
}
const user = new User()
export default user