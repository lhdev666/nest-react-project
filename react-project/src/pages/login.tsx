import { useRequest } from "ahooks";
import { Form, Input, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../api/user";

interface FieldType {
  username: string;
  password: string;
}

export default function LoginPage() {
  const nav = useNavigate();

  // 登录接口请求
  const { run, loading } = useRequest((data: FieldType) => login(data), {
    manual: true,
    onSuccess: ({ data }) => {
      // 设置缓存
      localStorage.setItem("token", JSON.stringify(data));
      // 跳转课程管理页面
      nav("/courseManage");
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#f1f2f4]">
      <div className="w-[350px] h-[320px] shadow-md p-5 bg-white rounded-xl">
        <h1 className="text-center text-3xl">Nestjs前端登录</h1>
        <div className="h-full">
          <Form autoComplete="off" layout="vertical" onFinish={run}>
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入你的用户名" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入你的密码" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <div className="w-full text-center">
            <NavLink to="/register">前往注册</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
