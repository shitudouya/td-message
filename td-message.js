(function (window, $) {
  var defaultOptions = {
    type: "info", //消息提示的类型，必填 info/success/error/warning
    text: "默认文字", //消息提示的文字，必填
    duration: 2000, //经过多少秒后关闭消息提示，可选，默认2s后消失
    positon: "top-center", //消息提示的位置，可选，默认显示在顶部中间
    showClose: true, //是否显示关闭按钮，可选，默认开启
  };

  function MessageTip(options) {
    this.info_icon =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  width="22" height="22" viewBox="0 0 1024 1024" style="color: rgb(28, 173, 242);"><path fill="currentColor" d="M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72z M581,673.9 c-33.2,49.9-67,88.3-123.8,88.3c-38.8-6.3-54.7-34.1-46.3-62.4L484,457.6c1.8-5.9-1.2-12.3-6.6-14.2c-5.4-1.9-15.9,5.1-25.1,15.1 l-44.2,53.2c-1.2-8.9-0.1-23.7-0.1-29.6c33.2-49.9,87.8-89.2,124.8-89.2c35.2,3.6,51.8,31.7,45.7,62.6l-73.6,243.3 c-1,5.5,1.9,11.1,6.9,12.8c5.4,1.9,16.8-5.1,26-15.1l44.2-53.1C583,652.3,581,667.9,581,673.9z M571.2,357.6 c-28,0-50.6-20.4-50.6-50.4c0-30,22.7-50.3,50.6-50.3c28,0,50.6,20.4,50.6,50.3C621.8,337.3,599.1,357.6,571.2,357.6z"></path></svg>';
    this.close_icon =
      '<svg t="1589350225452" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2131" width="12" height="12"><path d="M566.97558594 521.09667969L856.8828125 231.18945312c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355468l-1.58203125-1.58203125c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0L512 466.51660156 222.09277344 176.21386719c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0l-1.58203125 1.58203125c-15.02929688 14.63378906-15.02929688 38.75976563 0 53.39355469l289.90722656 289.90722656L167.1171875 811.00390625c-14.63378906 14.63378906-14.63378906 38.75976563 0 53.39355469l1.58203125 1.58203125c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0L512 576.07226563 801.90722656 865.97949219c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0l1.58203125-1.58203125c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355469L566.97558594 521.09667969z" fill="#363F4D" p-id="2132"></path></svg>';
    this.success_icon =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="color: rgb(23, 183, 126);"><path fill="currentColor" d="M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72L512,72z M758.9,374 c-48.5,48.6-81.2,76.9-172.3,186.8c-52.6,63.4-102.3,131.5-102.7,132L462.1,720c-4.6,6.1-13.5,6.8-19.1,1.6L267.9,558.9 c-17.8-16.5-18.8-44.4-2.3-62.2s44.4-18.8,62.2-2.3l104.9,97.5c5.5,5.1,14.1,4.5,18.9-1.3c16.2-20.1,38.4-44.5,62.4-68.6 c90.2-90.9,145.6-139.7,175.2-161.3c36-26.2,77.3-48.6,87.3-36.2C792,343.9,782.5,350.3,758.9,374L758.9,374z"></path></svg>';
    this.warining_icon =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="color: rgb(255, 198, 3);"><path fill="currentColor" d="M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M510,770.8 c30.4,0,55-24.6,55-55s-24.6-55-55-55s-55,24.6-55,55S479.6,770.8,510,770.8z M509.8,255.3c-39.3,0-71.2,31.9-71.2,71.2 c0,3.1,0.2,6.2,0.6,9.3L472.4,588c2.5,19.3,18.9,33.7,38.4,33.7c19.4,0,35.8-14.4,38.2-33.7l31.8-252.2c5-39.2-22.8-75-62-79.9 C515.9,255.5,512.8,255.3,509.8,255.3z"></path></svg>';
    this.error_icon =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="color: rgb(245, 108, 108);"><path fill="currentColor" d="M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M579.7,512l101.6-101.6 c18.7-18.7,18.7-49,0-67.7c-18.7-18.7-49-18.7-67.7,0l0,0L512,444.3L410.4,342.7c-18.7-18.7-49-18.7-67.7,0s-18.7,49,0,67.7 L444.3,512L342.7,613.6c-18.7,18.7-18.7,49,0,67.7c18.7,18.7,49,18.7,67.7,0L512,579.7l101.6,101.6c18.7,18.7,49,18.7,67.7,0 c18.7-18.7,18.7-49,0-67.7L579.7,512z"></path></svg>';
    this.settings = $.extend({}, defaultOptions, options);
    this.pos = this.settings.positon.split("-")[0];
  }

  MessageTip.prototype = {
    init: function () {
      switch (this.settings.type) {
        case "info":
          this.showInfo();
          break;
        case "success":
          this.showSuccess();
          break;
        case "error":
          this.showError();
          break;
        case "warning":
          this.showWarning();
          break;
        default:
          break;
      }
    },

    createElment: function (icon) {
      var that = this;
      var messageNum = $(".td-message").size();
      var htmlStr = `
      <div class="td-message-container ${this.settings.positon}" >
        <div class="td-message ${this.settings.positon}" data-index="${messageNum}">
          <div class="td-icon">
            ${icon}
          </div>
          <div class="td-content">
            ${this.settings.text}
          </div>
          <div class="td-close" style="display:${this.settings.showClose ? "block" : "none"}">
            <button>
              ${this.close_icon}
            </button>
          </div>
        </div>
      </div>
      `;
      var contentStr = `
      <div class="td-message ${this.settings.positon}" data-index="${messageNum}">
          <div class="td-icon">
              ${icon}
          </div>
          <div class="td-content">
            ${this.settings.text}
          </div>
          <div class="td-close" style="display:${this.settings.showClose ? "block" : "none"}">
            <button>
              ${this.close_icon}
            </button>
          </div>
        </div>
      `;
      if ($(".td-message-container")[0]) {
        $(contentStr).appendTo($(".td-message-container"));
      } else {
        $(htmlStr).appendTo($("body"));
      }
      $(".td-message-container .td-message .td-close button")
        .off("click")
        .on("click", function () {
          var index = $(this).parent().parent().get(0).dataset.index;
          that.destroy(index);
        });

      var timeduration = parseInt(this.settings.duration);
      if (!(timeduration === 0)) {
        setTimeout(() => {
          this.destroy(messageNum);
        }, timeduration);
      }
    },

    showInfo: function () {
      this.createElment(this.info_icon);
    },

    showSuccess: function () {
      this.createElment(this.success_icon);
    },

    showError: function () {
      this.createElment(this.error_icon);
    },

    showWarning: function () {
      this.createElment(this.warining_icon);
    },

    destroy: function (index) {
      $(`.td-message[data-index='${index}']`)
        .addClass(this.pos)
        .fadeOut("fast", function () {
          $(this).remove();
          if ($(".td-message").size() === 0) {
            $(".td-message-container").remove();
          }
        });
    },
  };

  $.extend({
    message: function (options) {
      var messageTip = new MessageTip(options);
      return messageTip.init();
    },
  });
})(window, jQuery);
