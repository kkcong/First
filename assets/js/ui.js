$(function () {
	if($(".cate-wrap").length > 0) cateSticky();

	//총 자산 금액 스위치
	$(".btn-switch").each(function(){
		var checkbox = $(this).find("input:checkbox");
		var assetsTotal = $(".my-status .assets-total");
		var hiddenTxt = $(".my-status .hidden-txt");
		switchCheck();
		$(document).on('click','.btn-switch',function(){
			switchCheck();
		});
		function switchCheck(){
			if (checkbox.is( ":checked")){
				assetsTotal.css('display', 'inline-block');
				hiddenTxt.hide();
				checkbox.attr( "checked", "checked");
			} else {
				assetsTotal.hide();
				hiddenTxt.css('display', 'inline-block');
				checkbox.removeAttr( "checked");
			}
		}
	});
});

//약정정보 배너 Swiper
function recommSwiper(){
	var recommSwiper = new Swiper('.recomm .swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		//loop: true,
		on: {
			init: function (index) {
				var idx = this.realIndex;
				$(".recomm .tab-menu button").click(function(){
					var idxBtn = $(this).index();
					$(".recomm .tab-menu button").addClass("active").not(this).removeClass("active");
					recommSwiper.slideTo(idxBtn);
				});
			},
			slideChange: function (index) {
				var idx = this.realIndex;
				$(".recomm .tab-menu button").addClass("active").not($(".recomm .tab-menu button").eq(idx)).removeClass("active");
				$(".recomm .tab-menu button").click(function(){
					var idxBtn = $(this).index();
					$(".recomm .tab-menu button").addClass("active").not(this).removeClass("active");
					recommSwiper.slideTo(idxBtn);
				});
			}
		},
	});
}


//제공혜택 배너 Swiper
function thumbSwiper(obj, slidesView, space1, space2){
	var galleryThumbs = new Swiper(obj+' .gallery-thumbs', {
        spaceBetween: space1,  
        slidesPerView: slidesView,
        freeMode: true,  
		//centeredSlides: true,
        //loop: true,  
        //loopedSlides: 3,
        watchSlidesVisibility: true,  
        watchSlidesProgress: true,
		on: {
			init: function (index) {
				var idx = this.realIndex;
				console.log(idx)
			},
			slideChange: function (index) {
				var idx = this.realIndex;
				var scWidth = $(window).width();
				//galleryThumbs.setTranslate(-100);

				// swiper.on('setTranslate', function onSliderMove() {
				// 	console.log(this.translate);
				//   });
				//console.log(idx)
				
			}
		},
    });
    var galleryTop = new Swiper(obj+' .gallery-banner', {  
        spaceBetween: space2,  
		//initialSlide: 2,
        //loop: true,  
        //loopedSlides: 3,
		noSwiping: true,
        navigation: {  
          nextEl: obj+' .swiper-button-next',  
          prevEl: obj+' .swiper-button-prev',  
        },  
        thumbs: {  
          swiper: galleryThumbs,  
        },
		on: {
			init: function (index) {
				var idx = this.realIndex;
				$(".gallery-banner").addClass("swiper-no-swiping")
			},
			slideChange: function (index) {
				var idx = this.realIndex;
				// var bannerWidth = $(obj+" .banner-area").width();
				// var btnWidth = $(".tag-btn .swiper-slide").eq(idx).width();
				// var btnPos = $(".tag-btn .swiper-slide").eq(idx).position().left;
				// var size = (btnPos+btnWidth)
				//Sum += w;
				//console.log(`bannerWidth = ${bannerWidth} / idx = ${idx} / btnPos = ${btnPos}`)
				//galleryThumbs.setTranslate(-1*btnPos);
				// if(bannerWidth < (btnPos+btnWidth)){
				// }
				
			}
		},
    });
}

//banner type Swiper
function bannerSwiper(obj, slidesView, space){
	var specialSwiper = new Swiper(obj+" .swiper-container", {
		slidesPerView: slidesView,
		spaceBetween: space,
        pagination: {
			el: obj+" .swiper-pagination",
			dynamicBullets: true,
		},
	});
}

//내 카드 실적 한눈에 보기 그래프
function perGraph(obj,myPer,total){
	var percent = myPer/total*100;
	var perLeft = myPer/total*100;
	var myWon = myPer.toLocaleString();
	var msg = $(obj+" .msg"), consum = $(obj+" .consum"), gauge = $(obj+" .gauge"), won = $(obj+" .won");
	/*
	if(percent < 50) {
		msg.html("실속있는 소비하고 <br>할인 혜택도 받으셔야죠!");
	} else if(percent >= 50 && percent < 75) {
		//perLeft = perLeft-15;
		msg.html("실적 달성이 코앞이에요!");
	} else if(percent >= 75 && percent <= 100) {
		msg.html("실적 달성이 코앞이에요!");
	} else if(percent > 100 && percent < 110) {
		msg.html("통신비 아끼기에 <br>성공하셨어요!");
	} else if(percent >= 110 && percent < 120) {
		consum.addClass("p124");
		msg.html("통신비 아끼기에 <br>성공하셨어요!");
	} else if(percent > 135) {
		perLeft = 120;
		consum.addClass("over");
		msg.html("통신비 아끼기에 <br>성공하셨어요!");
	}
	*/
	if(percent > 80) {consum.addClass("stop");}
	if(percent >= 90) {consum.addClass("rotate");}
	if(percent >= 100) {consum.addClass("full");}
	gauge.css("width",percent+"%");
	consum.css("left",perLeft.toFixed(0)+"%");
	won.text(myWon);
}

//미션 수행하면 통신비 할인 그래프
function coinGraph(obj,myPer,total){
	var percent = myPer/total*100;
	var myWon = myPer.toLocaleString();
	var msg = $(obj+" .msg"), consum = $(obj+" .consum"), gauge = $(obj+" .gauge"), won = $(obj+" .won");
	if(percent > 100) percent = 100;
	gauge.css("width",percent+"%");
	consum.css("left",perLeft.toFixed(0)+"%");
}

//결합하고 또 추가 할인 차트
function chart(obj){
	var data1 = Number($(obj).attr("data-internet")),
		data2 = Number(data1)+Number($(obj).attr("data-tv")),
		data3 = Number(data2);
	$(obj).css("background","conic-gradient(#f7a23d 0% "+data1+"%, #e84d29 "+data1+"% "+data2+"%, #f9e669 "+data3+"% 100%)");
}
function chart2(obj){
	var datas = $(obj).data();
	var data1 = Number($(obj).attr("data-data1")),
		data2 = Number(data1)+Number($(obj).attr("data-data2"));
	$(obj).css("background","conic-gradient(#b0cce1 0% "+data1+"%, #d1e4f4 "+data1+"% 100%)");
}

//accordion
function accordion(){
	$(document).on('click','.accordion .tit button', function() {
		function slideDown(target) {
			slideUp();
			$(target).addClass('fold').parent().next().slideDown('fast');
		}
		function slideUp() {
			$('.accordion .tit button').removeClass('fold').parent().next().slideUp('fast');
		}
		$(this).hasClass('fold') ? slideUp('fast') : slideDown(this);
	});
}
function accordionAssets(){
	$(document).on('click','.accordion .tit .fold-btn', function() {
		function slideDown(target) {
			slideUp();
			$(target).addClass('fold').parent().next().slideDown('fast');
		}
		function slideUp() {
			$('.accordion .tit .fold-btn').removeClass('fold').parent().next().slideUp('fast');
		}
		$(this).hasClass('fold') ? slideUp('fast') : slideDown(this);
	});
}
function accordionKon(){
	$(document).on('click','.accordion .tit button', function() {
		function slideDown(target) {
			slideUp();
			$(target).addClass('fold').parent().next().slideDown('fast');
			$('.coinback-guide-btn').addClass('view');
			window.scrollTo({top: 0, behavior: 'smooth'});
		}
		function slideUp() {
			$('.accordion .tit button').removeClass('fold').parent().next().slideUp('fast');
			$('.coinback-guide-btn').removeClass('view');
		}
		$(this).hasClass('fold') ? slideUp('fast') : slideDown(this);
	});
}

//자산 설정 카테고리 sticky
function cateSticky(){
	var lastId, 
		headerGab = $("#header").height(), cateh =  $(".cate-wrap").height(),
		menuItems = $(".cate-wrap button"),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr('data-target'));
			if (item.length) { return item; }
		});
    $(document).on('click','.cate-wrap button', function() {
		var target = $(this).attr('data-target'),
			offsetTop = $(target).offset().top - (headerGab+cateh);
		menuItems.addClass("current").not(this).removeClass("current");
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 400, "easeInOutExpo");
		
		return false;
		e.preventDefault();
	});

	$(window).scroll(function(){
		var cateTop = $(".cate-wrap").offset().top, scrollTop = $(this).scrollTop(),
			headerGab = $("#header").height(), cateh =  $(".cate-wrap").outerHeight(),
			firstAssets = $(".cate-wrap li:first-child button").attr('data-target'),
			lastAssets = $(".cate-wrap li:last-child button").attr('data-target');
		if(scrollTop >= (cateTop-headerGab)){
			$(".cate-wrap").css("height",cateh);
			$(".cate-wrap .inner").css("top",headerGab).addClass("fixed");
		} else {
			$(".cate-wrap .inner").removeClass("fixed").removeAttr("style");
		}
		var cur = scrollItems.map(function(){
			if ($(this).offset().top - (headerGab+cateh) <= scrollTop)
				return this;
		});

		cur = cur[cur.length-1];
		var id = cur && cur.length ? "#"+cur[0].id : firstAssets;
		if (scrollTop >= $(document).height() - $(window).height()){
			
			menuItems.removeClass("current");
			$("[data-target='"+lastAssets+"']").addClass("current");
		} else {
			menuItems.removeClass("current");
			$("[data-target='"+id+"']").addClass("current");
			// if (lastId !== id) {
			// 	lastId = id;
			// 	menuItems.removeClass("current");
			// 	$("[data-target='#"+id+"']").addClass("current");
			//}
		}
	});
}

//자산선택 카테고리 전체선택
function selectAll(data){
	let assets = $("#"+data+" input"),checkLength = $("#"+data+" input").length,checkedLength = $("#"+data+" input:checked").length;
	checkLength == checkedLength?assets.prop("checked", false):assets.prop("checked", true);
}

//체크동의
function agreeAll(obj,checkboxName,activeBtn,status){
	status == "checked" ? (
		$(obj).prop("checked", true), 
		$("input[name='"+checkboxName+"']").prop("checked", true),
		activeBtn?$("#"+activeBtn).attr("disabled",false):""
	) : (
		$(obj).prop("checked", false), 
		$("input[name='"+checkboxName+"']").prop("checked", false),
		activeBtn?$("#"+activeBtn).attr("disabled",true):""
	);
	//이용약관 동의 전체동의 체크
	$(obj).click(function(){
		$(obj).is(":checked") == true ? (
			$("input[name='"+checkboxName+"']").prop("checked", true), 
			activeBtn?$("#"+activeBtn).attr("disabled",false):""
		) : (
			$("input[name='"+checkboxName+"']").prop("checked", false),
			activeBtn?$("#"+activeBtn).attr("disabled",true):""
		);
	});
	$("input[name='"+checkboxName+"']").each(function(){
		$(this).click(function(){
			let checkLength = $("input[name='"+checkboxName+"']").length,
				checkedLength = $("input[name='"+checkboxName+"']:checked").length;
			checkLength == checkedLength?(
				$(obj).prop("checked", true),
				activeBtn?$("#"+activeBtn).attr("disabled",false):""
			):(
				$(obj).prop("checked", false),
				activeBtn?$("#"+activeBtn).attr("disabled",true):""
			);
		});
	});
}

//모달 팝업 호출
function modal(obj){
	$("body").addClass("dimmed");
	$(obj).addClass("open");

	//document 클릭 시 모달 창 닫기
	dimmedClose();
}
//모달 팝업 닫기
function modalClose(that){
	$("body").removeClass("dimmed");
	$("body").removeClass("none-click-dimmed");
	var type = typeof(that);
	if ( type == "object" ) $(that).parents(".modal").removeClass("open");
	else  $(that).removeClass("open");
}
//모달 풀사이즈 팝업 호출
function modalFull(that,obj){
	var title = $(that).text();
	$(obj+" .modal-container-header .title").text(title);
	$(obj).addClass("open");
	scrollChk(obj);
	//document 클릭 시 모달 창 닫기
	dimmedClose();
}
//모달 풀사이즈 팝업 닫기
function modalFullClose(that){
	var type = typeof(that);
	if ( type == "object" ) $(that).parents(".modal").removeClass("open");
	else  $(that).removeClass("open");
}
function dimmedClose(){
	//document 클릭 시 모달 창 닫기
	$(document).on('click', function(e) {
		console.log("dd")
		var $eTarget = $(e.target);
		if ( $eTarget.hasClass('dimmed') ) {
			modalClose('.modal.open');
			$("body").removeClass("dimmed");
			$("body").removeClass("none-click-dimmed");
		}
	});
}

//스크롤 유무 체크
function scrollChk(obj){
	var divScroll = $(".terms-ui");
	var divHeight = divScroll.height();
	if( divScroll.hasScrollBar() ){
		divScroll.scrollTop(0);
		$(obj+" .modal-container .btn-light-secondary").text("아래로 내려보기").attr("onclick","scrollDown(this)");
	} else {
		$(obj+" .modal-container .btn-light-secondary").text("동의").attr("onclick","scrollDown(this)");
	}
	divScroll.scroll(function(){  
		console.log($(this)[0].scrollHeight +" / "+ Math.round($(this).scrollTop())) 
		if ($(this)[0].scrollHeight - Math.round($(this).scrollTop())-100 <= $(this).outerHeight()){
			$(obj+" .modal-container .btn-light-secondary").text("동의").attr("onclick","modalFullClose(this)");
		} else {
			//$(obj+" .modal-container .btn-light-secondary").text("아래로 내려보기");
		}        
	});
}
//스크롤 이동 호출
function scrollDown(that){
	var divScroll = $(".terms-ui");
	var divHeight = divScroll.height();
	var divScrollTop = divScroll.scrollTop();
	divScroll.stop(true).animate({ scrollTop: divScrollTop+divHeight },200,function(){
		divScroll.scroll(function(){   
			console.log($(this)[0].scrollHeight +" / "+ Math.round($(this).scrollTop()))
			if ($(this)[0].scrollHeight - Math.round($(this).scrollTop()-100) <= $(this).outerHeight()){
				$(that).text("동의").attr("onclick","modalFullClose(this)");
			}         
		});
	});		
}

//스크롤 추가 20220614
function scrollUI() {
	$('.terms-ui').bind('scroll', function() {
		if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight) {
			//alert('aaaaa');
			$(".btn-light-secondary").text("동의").attr("onclick","modalFullClose(this)");
		} else {
			$(".btn-light-secondary").text("아래로 내려보기").attr("onclick","scrollDown(this)");
		}
	});
}

//KON 적립 스크롤 따라 show hide
function konScroll() {
	$(window).scroll(function() {
		if($(this).scrollTop()) {
			$('.made-coin').parent().addClass('fixed');
		} else {
			$('.made-coin').parent().removeClass('fixed');
		}
	})
}

function seqInit(){ 
	var seqIdx = 0, seq_play = true;
	var img_load = 0;//시작 번호
	var img_count = 38;//마지막 번호
	var img_sec = 40;//초 1000 = 1초
	for (seqIdx=0; seqIdx <= img_count; seqIdx++){
		var img_tmp = new Image();
		img_tmp.src = "./assets/images/common/splash/splash"+seqIdx+".jpg";
		img_tmp.onload=function(){
			++img_load;
			if (img_load == img_count) {
			rolling();
			}
		};
		img_tmp.onerror = function(){
			++img_load;
			if (img_load == img_count) {
			rolling();
			}
		};
	}
  seqIdx=0;
  function rolling() {
    setTimeout(function(){
		if(seq_play) seqIdx++; 
		$(".splash img").attr("src","./assets/images/common/splash/splash"+seqIdx+".jpg");
		if(seqIdx == 38) {
			seq_play = false;
			seqIdx = 0;
		}
		if(!seq_play) {if(seqIdx == 0) seq_play = true;}
		rolling();
    },img_sec);
  }
}

function aniCount(time) {
	const counters = $('.count');
	counters.forEach( counter => {
		const value = +counter.getAttribute('count');
		animateValue(counter, 0, value, time);
	});
}

$.fn.hasScrollBar = function() {
	return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
};

//tab
function tabMenu() {
	$(".tab-wrp .tab-menu li a").on("click", function(){  
		const num = $(".tab-wrp .tab-menu li a").index($(this)); 
		$(".tab-wrp .tab-menu li").removeClass("focused"); 
		$(".tab-wrp .tab-cont").removeClass("focused"); 
		$('.tab-wrp .tab-menu li:eq(' + num + ')').addClass("focused"); 
		$('.tab-wrp .tab-cont:eq(' + num + ')').addClass("focused"); 
	});
	
	$(".tab-wrp .inner-tab li a").on("click", function(){  
		const num = $(".tab-wrp .inner-tab li a").index($(this)); 
		$(".tab-wrp .inner-tab li").removeClass("focused"); 
		$(".tab-wrp .inner-tab-cont").removeClass("focused"); 
		$('.tab-wrp .inner-tab li:eq(' + num + ')').addClass("focused"); 
		$('.tab-wrp .inner-tab-cont:eq(' + num + ')').addClass("focused"); 
	});
}

/* 알람 list swipe */
function alarmTrash(){
	$('.alarm-wrp .dtl>li').swipe({ 
		swipe:function(event, direction) {
			if( direction == "left" ){ 
				$(this).addClass('trash-list');
				$('.trash-list>div').addClass('reverse');
				$('.trash-list .ico-area').addClass('trash-area');
				$('.trash-area').find('i').remove();
				$('.trash-area').find('.ico-trash').show();
				$(this).find('.ico-trash').click(function(){
					$(this).parents().find('.trash-list').hide('2000');
				});
			}else if( direction == "right" ){ 
				//오른쪽 액션 필요시 작성 필요
			threshold:0
			} 
		}, 
	}); 
}

/* 브랜드 추가 */
function addBrand(){
	$('.add-brand').click(function(){
		$(this).hide();
		$(this).parents().find('.brand-select').removeClass('select-complete').addClass('select-add');
	});
}

/* desc info */
function descInfo(){
	$('.tooltip-wrp .ico-desc-info').click(function(){
		$(this).parent().toggleClass('focused');
	});
	$('.tooltip-wrp .desc-txt').click(function(){
		$(this).parent().removeClass('focused');
	});
}

/* data picker - 자산관리 이력정보 */
function dataCalPic() {
	$('.picker-bg-bk, .btn-cal-close').hide();
	$('#dateStart, #dateEnd').click(function(){
		//$(this).parents().find('body').addClass('scroll-y-hidden');
		$('#ui-datepicker-div').addClass('bg-white financial-wrp');
	});
    var dateFormat = "yy/mm/dd",
    	from = $( "#dateStart" ) //시작일 선택
		.datepicker({
			//showMonthAfterYear: true,//연도-월 순서
			//changeMonth: true,//월 변경 필요시 살리기
			dateFormat:"yy-mm-dd",
			firstDay: 1,
			monthNames: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
			//showButtonPanel: true,
			showAnim: "slideDown",
			closeText: '닫기',
			dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			//minDate:0,//오늘 이전 날짜 선택불가
		})
		.on( "change", function() {
		to.datepicker( "option", "minDate", getDate(this) );//종료일의 minDate 지정
		}),
		to = $( "#dateEnd" ).datepicker({ //종료일 선택
			dateFormat:"yy-mm-dd",
			monthNames: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
			dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			minDate:'+1D' //내일부터 선택가능(+1D/+1M/+1Y..ND, NM, NY)
		})
		.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate(this) );//시작일의 maxDate 지정
		});
 
    function getDate(element) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
        if(element.id == 'dateStart'){
        date.setDate(date.getDate()+1);//종료일: 시작일+1일 ~
        }else{
         date.setDate(date.getDate()-1);//시작일: 종료일-1일 ~
        }
      } catch( error ) {
        date = null;
      }
      return date;
    }
}

/* pass inner banner */
function passInnerBanner() {
	var swiper = new Swiper(".pass-bn-area", {
        pagination: {
          el: ".swiper-pagination",
        },
    });
}

/* layerPopup close */
function layerPopupWrp() {
	const pop = document.querySelector('.layerPopup');
	const close = document.querySelector('.btnTodayHide');
	const closeDefault = document.querySelector('.btnClose');

	// 쿠키 가져오기
	const getCookie = function (cname) {
		const name = cname + "=";
		const ca = document.cookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			const c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		return "";
	};

	// 24시간 기준 쿠키 설정하기  
	const setCookie = function (cname, cvalue, exdays) {
		const todayDate = new Date();
		todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
		const expires = "expires=" + todayDate.toUTCString(); // UTC기준의 시간에 exdays인자로 받은 값에 의해서 cookie가 설정 됩니다.
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	const couponClose = function(){
		if(document.querySelector('input[name="chkbox"]').checked === true){
			setCookie("close","Y",1);   //기간(1=하루)
		}
		pop.style.display = 'none';
	};

	const cookiedata = document.cookie;
	if(cookiedata.indexOf("close=Y")<0){
		pop.style.display = 'block';
	}else{
		pop.style.display = 'none';
	}

	closeDefault.addEventListener('click', function(){
		couponClose();
	});
	close.addEventListener('click', function(){
		couponClose();
	});
}


/* 코인백 내역보기 sort list */
function coinbackSortList() {
	$('.coinback-dtl .form-radio-btn').click(function(){
		$('.coinback-dtl').removeClass('open');
		$(this).parents().find('body').removeClass('dimmed');
	});
	$('#regularAll').click(function(){
		$('.sort-txt').text('전체');
	});
	$('#regularYes').click(function(){
		$('.sort-txt').text('적립');
	});
	$('#regularNo').click(function(){
		$('.sort-txt').text('사용');
	});
}

/* modal dimmed */
function alertDimmed() {
	$('.modal.full .btn').click(function(){
		if($('.modal.alert').hasClass('open')){
			$('.modal.full').addClass('dimmed');
		} else {
		}
	});
}

function dimmedNoneClick(){
	$('.btn.dimmed-disabled').on('click', function(e) {
		//console.log("dd2")
		if ( $('.modal').hasClass('none-click') ) {
			$("body").addClass("none-click-dimmed");
		}
	});
	$('.modal.open .btn').click(function(){
		$('body').removeClass('none-click-dimmed');
	});

	//function bodyDimmed(){
	//	if ( $('.modal').hasClass('none-click') ) {
	//		$("body").addClass("none-click-dimmed");
	//	}
	//}
	//if ( $('.modal').hasClass('none-click') ) {
	//	setTimeout(bodyDimmed, 2000);
	//}
}