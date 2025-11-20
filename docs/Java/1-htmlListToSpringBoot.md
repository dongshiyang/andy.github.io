---
description: 前端传递一个 List（数组）类型的数据 给后端(Spring Boot)
title: 前端List给后端(Spring Boot)
readingTime: false
tag:
 - Java
recommend: 3
---

# 前端List传值给后端(Spring Boot)
在前后端交互中，前端传递一个 List（数组）类型的数据给后端（Spring Boot） 是一个常见的需求。
以下是详细的技术实现方案，涵盖 JSON格式传输、表单提交、查询参数 等多种方式。

### 前端方案：JSON 格式通过 POST 请求发送
1. 前端（Vue/Angular/React 等）
使用 Axios 或 Fetch API 发送 JSON 格式的 POST 请求。

代码如下:
```html
 function download() {

        // 导出名称(随机数)
        const exportName = Math.floor((Math.random() * 1000000000) + 1);

        table.set();
        // 假设需要传递一个字符串数组
        const codeList = [];
        // 列表名称
        const list = $("#bootstrap-table").bootstrapTable('getAllSelections');

        // 判断是否选择一条信息
        if (list.length < 1) {
            $.modal.alertWarning("请至少选择一条订单信息!!!");
        } else {
            // 循环 添加到List中
            for (let i = 0; i < list.length; i++) {
                codeList.push(list[i].rkdCode);
            }
            // 输出最终数组
            console.log(codeList);
        }

        // 定义 请求
        var req = new XMLHttpRequest();
        // 请求方式和地址
        req.open("POST", prefix + "/export", true);
        req.responseType = "blob";
        // 重中之重 要按照此格式来
        req.setRequestHeader("Content-Type", "application/json");
        $.modal.loading("正在处理中，请稍后...");
        req.onload = function (event) {
            var blob = req.response;
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            // 下载的文件名称
            link.download = "RK-" + exportName +".xlsx";
            link.click();
            // 关闭加载
            $.modal.closeLoading();
        };
        // 发送请求 JSON序列化
        req.send(JSON.stringify(codeList));
    };
```

### 后端（Spring Boot）示例代码（接收 JSON 数组）：



```java
@PostMapping("/export")
@ResponseBody
public void export(@RequestBody List<String> codeList, 
        HttpServletResponse response) throws Exception {
    // 打印接收到的 数组
    System.out.println(rkdCodeList);
    // 循环数组
    for (String s : rkdCodeList) {
        String code = s.trim();
        // 打印显示
        System.out.println("code: " + code);
    }
}
```


### 注意事项：
1. @RequestBody 注解用于绑定请求体中的 JSON 数据。
2. DataWrapper 类需要与前端发送的 JSON 结构一致（字段名相同）。
3. Spring Boot 默认使用 Jackson 库进行 JSON 反序列化，无需额外配置。

## 📌 总结

| 问题 | 解决方案 |
|------|----------|
| 后端参数未找到 | 使用 `@RequestBody` 接收 JSON 数据 |
| 参数名不匹配 | 前端发送数据格式要与后端期望一致 |
| 请求头未设置 | 确保 `Content-Type: application/json` |
| 数据结构错误 | 发送 `{ "dataList": [...] }` 或 `[...]`，根据后端定义 |

---

## ✅ 最终建议

- **优先使用 `@RequestBody` 接收 JSON 数据**，适用于复杂数据结构。
- **前端发送数据格式要与后端参数一致**，避免字段名、结构不匹配。
- **调试工具**：使用 Postman 或浏览器开发者工具（Network）查看实际发送的请求内容和响应。
