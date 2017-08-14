;
(function ($, window) {
    $.fn.extend({
        //创建标签容器
        getTagContainer: function () {
            if (!$(this).find("div.moreTagsContainer").length) {
                $(this).prepend('<div class="moreTagsContainer"></div>');
                //点击事件
                $(this).find("div.moreTagsContainer").on("click", ".operation-Tag", function () {
                    $(this).closest(".block-Tag").remove();
                })
            }
            return $(this).find("div.moreTagsContainer");
        },
        //添加标签
        beforeTag: function (key, value, attr) {
            attr = attr || "";
            var container = $(this).getTagContainer();
            if (container.find("span[data-key='" + key + "']").length || key === "" || key == 0) {
                return;////检测重复选中 或 没意义的key 
            }
            var tagHtml = '<span class="block-Tag">\
                            <span data-key= ' + key + ' class="tag-Info" ' + attr + '>' + value + '</span>\
                            <span class="operation-Tag"></span>\
                           </span>';
            container.append(tagHtml);
        },
        //移除标签点击事件
        removeTagClick: function () {
            $(this).getTagContainer().off("click", ".operation-Tag");
        },
        //移除标签点击事件
        addTagClick: function () {
            //点击事件
            $(this).getTagContainer().on("click", ".operation-Tag", function () {
                $(this).closest(".block-Tag").remove();
            })
        },
        //移除点击按钮
        removeTagBtn: function () {
            $(this).removeTagClick();
            $(this).getTagContainer().find(".operation-Tag").addClass("dispalyNone");
        },
        //添加点击按钮
        addTagBtn: function () {
            $(this).addTagClick();
            $(this).getTagContainer().find(".operation-Tag").removeClass("dispalyNone");
        }
    });
})(jQuery, window);