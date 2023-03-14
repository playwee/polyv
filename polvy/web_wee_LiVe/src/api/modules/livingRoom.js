//直播间接口
import baseEnv from "@/assets/js/config.js"
import axios from "@/assets/js/http.js"

class LivingRoom{
    // 获取直播间列表
    getRoomList(params){
        if(params&&params.type){
            //通过类型进行搜索
            return axios.get(`${baseEnv.webUrl}/livingRoom/roomListByType`,{params:params}).then(res=>{
                return res.data.data
            })
        }else{
            //通过输入的信息进行搜索
            return axios.get(`${baseEnv.webUrl}/livingRoom/roomList`,{params:params}).then(res=>{
                return res.data.data
            })
        }
    }

    // 获取直播间详情
    getRoomDetail(params){
        return axios.get(`${baseEnv.webUrl}/livingRoom/roomDetail`,{params:params}).then(res=>{
            return res.data.data
        })
    }

    // 通过用户id获取直播间信息 
    getRoomDetailByUserId(params){
        return axios.get(`${baseEnv.webUrl}/livingRoom/roomDetailByUserId`,{params:params}).then(res=>{
            return res.data.data
        })
    }

    // 新增直播间
    addRoom(params){
        return axios.get(`${baseEnv.webUrl}/livingRoom/addRoom`,params).then(res=>{
            return res.data
        })
    }

    // 编辑直播间
    editRoom(params){
        return axios.post(`${baseEnv.webUrl}/livingRoom/editRoom`,params).then(res=>{
            return res.data
        })
    }
}
const livingRoom = new LivingRoom()
export default livingRoom