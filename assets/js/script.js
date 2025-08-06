// ドロワーメニュー開閉時の動き
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
  jQuery("header").toggleClass("is-checked");
  jQuery("#js-top-btn").toggleClass("is-checked");
  jQuery("body").toggleClass("u-scroll-allowed");
});

// ウィンドウサイズをリサイズ時にドロワーを閉じる
jQuery(window).on("resize", function () {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
  jQuery("header").removeClass("is-checked");
  jQuery("body").removeClass("u-scroll-allowed");
});

// スクロールしたときにヘッダーを透明にする
jQuery(window).on("scroll", function () {
  if (20 < jQuery(window).scrollTop()) {
    jQuery("header").addClass("u-opacity-85");
  } else {
    jQuery("header").removeClass("u-opacity-85");
  }
});

// front-page.htmlのスワイパー
const frontSwiper = new Swiper("#js-mv-swiper", {
  loop: true,
  slidesPerView: 1,
  allowTouchMove: false,
  effect: "fade",
  speed: 300,
  autoplay: {
    delay: 5000,
  },

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// page-staff.htmlの無限スライダー
const greetingSwiper = new Swiper("#js-greeting-swiper", {
  spaceBetween: 10,
  loop: true,
  speed: 10000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  allowTouchMove: false,

  breakpoints: {
    900: {
      spaceBetween: 20,
    },
  },
});

// ページ内aタグ遷移のスムーススクロール
jQuery('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  const offset = window.innerWidth >= 768 ? 90 : 70;
  const speed = 300;
  const id = jQuery(this).attr("href");
  console.log(id);
  const target = "#" == id ? "html" : id;
  const position = jQuery(target).offset().top - offset;

  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing"
  );
});

// ハッシュ付きaタグ遷移（外部リンク含む）
jQuery(function () {
  const offset = window.innerWidth >= 768 ? 90 : 70;
  const speed = 300;
  const hash = location.hash;

  if (hash) {
    const $target = jQuery(hash);
    if ($target.length) {
      const position = $target.offset().top - offset;

      // 読み込み後すぐはまだDOMが描画されてない可能性があるため少し遅延させる
      setTimeout(function () {
        jQuery("html, body").animate(
          {
            scrollTop: position,
          },
          speed,
          "swing"
        );
      }, 100); // 遅延させる秒数
    }
  }
});

// ウィンドウサイズをリサイズ時に余白を再計算
jQuery(window).on("resize", function () {
  const offset = window.innerWidth >= 1280 ? 90 : 70;
  const currentPosition = jQuery(window).scrollTop();
  const target = jQuery(window.location.hash);
  if (target.length) {
    const newPosition = target.offset().top - offset;
    jQuery("html,body").scrollTop(newPosition);
  }
});

// ページトップアイコンの表示・非表示
jQuery(window).on("scroll", function () {
  if (300 < jQuery(window).scrollTop()) {
    jQuery("#js-top-btn").addClass("is-show");
  } else {
    jQuery("#js-top-btn").removeClass("is-show");
  }
});

// フェードインアップ
const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in-view");
    } else {
      // entry.target.classList.remove("is-in-view");
    }
  });
});
const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItems) {
  intersectionObserver.observe(inViewItems);
});

// カレンダー入力欄
flatpickr(".js-form-calendar", {
  dateFormat: "Y-m-d", // 表示形式を指定
  readonly: true, // 直接入力を禁止
  locale: "ja", // 日本語化
});

// ページネーションの要素が多い時にu-hidden-spを付与（スマホ用）
var $wrapper = jQuery("#pagination-sp");
var $dots = $wrapper.find('.dots');
var $current = $wrapper.find('.current');

if ($wrapper.children().length > 7) {
  if ($dots.length && $current.length) {
    // dotsとcurrentの間の要素のうち、dotsの直後の要素にu-hidden-spを付与
    var foundDots = false;
    $wrapper.children().each(function() {
      if (jQuery(this).hasClass('dots')) {
        foundDots = true;
        return; // dots以降を探索開始
      }
      if (foundDots) {
        if (jQuery(this).hasClass('current')) {
          jQuery(this).prev().addClass('u-hidden-sp');
          return false; // dotsの直後の要素にu-hidden-spを付与したら終了
        }
      }
    });
    // currentとdotsの間の要素のうち、dotsの直前の要素にu-hidden-spを付与
    var foundCurrent = false;
    $wrapper.children().each(function() {
      if (jQuery(this).hasClass('current')) {
        foundCurrent = true;
        return; // current以降を探索開始
      }
      if (foundCurrent) {
        if (jQuery(this).hasClass('dots')) {
          jQuery(this).prev().addClass('u-hidden-sp');
          return false; // dotsの直前の要素にu-hidden-spを付与したら終了
        }
      }
    });
  }
}

// ページネーションの要素が多い時にu-hidden-pcを付与（ＰＣ用）
var $wrapper = jQuery("#pagination-pc");
var $dots = $wrapper.find('.dots');
var $current = $wrapper.find('.current');

if ($wrapper.children().length > 13) {
  if ($dots.length && $current.length) {
    // dotsとcurrentの間の要素のうち、dotsの直後の要素にu-hidden-pcを付与
    var foundDots = false;
    $wrapper.children().each(function() {
      if (jQuery(this).hasClass('dots')) {
        foundDots = true;
        return; // dots以降を探索開始
      }
      if (foundDots) {
        if (jQuery(this).hasClass('current')) {
          jQuery(this).prev().prev().prev().prev().addClass('u-hidden-pc');
          return false; // dotsの直後の要素にu-hidden-pcを付与したら終了
        }
      }
    });
    // currentとdotsの間の要素のうち、dotsの直前の要素にu-hidden-pcを付与
    var foundCurrent = false;
    $wrapper.children().each(function() {
      if (jQuery(this).hasClass('current')) {
        foundCurrent = true;
        return; // current以降を探索開始
      }
      if (foundCurrent) {
        if (jQuery(this).hasClass('dots')) {
          jQuery(this).prev().addClass('u-hidden-pc');
          return false; // dotsの直前の要素にu-hidden-pcを付与したら終了
        }
      }
    });
  }
}