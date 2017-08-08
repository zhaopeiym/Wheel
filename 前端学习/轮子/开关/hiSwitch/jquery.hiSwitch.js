//create by benny 20170808 开关插件
;
(function ($, window) {

    $('.hiSwitch').click(function () {
        var data = $(this).data('key');
        if (data === true) //执行关闭操作
        {
            $(this).data('key', false).attr('title', '已关闭');
            $(this).children('span').html('开启').removeClass("switchClose").addClass("switchOpen");
        }
        else {
            $(this).data('key', true).attr('title', '已开启');
            $(this).children('span').html('关闭').removeClass("switchOpen").addClass("switchClose");
        }
        //触发自定义事件
        $(this).trigger("hiSwitchChanged");
    })

    $.fn.extend({
        //初始化（如果有setSwitch设置值，就不需要初始化了）
        initHiSetSwitch: function () {            
            $(this).each(function (i, e) {
                $(e).setHiSwitch($(e).data("key"));
            });
        },
        //设置 开关值
        setHiSwitch: function (state) {
            $(this).data("key", !state);
            $(this).click();
        },
        //获取 开关值
        getHiSwitch: function (state) {
            return $(this).data("key");            
        }
    });
})(jQuery, window);