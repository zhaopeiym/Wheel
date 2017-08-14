/*
 * Name:jquery.dataTools (jQuery plugin)
 * Version: 0.1
 * Released: 2017-07-14
 * Coder: benny
*/
; (function ($, window, document, undefined) {

    $.fn.extend({
        //自动填充数据
        //在插件中使用 $("ele").autoFillData("data-set",sData);
        autoFillData: function (tag, sData) {
            //数据格式化（如果有特殊约定格式，则转特定的值）
            var formatValue = function (obj, value) {
                var format = obj.attr("data-format");
                if (format && $.trim(format) != "") {
                    switch (format) {
                        case "enum":
                            return eval(obj.attr("data-format-data") + "[" + value + "]");
                        case "date":
                            return moment(value).format("YYYY-MM-DD HH:mm:ss");
                        case "sex":
                            return value == "0" ? "女" : "男";                      
                        case "money":
                            return parseFloat(value || 0).toFixed(2);                      
                    }
                }
                //自定义时间格式
                var dateFormat = obj.attr("data-date-format");
                if (dateFormat && $.trim(dateFormat) != "") {
                    return moment(value).format(dateFormat);
                }
                return value;
            }

            this.find("[" + tag + "]").each(function (m, n) {
                try {
                    var data = sData;
                    var type = n.tagName.toLowerCase();
                    var obj = $(n);
                    var objvalue = "data." + obj.attr(tag);
                    var tempvalue = eval(objvalue);
                    tempvalue = formatValue(obj, tempvalue);
                    switch (type) {
                        case "span":
                        case "div":
                        case "textarea":
                            obj.html(tempvalue);
                            break;
                        case "ul":
                            if (!tempvalue || !tempvalue.length) {
                                obj.html("暂无");
                            }
                            else if ($.isArray(tempvalue)) {
                                $.each(tempvalue, function (i, v) {
                                    obj.append("<li>" + v + "</li>");
                                });
                            }
                            break;
                        case "input":
                            var inputtype = obj.prop("type");
                            switch (inputtype) {
                                case "hidden":
                                case "text":
                                    obj.val(tempvalue);
                                    break;
                                case "radio":
                                    if (obj.val() == tempvalue) {
                                        obj.prop("checked", true);
                                    }
                                    break;
                                case "checkbox":
                                    var value = tempvalue;
                                    if (value) {
                                        $.each(value, function (j, k) {
                                            if (obj.val() == value[j]) {
                                                obj.prop("checked", true);
                                            }
                                        })
                                    }
                                    break;

                            }
                            break;
                        case "select":
                            obj.val(tempvalue);
                            break;
                        case "img":
                            obj.prop("src", tempvalue);
                            break;
                        default://若有处理在细分
                            obj.html(tempvalue);
                            break;
                    }
                }
                catch (e) { alert(e); }
            });
        },
        //清空填充
        autoFillEmpty: function (tag) {
            this.find("[" + tag + "]").each(function (m, n) {
                var type = n.tagName.toLowerCase(); 
                var obj = $(n); 
                switch (type) {
                    case "span":
                    case "div":
                    case "textarea":
                    case "ul":
                        obj.html("");
                        break;
                    case "input":
                        var inputtype = obj.prop("type").toLowerCase();
                        switch (inputtype) {
                            case "hidden":
                            case "text":
                                obj.val("");
                                break;
                            case "radio":
                            case "checkbox":
                                obj.prop("checked", false);
                                break;
                        }
                        break;
                    case "select":
                        obj.val("");
                        break;
                    case "img":
                        obj.prop("src", "");
                        break;
                    default://若有处理在细分                           
                        break;
                }
            });
        },
        //自动序列化数据（数据提交时使用）
        //示例：$("ele").autoSerializeJson("data-get");
        autoSerializeJson: function (tag) {
            var objJson = {};
            $(this).find("[" + tag + "]").each(function (m, n) {
                var obj = $(this);
                var name = obj.attr(tag);
                var type = n.tagName.toLowerCase();
                switch (type) {
                    case "span":
                        {
                            if (obj.hasClass("moreTag")) {
                                if (!objJson[name]) {
                                    objJson[name] = [];
                                }
                                objJson[name].push(obj.data("key") || obj.attr("key"));
                            }
                            else {
                                objJson[name] = obj.data("key") || obj.attr("key");
                                if (!objJson[name]) {//如果没有取到，则去text
                                    objJson[name] = obj.text();
                                }
                            }
                            break;
                        }
                    case "td":
                        objJson[name] = obj.data("key");
                        if (!objJson[name]) {//如果没有取到，则去text
                            objJson[name] = obj.text();
                        }
                        break;
                    case "div":
                    case "textarea":
                        objJson[name] = obj.val();
                        break;                
                    case "input":
                        var inputtype = obj.prop("type").toLowerCase();
                        switch (inputtype) {
                            case "hidden":
                            case "text":
                                objJson[name] = obj.val();
                                break;
                            case "radio":
                                if (obj.prop("checked"))
                                    objJson[name] = obj.val();
                                break;
                            case "checkbox":
                                if (objJson[name] != undefined) {
                                    var cheName = obj.attr("name");
                                    var cheVal = [];
                                    obj.find("[name='" + cheName + "']").each(function () {
                                        if ($(this).attr("checked") == "checked") {
                                            cheVal[cheVal.length] = $(this).val();
                                        }
                                    });
                                    objJson[name] = cheVal;
                                }
                                break;

                        }
                        break;
                    case "select":
                        objJson[name] = obj.find("option:selected").val();
                        break;
                    case "img":
                        objJson[name] = obj.attr("src");
                        break;
                    default://若有处理在细分
                        obj.html(tempvalue);
                        break;
                }
            });
            return objJson;
        }
    });

})(jQuery, window, document);