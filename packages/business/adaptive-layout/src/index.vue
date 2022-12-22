<template>
  <div class="xx-asd">
    <div id="canvas">
      <div class="row" id="line1">
        <div class="col" id="item1">
          <div class="sap-content">col 1</div>
        </div>
        <div class="col" id="item2">
          <div class="sap-content">col 2</div>
        </div>
        <div class="col" id="item3">
          <div class="sap-content">Completely cultivate leveraged action items via multidisciplinary internal or "organic" sources. Authoritatively.</div>
        </div>
        <div class="col" id="item4">
          <div class="sap-content">col 4</div>
        </div>
        <div class="col" id="item5">
          <div class="sap-content">col 5</div>
        </div>
      </div>
      <div class="row" id="line2">
        <div class="col" id="item6">
          <div class="sap-content">col 6</div>
        </div>
        <div class="col" id="item7">
          <div class="sap-content">xxx</div>
        </div>
        <div class="col" id="item8">
          <div class="sap-content">
            Continually maximize granular intellectual capital rather than visionary strategic theme areas. Quickly exploit cooperative web services after
            impactful total linkage. Objectively revolutionize leading-edge networks via vertical services.
          </div>
        </div>
      </div>
    </div>

    <h1>宽高等比例缩放</h1>
    <div class="container-wlsp"><div class="placeholder">占位, 撑开高度</div></div>
  </div>
</template>

<style lang="less" scoped>
.xx-asd {
  #canvas {
    width: 80%;
    margin: 20px auto;
    overflow: auto;

    padding: 1%;
    background: #ccc;
  }
  /*generic css for all elements*/
  img {
    display: block; /*needed to avoid alignment with baseline of text*/
  }
  .row {
    float: left;
    width: 100%;
    display: block;
    position: relative; /*prevents shifting when changing viewport in IE;thanks to Alan Gresley*/
  }
  .row:first-child {
    background-color: #c2dfeb;
  }
  .row:last-child {
    background-color: #fff2b7;
  }
  .col {
    position: relative;
    float: left;
    overflow: hidden;
    left: 100%;
    height: 100%;
  }
  #item1 {
    margin-left: -100%;
    width: 15%;
    background: #aca42e;
  }
  #item2 {
    margin-left: -80%;
    width: 15%;
    background-color: #2a66b2;
  }
  #item3 {
    margin-left: -60%;
    width: 15%;
    background-color: transparent;
  }
  #item4 {
    margin-left: -40%;
    width: 15%;
    background: #aca42e;
  }
  #item5 {
    margin-left: -20%;
    width: 15%;
    background: #9f3b57;
  }
  #item6 {
    margin-left: -100%;
    width: 15%;
    background: #315c83;
  }
  #item7 {
    margin-left: -80%;
    width: 35%;
    height: 200px;
    background: red;
  }
  #item8 {
    margin-left: -40%;
    width: 35%;
    background: #9f3b57;
  }
  .sap-content {
    overflow: hidden;
  }
  /* 宽高等比例缩放 */
  .container-wlsp {
    width: 50%;
    outline: 1px solid blue;
  }
  .container-wlsp .placeholder {
    width: 100%;
    height: 0;
    padding-top: 100%;
    outline: 1px solid red;
  }
}
</style>
