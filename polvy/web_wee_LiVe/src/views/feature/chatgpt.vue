<template>
    <div class="chatbot-container" >
        <div class="title">小小聊天室（chatgpt牛牛牛！！！）</div>
      <div class="chatbot-message-container" ref="chatbotMessageContainer">
        <div class="chatbot-message" :class="{'user-message': msg.isMyMsg}" v-for="(msg, index) in messages" :key="index">
            <div style="width: 500rpx;" v-if="msg.url">
	            <div style="border-radius: 35rpx;background-color: #f9f9f9;">
	               <img :src=msg.url alt="" srcset="" style="width: 40%;">
	            </div>
	        </div>
          <p>{{ msg.message }}</p>
        </div>
      </div>
      <div class="chatbot-input-container">
        <input type="text" v-model="newMessage" placeholder="请写下查询信息" @keyup.enter="sendMessage" />
        <button @click="sendMessage">文字send</button>
        <button @click="sendMsgTP">图片send</button>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
        messages: [],
        newMessage: '',
      };
    },
    methods: {
      async sendMessage() {
        const message = this.newMessage;
        this.newMessage='';
        this.messages.push({ message, isMyMsg: true });
        const response = await axios.post('https://api.openai.com/v1/completions', {
          prompt: message,
          max_tokens: 2048,
          model: "text-davinci-003",
        //   n: 1,
        //   stop: '###',
        }, {
          headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json',
          }
        });
        const chatbotMessage = response.data.choices[0].text.trim();
        this.messages.push({ message: chatbotMessage, isMyMsg: false });
        this.$nextTick(() => {
            const container = this.$refs.chatbotMessageContainer;
            container.scrollTop = container.scrollHeight;
        });
        },
        sendMsgTP() {
            const message = this.newMessage;
            this.newMessage='';
            this.messages.push({ message, isMyMsg: true });
            // 消息为空不做任何操作
            axios.post('https://api.openai.com/v1/images/generations', {
				prompt: message,
				n: 2,
				size: "1024x1024"
            }, {
                headers: { 'content-type': 'application/json', 'Authorization': `Bearer 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`}
            }).then(res => {
                console.log(res.data.data[0].url,"777777");
                let text = res.data.data[0].url
                console.log(text);
                this.messages.push({
                    "url":text,
                    isMyMsg: false
                })
                // this.message += (text + "\n")
                // this.msgLoad = false
                // this.sentexttp = '发送图片问题'
                this.$nextTick(() => {
                    const container = this.$refs.chatbotMessageContainer;
                    container.scrollTop = container.scrollHeight;
                });
            }).catch(error =>{
				console.log('error',error);
				console.log(error.code);
				// this.sentexttp = '请求失败,重新输入问题发送'
				// this.msgLoad = false
			})

        },
    },
};
</script>
  
<style>
.chatbot-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-color: #f2f2f2;
  margin-top: 6%;
}
.title
{
    text-align: center;
    font-size: 34px;
}

.chatbot-message-container {
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  align-items: left;
}

.chatbot-message {
  display: flex;
  flex-direction: column;
  margin:auto;
  /* padding-left: 60%; */
  padding: 10px;
  max-width: 80%;
  border-radius: 10px;
  background-color: #f2f2f2;
  justify-content:  flex-start;
}

.user-message {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: #0084ff;
  color: white;
  word-break: break-all;
}

.chatbot-input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border-top: 1px solid gray;
}

.chatbot-input-container input {
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  width: 80%;
}

.chatbot-input-container button {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #0084ff;
  cursor: pointer;
}
</style>