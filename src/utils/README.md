
**insertEveryNth**

按钮间隔 中间添加 分割线

```jsx
{insertEveryNth(
    [
        <Button
            key={i.preset}
            size="small"
            type="link"
            onClick={() => del(record)}
            >
            删除
        </Button>
        <Button
            key={i.preset}
            size="small"
            type="link"
            onClick={() => edit(record)}
            >
            编辑
        </Button>
        <Button
            key={i.title}
            size="small"
            type="link"
            onClick={() => i.action(record, history)}
        >
            {i.title}
        </Button>
    ]
    <Divider className="mx-1 me-1" type="vertical" />,
    1,
)}
```