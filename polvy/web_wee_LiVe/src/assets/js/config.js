const env = process.env
const baseUrl = env.NODE_ENV === "development" ? "http://localhost" : "https://www.weeluo.com"
const baseEnv = {
    env: env.NODE_ENV,//当前环境
    mode: env.VUE_APP_CURRENTMODE,//当前模式
    webUrl: env.VUE_APP_CURRENTMODE === "electron" ? `${baseUrl}:5211` : "/webserve",
    socketUrl: {
        barrage: env.NODE_ENV === "development" ? `${baseUrl}:5210/barrage` : `${baseUrl}/barrage`,
    },
    livingUrl: env.NODE_ENV === "development" ? `${baseUrl}:7000/live` : `${baseUrl}/live/live`

}

export default baseEnv