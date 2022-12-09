$(function () {
  let form = layui.form;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        console.log(value);
        return "新旧密码不能相同！";
      }
    },
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        console.log(value);
        return "两次密码不一致";
      }
    },
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        res = {
          status: 0,
          message: "更新密码成功！",
        };
        if (res.status !== 0) {
          return layui.layer.msg("更新密码失败！");
        }
        layui.layer.msg("更新密码成功！");
        // 重置表单
        $(".layui-form")[0].reset();
      },
    });
  });
});
