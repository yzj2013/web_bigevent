$(function () {
  // 调用getUserInfo获取用户基本信息
  getUserInfo();

  let layer = layui.layer;

  // 点击按钮，实现退出功能
  $("#btnLogout").on("click", function () {
    //   console.log("ok");
    // 提示用户是否确定退出
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // console.log("ok");
        // 1. 清空本地存储的 token
        localStorage.removeItem("token");
        // 2. 重新跳转到登录页面
        location.href = "/login.html";

        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers就是请求头配置对象
    // Headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      res = {
        status: 0,
        message: "获取用户基本信息成功",
        data: {
          id: 17,
          username: "bb",
          nickname: "abab",
          email: "abab@gmail.com",
          user_pic: null,
        },
      };
      //   console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      //   调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data);
    },

    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //   res = {
    //     responseJSON: {
    //       status: 0,
    //       message: "身份认证成功！",
    //     },
    //   };
    //   //   console.log("执行了 complete回调函数：");
    //   console.log(res);
    //   //   在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据

    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     //   1. 强制清空token
    //     localStorage.removeItem("token");
    //     //   2. 强制跳转到登录页面
    //     location.href = "/login.html";
    //   }
    // },
  });
}

function renderAvatar(user) {
  // 1. 获取用户的名称
  let name = user.nickname || user.username;
  // 2. 设置欢迎的文本
  $("#welcome").html("Welcome&nbsp;&nbsp;" + name);
  //   3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 3.2 渲染文本头像
    $(".layui-nav-img").hide();
    let first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
