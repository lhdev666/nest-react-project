import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ICourse, delCourse } from "../../api/course";
import { useRequest } from "ahooks";
import { useState } from "react";

export default function CurseTable(props: {
  data: ICourse[];
  loading: boolean;
  reloadData: () => void;
  openModal: (value: ICourse) => void;
}) {
  const [curLoading, setCurloading] = useState(0);

  // 课程删除接口
  const { run, loading } = useRequest((id) => delCourse(id), {
    manual: true,
    onSuccess: () => {
      // 重新请求课程获取接口，更新课程列表
      props.reloadData();
    },
  });

  // 删除按钮
  function handleRemove(index: number, id: number) {
    setCurloading(index);
    run(id);
  }

  // 表格表头数组内容
  const columns: ColumnsType<ICourse> = [
    {
      key: "id",
      dataIndex: "id",
      title: "id",
    },
    {
      key: "title",
      dataIndex: "title",
      title: "标题",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "价格",
    },
    {
      key: "point",
      dataIndex: "point",
      title: "评分",
    },
    {
      key: "category",
      dataIndex: "category",
      title: "分类",
    },
    {
      key: "course_img",
      dataIndex: "course_img",
      title: "缩略图",
      render: (value: string) => {
        return <img src={value} className="w-52 h-28" />;
      },
    },
    {
      key: "action",
      dataIndex: "action",
      title: "操作",
      render: (_, record, index) => {
        return (
          <Space>
            <Button type="primary" onClick={() => props.openModal(record)}>
              编辑
            </Button>
            <Popconfirm
              title="确认删除吗？这个操作不可逆！"
              onConfirm={() => handleRemove(index, record.id)}
            >
              <Button
                danger
                type="primary"
                loading={index === curLoading && loading}
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.data ?? []}
      loading={props.loading}
      pagination={{
        pageSize: 4,
      }}
    />
  );
}
