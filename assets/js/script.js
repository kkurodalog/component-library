// ------------------
// delay
// ------------------

// ドロワーメニュー開閉時の動き
jQuery("#js-drawer__delay-icon").on("click", function (e) {
  e.preventDefault();

  // is-checkedクラスが存在する場合、is-not-checkedクラスをトグル
  jQuery("#js-drawer__delay.is-checked").toggleClass("is-not-checked");
  jQuery("#js-drawer__delay-content.is-checked").toggleClass("is-not-checked");

  // 初回クリックでis-checkedクラスを追加
  jQuery("#js-drawer__delay").addClass("is-checked");
  jQuery("#js-drawer__delay-content").addClass("is-checked");

  // クリックのたびにスクロール禁止クラスをトグル
  jQuery("#js-drawer__delay-icon").toggleClass("is-checked");
  jQuery("body").toggleClass("u-scroll-allowed");
});
