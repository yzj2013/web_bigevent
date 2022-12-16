$(function () {
  let layer = layui.layer;
  let form = layui.form;
  var laypage = layui.laypage;

  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);

    let y = dt.getFullYear();
    let m = padZone(dt.getMonth() + 1);
    let d = padZone(dt.getDate());

    let hh = padZone(dt.getHours());
    let mm = padZone(dt.getMinutes());
    let ss = padZone(dt.getSeconds());

    return y + "-" + m + "-" + d + "" + hh + ":" + mm + ":" + ss;
  };

  //   定义补零的函数
  function padZone(n) {
    return n > 9 ? n : "0" + n;
  }

  // 定义一个查询的参数对象，将来请求数据的时候
  // 需要将请求参数对象提交到服务器
  let q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: "", // 文章分类的Id
    state: "", //文章的发布状态
  };

  initTable();
  initCate();

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        res = {
          status: 0,
          message: "获取文章列表成功！",
          data: [
            {
              Id: 1,
              title: "abab",
              pub_date: "2020-01-03 12:19:57.690",
              state: "已发布",
              cate_name: "最新",
            },
            {
              Id: 2,
              title: "666",
              pub_date: "2020-01-03 12:20:19.817",
              state: "已发布",
              cate_name: "股市",
            },
            // {
            //   Id: 3,
            //   title: "222",
            //   pub_date: "2020-01-03 12:20:19.817",
            //   state: "草稿",
            //   cate_name: "科技",
            // },
            // {
            //   Id: 4,
            //   title: "88",
            //   pub_date: "2020-01-03 12:20:19.817",
            //   state: "草稿",
            //   cate_name: "历史",
            // },
            // {
            //   Id: 5,
            //   title: "ccc",
            //   pub_date: "2020-01-03 12:19:57.690",
            //   state: "已发布",
            //   cate_name: "情感",
            // },
            // {
            //   Id: 6,
            //   title: "66",
            //   pub_date: "2020-01-03 12:20:19.817",
            //   state: "已发布",
            //   cate_name: "股市",
            // },
            // {
            //   Id: 7,
            //   title: "777",
            //   pub_date: "2020-01-03 12:20:19.817",
            //   state: "已发布",
            //   cate_name: "股市",
            // },
          ],
          total: 7,
        };
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败");
        }
        // 使用模板引擎渲染页面的数据
        let htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);

        // 调用渲染分页的方法
        renderPage(res.total);
      },
    });
  }

  //   初始化文章分类的方法

  function initCate() {
    $.ajax({
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
        if (res.status !== 0) {
          return layer.msg("获取文章分类列表失败！");
        }
        // 调用模板引擎渲染分类的可选项
        let htmlStr = template("tpl-cate", res);

        $("[name=cate_id]").html(htmlStr);
        // 通知 layui 重新渲染表单区域的UI结构
        form.render();
      },
    });
  }

  //   为筛选表单绑定 sumbit 事件
  $("#form-search").on("sumbit", function (e) {
    e.preventDefault();
    // 获取表单中选中项的值
    let cate_id = $("[name=cate_id]").val;
    let state = $("[name=state]").val();

    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = cate_id;
    q.state = state;

    // 根据最新的筛选条件，重新渲染表格的数据
    initTable();
  });

  //   定义渲染分页的方法
  function renderPage(total) {
    // 调用 laypage.render()方法来渲染分页的结构
    laypage.render({
      elem: "pageBox", // 分页容器的Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, //设置默认被选中的分页
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 4, 5, 10],
      // 分页发生切换的时候， 触发 jump 回调
      // 触发jump回调的方式有两种
      // 1. 点击页码的时候，会触发jump 回调
      // 2. 只要调用了leypage.render()方法， 就会触发 jump 回调
      jump: function (obj, first) {
        // 可以通过first的值，来判断是通过哪种方式，触发的 jump 回调
        // 如果 first 的值为 true ，证明是方式2触发的
        // 否则就是方式1触发的
        console.log(first);
        console.log(obj.curr);
        // 把最新的页码值赋值到q这个查询参数对象中
        q.pagenum = obj.curr;

        // 把最新的条目数，赋值到q这个查询参数的对象的pagesize属性中
        q.pagesize = obj.limit;
        // 根据最新的q获取对应的数据列表，并渲染表格

        if (!first) {
          initTable();
        }
      },
    });
  }

  // 通过代理的形式，为删除按钮绑定点击事件处理函数
  $("tbody").on("click", ".btn-delete", function () {
    // 获取删除按钮的个数
    let len = $(".btn-delete").length;
    console.log(len);

    // 获取到文章的 id
    let id = $(this).attr("data-id");
    // 询问用户是否药删除数据
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/delete/" + id,
        success: function (res) {
          res = {
            stutas: 0,
            message: "删除成功！",
          };
          if (res.stutas !== 0) {
            return layer.msg("删除失败！");
          }
          layer.msg("删除成功！");
          // 当数据删除完成后， 需要判断当前这一页，是否还有剩余的数据
          // 如果没有剩余的数据了，则让页面值 -1 之后，
          // 再重新调用 initTable方法
          // 4

          if (len === 1) {
            // 如果 len 的值等于 1， 证明删除完毕之后，页面上就没有任何数据了
            // 页码值最小必须是 1
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }

          initTable();
        },
      });

      layer.close(index);
    });
  });
});
