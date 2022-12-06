$(function () {
  // click "go to register" link
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // click "go to login" link
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  //  从layui 中获取 form 对象
  let form = layui.form;
  let layer = layui.layer;
  // 通过 form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则reture一个提示消息即可
      let pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });

  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    // 1.阻止默认的提交行为
    e.preventDefault();
    // 2.发起Ajax的POST请求
    let data = {
      username: $("#form_reg   [name=username]").val(),
      password: $("#form_reg[name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      res = {
        status: 0,
        message: "注册成功",
      };
      if (res.status !== 0) {
        // return console.log(res.message);
        return layer.msg(res.message);
      }
      // console.log("注册成功");
      layer.msg("注册成功,请登录");
      // 模拟人的点击行为
      $("#loink_login").click();
    });
  });

  // 监听登录表单的提交事件
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",

      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        res = {
          status: 0,
          message: "登录成功",
        };
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        // 将登录成功得到的token字符串 保存到localstorage中
        localStorage.setItem("token", res.token);
        // console.log(res.token);
        // 跳转到后台主页;
        location.href = "/index.html";
      },
    });
  });
});
