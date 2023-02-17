<template>
  <section>
    <h2>axios 请求</h2>
    <input type="file" accept="*" multiple @change="uploadFile" />
    <button @click="onAxios('get')">get</button>
    <button @click="onAxios('post')">post</button>
  </section>
</template>

<script>
/* eslint-disable */
import ajax from '@packages/utils/src/xhr.js';
import axios from '@packages/axios-1.2.1';

export const BaseUrl = 'http://127.0.0.1:8380';

function getXhr() {
  ajax({
    url: `${BaseUrl}/user?ID=12345`,
    method: 'get',
  })
    .then(resp => {
      console.debug('resp: \n', resp);
    })
    .catch(err => {
      console.debug('err:\n', err);
    });
}

function postXhr(data, contentType) {
  ajax({
    url: `${BaseUrl}/update?ID=12345`,
    method: 'POST',
    contentType,
    data,
  })
    .then(resp => {
      console.debug('resp: \n', resp);
    })
    .catch(err => {
      console.debug('err:\n', err);
    });
}

export default {
  methods: {
    onAxios(type) {
      const req = {
        method: type,
        url: `${BaseUrl}/post?ID=12`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      if (type === 'post') {
        req.data = JSON.stringify({
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
      }
      axios(req).then(res => {
        debugger;
      });
    },
    onXhr(type) {
      if (type === 'get') {
        getXhr();
      } else if (type === 'post') {
        postXhr(JSON.stringify({ age: 43232 }), 'application/json');
        // postXhr('key1=12&key2=zlong', 'application/x-www-form-urlencoded');
      }
    },
    uploadFile(e) {
      const files = e.target.files;
      postXhr(files);
    },
    parseFileContent(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = evt => {
        const txt = new TextDecoder().decode(evt.target.result);
        console.debug(`#${txt}#`);
      };
      reader.readAsArrayBuffer(file);
      /***
       reader.onload = (evt) => {
        console.debug(evt.target.result);
      };
       reader.readAsText(file);****/
    },
  },
};
</script>
