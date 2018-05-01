(function($) {
    "use strict";
    var calendarSwitch = (function() {
        function calendarSwitch(element, options) {
            this.settings = $.extend(true, $.fn.calendarSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }
        calendarSwitch.prototype = { /*说明：初始化插件*/
            /*实现：初始化dom结构，布局，分页及绑定事件*/
            init: function() {
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.selectors.sections;
                me.index = me.settings.index;
                me.comfire = me.settings.comfireBtn;

                var html = "<div class='headerWrapper'><div class='headerTip'>请选择入住离店日期</div><div class='comfire'>完成</div></div><table class='dateZone'><tr><td class='colo'>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td class='colo'>六</td></tr></table>" + "<div class='tbody'></div>"
                $(me.sections).append(html);
                $(me.sections).find('.headerWrapper').css({
                    "height": "50px",
                    "line-height": "50px",
                    "width":"100%",
                    "background":"#fff",
                    "position": "fixed",
                    "z-index":"9999"
                });
                $(me.sections).find('.headerTip').css({
                    "text-align": "left",
                    "line-height": "50px",
                    "margin-left":"10px",
                    "font-size":"15px"
                });
                $(me.sections).find(me.comfire).css({
                    "height": "26px",
                    "line-height": "26px",
                    "width": "50px",
                    "color": "#2EB6A8",
                    "position": "absolute",
                    "right": "10px",
                    "text-align": "center",
                    "font-size": "14px",
                    "cursor": "pointer",
                    "top": "11px",
                    "border": "1px solid #2EB6A8",
                    "border-radius": "4px"
                });

                for (var q = 0; q < me.index; q++) {
                    var select = q;
                    $(me.sections).find(".tbody").append("<p class='ny1'></p><table class='dateTable'></table>")
                    var currentDate = new Date();
                    currentDate.setDate(1);
                    currentDate.setMonth(currentDate.getMonth() + select);
                    var currentYear = currentDate.getFullYear();
                    var currentMonth = currentDate.getMonth();
                    var setcurrentDate = new Date(currentYear, currentMonth, 1);
                    var firstDay = setcurrentDate.getDay();
                    var yf = currentMonth + 1;
                    if (yf < 10) {
                        $(me.sections).find('.ny1').eq(select).text(currentYear + '年' + '0' + yf + '月');
                    } else {
                        $(me.sections).find('.ny1').eq(select).text(currentYear + '年' + yf + '月');
                    }
                    var DaysInMonth = [];
                    if (me._isLeapYear(currentYear)) {
                        DaysInMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    } else {
                        DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    }
                    var Ntd = firstDay + DaysInMonth[currentMonth];
                    var Ntr = Math.ceil(Ntd / 7);
                    for (var i = 0; i < Ntr; i++) {
                        $(me.sections).find('.dateTable').eq(select).append('<tr></tr>');
                    };
                    var createTd = $(me.sections).find('.dateTable').eq(select).find('tr');
                    createTd.each(function(index, element) {
                        for (var j = 0; j < 7; j++) {
                            $(this).append('<td></td>')
                        }
                    });
                    var arryTd = $(me.sections).find('.dateTable').eq(select).find('td');
                    for (var m = 0; m < DaysInMonth[currentMonth]; m++) {
                        arryTd.eq(firstDay++).text(m + 1);
                    }
                }
                me._initselected();

                me.element.on('click', function(event) {
                    event.preventDefault();
                    me._slider(me.sections)
                });
                //点击完成部分
                $(me.comfire).on('click', function(event) {
                    event.preventDefault();
                    if($(me.sections).find('.tbody .rz').length < 2){
                        $('.calendar_tishi').fadeIn(600);
                        setTimeout(function () {
                            $('.calendar_tishi').fadeOut(600);
                        },1500)
                        return false;
                    }
                    $(me.sections).find('.tbody .rz').each(function(index, element) {
                        //判断是否有离店显示，没有就不给完成提交
                        if ($(this).text() == '离店') {
                            //点击的日期存入input
                            $(me.sections).find('.tbody .rz').each(function(index, element) {
                                if ($(this).text() == '入住') {
                                    var day = parseInt($(this).parent().text().replace(/[^0-9]/ig, "")) //截取字符串中的数字
                                    if(day < 10){
                                        day = "0" + day;
                                    }
                                    var startDayArrays = $(this).parents('table').prev('p').text().split('');
                                    var startDayArrayYear = [];
                                    var startDayArrayMonth = [];
                                    var startDayYear = "";
                                    var startDayMonth = "";
                                    for (var i = 0; i < 4; i++) {
                                        var select = i;
                                        startDayArrayYear.push(startDayArrays[select])
                                    }
                                    startDayYear = startDayArrayYear.join('');
                                    for (var i = 5; i < 7; i++) {
                                        startDayArrayMonth.push(startDayArrays[i])
                                    }
                                    startDayMonth = startDayArrayMonth.join('');
                                    //添加入住到input
                                    $('#startDate').val(startDayYear + '-' + startDayMonth + '-' + day);
                                }
                                if ($(this).text() == '离店') {
                                    // var day = parseInt($(this).parent().text().replace(/[^0-9]/ig, "").substring(0, 2));
                                    var day = $(this).parent().text().split('离')[0];
                                    if(day < 10){
                                        day = "0" + day;
                                    }
                                    var endDayArrays = $(this).parents('table').prev('p').text().split('');
                                    var endDayArrayYear = [];
                                    var endDayArrayMonth = [];
                                    var endDayYear = "";
                                    var endDayMonth = "";
                                    for (var i = 0; i < 4; i++) {
                                        endDayArrayYear.push(endDayArrays[i])
                                    }
                                    endDayYear = endDayArrayYear.join('');
                                    for (var i = 5; i < 7; i++) {
                                        endDayArrayMonth.push(endDayArrays[i])
                                    }
                                    endDayMonth = endDayArrayMonth.join('');
                                    //添加入住到input
                                    $('#endDate').val(endDayYear + '-' + endDayMonth + '-' + day);
                                   // console.log($("#startDate").val().replace(/[^0-9]/ig, ""))
                                   // console.log($("#endDate").val().replace(/[^0-9]/ig, ""))
                                   // 如果入住等于离店
                                    if (parseInt($("#startDate").val().replace(/[^0-9]/ig, "")) == parseInt($("#endDate").val().replace(/[^0-9]/ig, ""))) {
                                        var x = $('#startDate').val();
                                        var a = new Date(x.replace(/-/g, "/"));
                                        var b = new Date();
                                        b = new Date(a.getTime() + 24 * 3600 * 1000);
                                        var ye = b.getFullYear();
                                        var mo = b.getMonth() + 1;
                                        var da = b.getDate();
                                        $('#endDate').val(ye + '-' + mo + '-' + da);
                                    }
                                }
                                startDayArrayYear = [];
                                startDayArrayMonth = [];
                                endDayArrayYear = [];
                                endDayArrayMonth = [];

                            });
                            //添加晚数
                            if($('.lidian_hover').text() != ""){
                                var NumDate = $('.lidian_hover').text().replace(/[^0-9]/ig,"");
                                $('.NumDate').text(NumDate);
                            }

                            var st = $('#startDate').val();
                            var en = $('#endDate').val();
                            //如果入住没值
                            if (st) {
                                me._slider(me.sections)
                                me._callback();
                            } else {
                                var b = new Date();
                                var ye = b.getFullYear();
                                var mo = b.getMonth() + 1;
                                var da = b.getDate();
                                $('#startDate').val(ye + '-' + mo + '-' + da);
                                b = new Date(b.getTime() + 24 * 3600 * 1000);
                                var ye = b.getFullYear();
                                var mo = b.getMonth() + 1;
                                var da = b.getDate();
                                $('#endDate').val(ye + '-' + mo + '-' + da);
                                $('.NumDate').text("1");
                                // alert("请选择入住离店日期")
                                me._slider(me.sections)
                                me._callback()
                            }
                        }
                    });
                });

            },
            _isLeapYear: function(year) {
                return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
            },
            _slider: function(id) {
                var me = this;
                me.animateFunction = me.settings.animateFunction;
                if (me.animateFunction == "fadeToggle") {
                    $(id).fadeToggle();
                } else if (me.animateFunction == "slideToggle") {
                    $(id).slideToggle();
                } else if (me.animateFunction == "toggle") {
                    $(id).toggle();
                }
            },
            _initselected: function() {
                var me = this;
                me.comeColor = me.settings.comeColor;
                me.outColor = me.settings.outColor;
                me.daysnumber = me.settings.daysnumber;
                var strDays = new Date().getDate();
                var arry = [];
                var arry1 = [];
                var tds = $(me.sections).find('.dateTable').eq(0).find('td');
                tds.each(function(index, element) {
                    if ($(this).text() == strDays) {
                        var r = index;
                        $(this).append('</br><p class="rz">入住</p>');
                        if ($(this).next().text() != "") {
                            $(this).next().append('</br><p class="rz">离店</p>');
                        } else {
                            $(".dateTable").eq(1).find("td").each(function(index, el) {
                                if ($(this).text() != "") {
                                    $(this).append('</br><p class="rz">离店</p>');
                                    return false;
                                }
                            });
                        }
                        me._checkColor(me.comeColor, me.outColor);

                    }
                })

                $(me.sections).find('.tbody').find('td').each(function(index, element) {
                    if ($(this).text() != '') {
                        arry.push(element);
                    }
                });

                for (var i = 0; i < strDays - 1; i++) {
                    $(arry[i]).css('color', '#ccc');
                }

                if (me.daysnumber) {
                    //可以在这里添加90天的条件
                    for (var i = strDays - 1; i < strDays + parseInt(me.daysnumber); i++) {
                        arry1.push(arry[i])
                    }
                    for (var i = strDays + parseInt(me.daysnumber); i < $(arry).length; i++) {
                        $(arry[i]).css('color', '#ccc')
                    }
                } else {
                    for (var i = strDays - 1; i < $(arry).length; i++) {
                        arry1.push(arry[i])
                    }
                }

                me._selectDate(arry1)
            },
            _checkColor: function(comeColor, outColor) {
                var me = this;
                var rz = $(me.sections).find('.rz');
                // console.log(rz);
                for (var i = 0; i < rz.length; i++) {
                    if (rz.eq(i).text() == "入住") {
                        rz.eq(i).closest('td').css({
                            'background': comeColor,
                            'color': '#fff'
                        });
                    } else {
                        rz.eq(i).closest('td').css({
                            'background': outColor,
                            'color': '#fff'
                        });
                    }
                }

            },
            _callback: function() {
                var me = this;
                if (me.settings.callback && $.type(me.settings.callback) === "function") {
                    me.settings.callback();
                }
            },
            _selectDate: function(arry1) {
                
                var me = this;
                me.comeColor = me.settings.comeColor;
                me.outColor = me.settings.outColor;
                me.comeoutColor = me.settings.comeoutColor;
                me.sections = me.selectors.sections;

                var flag = 0;
                var first;
                var sum;
                var second;
                $(arry1).on('click', function(index) {
                    index.stopPropagation();
                    index.preventDefault();
                    if($('.calendar').css('display') != "none"){
                        //第一次点击
                        if (flag == 0) {
                            $(me.sections).find('.hover').remove();
                            $(me.sections).find('.tbody').find('p').remove('.rz');
                            $(me.sections).find('.tbody').find('br').remove();
                            $(arry1).css({
                                'background': '#fff',
                                'color': '#333333'
                            });
                            $(this).append('<p class="rz">入住</p>');
                            first = $(arry1).index($(this));
                            me._checkColor(me.comeColor, me.outColor)
                            flag = 1;
                            //显示提示：选择离店日期
                            $(me.sections).find('.rz').each(function(index, element) {
                                if ($(this).text() == '入住') {
                                    $(this).parent('td').append('<span class="hover ruzhu_hover">选择离店日期</span>');
                                    $(this).parent('td').css('position', 'relative');
                                }
                            });
                            $('.hover').css({
                                'position': 'absolute',
                                'left': '-17px',
                                'top': '0px'
                            })
                            $('.ruzhu_hover').css({
                                'width':'100%',
                                'height':'41px',
                                'left': '0px',
                                'top': '-45px',
                                'background':'#434949',
                                'color':'#fff',
                                'z-index':'2'
                            })
                        } else if (flag == 1) { //第二次点击
                            $(me.sections).find('.rz').each(function(index, element) {
                                if ($(this).text() == '入住') {
                                    $(this).parent('td').find('.ruzhu_hover').remove();
                                    $(this).parent('td').css('position', 'relative');
                                }
                            });
                            flag = 0;
                            second = $(arry1).index($(this))
                            //如果第一次点击比第二次大，则不显示
                            if(first >= second){
                                $(me.sections).find('.hover').remove();
                                $(me.sections).find('.tbody').find('p').remove('.rz');
                                $(me.sections).find('.tbody').find('br').remove();
                                $(arry1).css({
                                    'background': '#fff',
                                    'color': '#333333'
                                });
                                $(this).append('<p class="rz">入住</p>')
                                first = $(arry1).index($(this));
                                me._checkColor(me.comeColor, me.outColor)
                                flag = 1;
                                //显示提示：选择离店日期
                                $(me.sections).find('.rz').each(function(index, element) {
                                    if ($(this).text() == '入住') {
                                        $(this).parent('td').append('<span class="hover ruzhu_hover">选择离店日期</span>');
                                        $(this).parent('td').css('position', 'relative');
                                    }
                                });
                                $('.hover').css({
                                    'position': 'absolute',
                                    'left': '-17px',
                                    'top': '0px'
                                })
                                $('.ruzhu_hover').css({
                                    'width':'100%',
                                    'height':'41px',
                                    'left': '0px',
                                    'top': '-45px',
                                    'background':'#434949',
                                    'color':'#fff',
                                    'z-index':'2'
                                });
                                return;
                            }
                            sum = Math.abs(second - first);
                            if (sum == 0) {
                                sum = 1;
                            }
                            
                            if (first < second) {
                                $(this).append('<p class="rz">离店</p>')
                                first = first + 1;
                                for (first; first < second; first++) {
                                    $(arry1[first]).css({
                                        'background': me.comeoutColor,
                                        'color': '#333333'
                                    });
                                }
                            } else if (first == second) {

                                /*$(me.sections).find('.rz').text('入住');
                                $(this).append('<p class="rz">离店</p>');
                                $(this).find('.rz').css('font-size', '12px');
                                var e = $(this).text().replace(/[^0-9]/ig, "");
                                var c, d;
                                var a = new Array();
                                var b = new Array();
                                var f;
                                var same = $(this).parents('table').prev('p').text().replace(/[^0-9]/ig, "").split('');
                                for (var i = 0; i < 4; i++) {
                                    a.push(same[i]);

                                }
                                c = a.join('');
                                for (var j = 4; j < 6; j++) {
                                    b.push(same[j]);
                                }
                                d = b.join('');

                                f = c + '-' + d + '-' + e;
                                $("#startDate").val(f);*/

                            } else if (first > second) {

                                $(me.sections).find('.rz').text('离店');
                                $(this).append('<p class="rz">入住</p>')
                                second = second + 1;
                                for (second; second < first; second++) {
                                    $(arry1[second]).css({
                                        'background': me.comeoutColor,
                                        'color': '#333333'
                                    });
                                }
                            }
                            $(me.sections).find('.rz').each(function(index, element) {
                                if ($(this).text() == '离店') {
                                    $(this).parent('td').append('<span class="hover lidian_hover">共' + sum + '晚</span>');
                                    $(this).parent('td').css('position', 'relative');
                                }
                            });

                            $('.hover').css({
                                'position': 'absolute',
                                'left': '-17px',
                                'top': '0px'
                            })
                            $('.ruzhu_hover').css({
                                'width':'200%',
                                'left': '0px',
                                'top': '-24px',
                                'background':'#434949',
                                'color':'#fff',
                                'z-index':'2'
                            })
                            $('.lidian_hover').css({
                                'width':'100%',
                                'left': '0px',
                                'top': '-24px',
                                'background':'#434949',
                                'color':'#fff'
                            })
                            me._slider('firstSelect')    
                            var myweek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

                            var st = new Date($('#startDate').val());
                            var en = new Date($('#endDate').val());
                            $('.week').text(myweek[st.getDay()])
                            $('.week1').text(myweek[en.getDay()])
                            me._checkColor(me.comeColor, me.outColor)
                        }
                        //第二次点击结束
                    }
                })
            }

        }
        return calendarSwitch;
    })();
    $.fn.calendarSwitch = function(options) {
        return this.each(function() {
            var me = $(this),
                instance = me.data("calendarSwitch");

            if (!instance) {
                me.data("calendarSwitch", (instance = new calendarSwitch(me, options)));
            }

            if ($.type(options) === "string") return instance[options]();
        });
    };
    $.fn.calendarSwitch.defaults = {
        selectors: {
            sections: "#calendar"
        },
        index: 4,
        //展示的月份个数
        animateFunction: "toggle",
        //动画效果
        controlDay: false,
        //知否控制在daysnumber天之内，这个数值的设置前提是总显示天数大于90天
        daysnumber: "30",
        //控制天数
        comeColor: "blue",
        //入住颜色
        outColor: "red",
        //离店颜色
        comeoutColor: "#0cf",
        //入住和离店之间的颜色
        callback: "",
        //回调函数
        comfireBtn: '.comfire' //确定按钮的class或者id

    };
})(jQuery);