<template>
  <div>
    <h1>测试demo</h1>
    <input type="file" accept="*" multiple @change="parseFileContent" />
    <div>
      <button @click="onAxios('get')">get</button>
      <button @click="onAxios('post')">post</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from '@packages/axios-1.2.1';
import ajax from '@packages/utils/src/xhr.js';

const BaseUrl = 'http://127.0.0.1:8380';

function getAxios() {
  axios.get(`${BaseUrl}/user?ID=12345`).then(resp => {
    console.debug('resp: \n', resp);
  }).catch(err => {
    console.debug('err:\n', err);
  });
}

function postAxios() {
  axios({
    url: `${BaseUrl}/update?ID=12345`,
    method: 'POST',
    data: {
      firstName: 111,
      key2: 'xxxx',
    },
    // x-www-form-urlencoded
    headers: { 'content-type': 'application/json' },
  }).then(resp => {
    console.debug('resp: \n', resp);
  }).catch(err => {
    console.debug('err:\n', err);
  });
}

function getXhr() {
  ajax({
    url: `${BaseUrl}/user?ID=12345`,
    method: 'get',
  }).then(resp => {
    console.debug('resp: \n', resp);
  }).catch(err => {
    console.debug('err:\n', err);
  });
}

function postXhr(data, contentType) {
  ajax({
    url: `${BaseUrl}/update?ID=12345`,
    method: 'POST',
    // x-www-form-urlencoded application/json
    contentType,
    data,
    // data: JSON.stringify({
    //   firstName: 111,
    //   key2: 'xxxx',
    // }),
  }).then(resp => {
    console.debug('resp: \n', resp);
  }).catch(err => {
    console.debug('err:\n', err);
  });
}

export default {
  methods: {
    onAxios(type) {
      if (type === 'get') {
        getXhr();
      } else if (type === 'post') {
        postXhr('key1=12&key2=zlong', 'application/x-www-form-urlencoded');
      }
    },
    uploadFile(e) {
      const files = e.target.files;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(files[0]);
      a.download = `test-${files[0].name}`;
      a.click();
      URL.revokeObjectURL(a.href);
    },
    parseFileContent(e) {
      const file = e.target.files[0];
      const reader = new FileReader()
      reader.onload = evt => {
        const txt = (new TextDecoder()).decode(evt.target.result);
        console.debug(`#${txt}#`);
      };
      reader.readAsArrayBuffer(file);
      /***
      reader.onload = (evt) => {
        console.debug(evt.target.result);
      };
      reader.readAsText(file);****/
    }
  }
};
</script>
