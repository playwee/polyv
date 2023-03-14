<template>
  <div class="translate-app">
    <div class="input-area">
      <h1>在线翻译（文章)</h1>
      <h2>请输入需要翻译的内容:</h2>
      <textarea v-model="text" rows="5"></textarea>
    </div>

    <div class="options">
      <label>源语言:</label>
      <select v-model="source">
        <option v-for="lang in languages" :value="lang.value">{{ lang.label }}</option>
      </select>

      <label>目标语言:</label>
      <select v-model="target">
        <option v-for="lang in languages" :value="lang.value">{{ lang.label }}</option>
      </select>

      <button @click="translate">翻译</button>
    </div>

    <div class="output-area">
      <h2>翻译结果:</h2>
      <div class="output-box">
        <div class="output-box-label">原文：</div>
        <div class="output-box-content">{{ text }}</div>
      </div>
      <div class="output-box">
        <div class="output-box-label">译文：</div>
        <div class="output-box-content" v-if="loading">正在翻译...</div>
        <div class="output-box-content" v-else>{{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TranslateApp',
  data() {
    return {
      text: '',
      source: 'auto',
      target: 'zh-CHS',
      result: '',
      loading: false,
      languages: [
        { label: '自动检测', value: 'auto' },
        { label: '中文', value: 'zh-CHS' },
        { label: '英语', value: 'en' },
        { label: '日语', value: 'ja' },
        { label: '韩语', value: 'ko' },
        { label: '法语', value: 'fr' },
        { label: '德语', value: 'de' },
        { label: '俄语', value: 'ru' },
        { label: '葡萄牙语', value: 'pt' },
        { label: '西班牙语', value: 'es' },
        { label: '意大利语', value: 'it' },
        { label: '荷兰语', value: 'nl' },
      ],
    };
  },
  methods: {
    translate() {
      this.loading = true;
      const url = `https://aidemo.youdao.com/trans?q=${this.text}&from=${this.source}&to=${this.target}`;

      axios.get(url)
        .then(response => {
          if (response.data.translation) {
            this.result = response.data.translation[0];
          } else {
            this.result = '翻译失败';
          }
          this.loading = false;
          console.log(response.data); // 输出翻译结果
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>
  
<style lang="less">
.translate-app {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 20px;
}

.input-area {
  margin-bottom: 20px;
}

.input-area h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

h1{
    text-align: center;
}

textarea {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.options label {
  font-size: 20px;
  margin-right: 10px;
}

select {
  font-size: 20px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
}

button {
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0062cc;
}

.output-area {
  margin-top: 20px;
}

.output-area h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.output-box {
  display: flex;
  margin-bottom: 10px;
}

.output-box-label {
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 20px;
}

.output-box-content {
  font-size: 16px;
}
</style>