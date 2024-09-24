import { Layout, Button, Dropdown, MenuProps } from "antd";
import CourseTable from "./courseManage/CourseTable";
import { ICourse, getCourse } from "../api/course";
import { useRequest } from "ahooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditorOrCreateCourse from "./courseManage/EditorOrCreateCourse";

const { Header, Content, Footer } = Layout;

type TableWithKey = ICourse & { key: number };
export default function ControlPage() {
  const [model, setModel] = useState(false);
  // 课程表格数据设置
  const [tableData, setTableData] = useState<TableWithKey[]>([]);
  // 编辑和创建课程弹窗信息输入框的默认值
  const [editValue, setEditValue] = useState<ICourse | undefined>();

  // 课程查询接口
  const { run, loading } = useRequest(getCourse, {
    onSuccess: ({ data }) => {
      setTableData(
        data.map((item) => ({
          ...item,
          key: item.id,
        }))
      );
    },
  });

  const nav = useNavigate();

  // 退出登录
  const loginOut = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  // 退出登录按钮
  const items: MenuProps["items"] = [
    {
      label: <span onClick={loginOut}>退出登录</span>,
      key: "1",
    },
  ];

  return (
    <Layout className="w-full h-full">
      {/* 头部组件 */}
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="text-white">课程管理</span>
        <Dropdown menu={{ items }} placement="bottomRight">
          <img
            className="w-[50px] rounded-full"
            src="https://file.xdclass.net/user_file/2022/12/27002521221eec76ed247dbd4b2210d3.jpg"
          />
        </Dropdown>
      </Header>

      {/* 内容组件 */}
      <Content className="flex-1" style={{ padding: "0 50px" }}>
        <Button
          type="primary"
          className="my-2 float-right"
          onClick={() => {
            setModel(true);
            setEditValue(undefined);
          }}
        >
          创建新课程
        </Button>

        {/* 创建和编辑课程弹窗 */}
        <EditorOrCreateCourse
          isOpen={model}
          reloadData={run}
          defaultValues={editValue}
          closeModal={() => setModel(false)}
        />

        {/* 课程表格组件 */}
        <CourseTable
          loading={loading}
          reloadData={run}
          data={tableData}
          openModal={(value) => {
            setModel(true);
            setEditValue(value);
          }}
        />
      </Content>

      {/* 底部组件 */}
      <Footer style={{ textAlign: "center" }}>小滴-nestjs-前端项目</Footer>
    </Layout>
  );
}
