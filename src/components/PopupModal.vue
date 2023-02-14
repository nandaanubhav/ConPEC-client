<template>
  <div id="popup_alert" class="popup-msg" v-show="visible">
    <div class="content-body">
      <div class="popup-header">
        <div class="content-title">
          <slot name="title"></slot>
        </div>
        <div>
          <button type="button" class="close-btn" @click="$emit('close')">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>

      <div id="popup_alert_body" class="content-msg">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.popup-msg {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.content-body {
  background-color: #fff;
  max-width: 600px;
  border-radius: 6px;
  padding: 15px 10px 15px 20px;
  margin: 15% auto;
}

.popup-header {
  display: grid;
  grid-template-columns: 1fr 15px;
}

.close-btn {
  border: none;
  color: red;
  background-color: white;
  position: relative;
  top: -15px;
  font-size: larger;
}

.popup-msg .content-body {
  padding: 15px;
  max-width: 500px;
}
.popup-msg .content-icon {
  text-align: center;
  font-size: 3em;
}
.popup-msg .content-icon .icon-info {
  color: #4794ca;
}
.popup-msg .content-icon .icon-error {
  color: #d13636;
}
.content-title {
  font-weight: bold;
  font-size: 1em;
  text-align: center;
}
.popup-msg .content-msg {
  margin: 20px 0;
}
.popup-msg .content-close {
  font-size: 1.2em;
  position: inherit;
  text-align: center;
}
.popup-msg .content-close a {
  text-decoration: none;
  width: auto;
  color: #fff;
  background-color: #4794ca;
}
.popup-msg .content-close a:hover {
  border: solid 2px #20618f;
  background-color: #20618f;
}

popup-msg .content-acknowledge {
  font-size: 1.2em;
  position: inherit;
  text-align: center;
}
.popup-msg .content-acknowledge a {
  text-decoration: none;
  width: auto;
  color: #fff;
  background-color: #4794ca;
}
.popup-msg .content-acknowledge .cancel a {
  text-decoration: none;
  width: auto;
  color: #fff;
  border: solid 2px #e70040;
  background-color: #e70040;
}

.popup-acknowledge .content-body .icon-acknowledge {
  color: #4794ca;
  font-size: 2.5em;
  text-align: center;
}
.popup-acknowledge .content-body .content-msg {
  text-align: left;
  padding: 0px 25px;
  margin-top: 10px;
}
.popup-acknowledge .content-body .content-acknowledge {
  text-align: center;
  margin-bottom: 10px;
}

.hidden {
  display: none;
}
</style>
