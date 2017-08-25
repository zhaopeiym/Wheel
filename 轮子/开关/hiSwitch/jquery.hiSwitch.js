//create by benny 20170808 开关插件
;
(function ($, window) {

    $('.hiSwitch').click(function () {
        var data = $(this).data('key');
        if (data === true) //执行关闭操作
        {
            $(this).data('key', false).attr('title', '已关闭');
            $(this).children('span').html('已关闭').removeClass("switchClose").addClass("switchOpen");
        }
        else {
            $(this).data('key', true).attr('title', '已开启');
            $(this).children('span').html('已开启').removeClass("switchOpen").addClass("switchClose");
        }
        //触发自定义事件
        $(this).trigger("hiSwitchChanged");
    })

    $.fn.extend({
        //初始化（如果有setSswitch设置值，就不需要初始化了）
        initHiSetSwitch: function () {
            //如果选择的是Switch容器
            if ($(this).find('.hiSwitch').length > 0) {
                $(this).find('.hiSwitch').each(function (i, e) {
                    if ($(e).find("span").length <= 0)
                        $(e).append("<span></span>");
                    $(e).setHiSwitch($(e).data("key"));
                });
            }
            //如果选择的是Switch控件
            else if ($(this).find('.hiSwitch').length <= 0 && $(this).hasClass('hiSwitch')) {
                $(this).each(function (i, e) {
                    if ($(e).hasClass("hiSwitch")) {
                        if ($(e).find("span").length <= 0)
                            $(e).append("<span></span>");
                        $(e).setHiSwitch($(e).data("key"));
                    }
                });
            }
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