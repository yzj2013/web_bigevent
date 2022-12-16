$(function () {
  let layer = layui.layer;
  let form = layui.form;

  initArtCateList();

  // 获取文章分类的列表
  function initArtCateList() {
    res = $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        res = {
          status: 0,
          message: "获取文章分类列表成功！",
          data: [
            {
              Id: 1,
              name: "最新",
              alias: "ZuiXin",
              is_delete: 0,
            },
            {
              Id: 2,
              name: "科技",
              alias: "KeJi",
              is_delete: 0,
            },
            {
              Id: 3,
              name: "股市",
              alias: "GuShi",
              is_delete: 0,
            },
            {
              Id: 4,
              name: "历史",
              alias: "LiShi",
              is_delete: 0,
            },
            {
              Id: 5,
              name: "情感",
              alias: "QingGan",
              is_delete: 0,
            },
          ],
        };
        // console.log(res);
        let htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  // 为添加类别按钮绑定点击事件

  let indexAdd = null;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  // 通过代理的形式，为form-add表单绑定 submit事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    // console.log("ok");
    $.ajax({
      method: "POST",
      url: "/my/articlr/addcates",

      success: function (res) {
        res = {
          status: 0,
          message: "新增分类成功",
          data: [
            {
              Id: 6,
              name: "测试",
              alias: "TEST",
              is_delete: 0,
            },
          ],
        };

        // initArtCateList();
        if (res.status !== 0) {
          return layer.msg("新增分类失败");
        }

        layer.msg("新增分类成功");
        // 根据索引关闭对应的弹出层
        layer.close(indexAdd);

        res = {
          status: 0,
          message: "获取文章分类列表成功！",
          data: [
            {
              Id: 1,
              name: "最新",
              alias: "ZuiXin",
              is_delete: 0,
            },
            {
              Id: 2,
              name: "科技",
              alias: "KeJi",
              is_delete: 0,
            },
            {
              Id: 3,
              name: "股市",
              alias: "GuShi",
              is_delete: 0,
            },
            {
              Id: 4,
              name: "历史",
              alias: "LiShi",
              is_delete: 0,
            },
            {
              Id: 5,
              name: "情感",
              alias: "QingGan",
              is_delete: 0,
            },
            {
              Id: 6,
              name: "测试",
              alias: "TEST",
              is_delete: 0,
            },
          ],
        };
        // console.log(res);
        let htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  });

  // 通过代理的形式， 为btn-edit 按钮绑定点击事件

  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });

    let id = $(this).attr("data-id");
    // console.log(id);
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        res = {
          status: 0,
          message: "获取文章分类数据成功！",
          data: {
            Id: 1,
            name: "最新",
            alias: "ZuiXin",
            is_delete: 0,
          },
        };
        console.log(res);
        form.val("form-edit", res.data);
      },
    });
  });

  // 通过代理的形式，为修改分类的表单绑定 submit事件

  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      // data: {

      // }
      success: function (res) {
        res = {
          status: 0,
          message: "获取文章分类数据成功！",
          data: {
            Id: 1,
            name: "最2",
            alias: "erer",
            is_delete: 0,
          },
        };
        if (res.status !== 0) {
          return layer.msg("更新分类数据失败");
        }
        layer.msg("更新分类数据成功");
        layer.close(indexEdit);
      },
    });
  });

  // 通过代理的形式，为删除按钮绑定点击事件
  $("tbody").on("click", ".btn-delete", function () {
    // console.log("ok");
    let id = $(this).attr("data-id");

    // 提示用户是否要删除
    layer.confirm("is not?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            res = {
              status: 0,
              message: "删除分类成功",
            };
            return layer.msg("删除分类失败");
          }
          layer.msg("删除分类成功");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
