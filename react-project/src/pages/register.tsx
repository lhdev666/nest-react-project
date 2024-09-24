import { Form, Input, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { register } from "../api/user";

interface FieldType {
  username: string;
  password: string;
}

export default function RegisterPage() {
  const nav = useNavigate();
  // 注册接口请求
  const { run, loading } = useRequest((data: FieldType) => register(data), {
    manual: true,
    onSuccess: ({ data }) => {
      // 设置缓存
      localStorage.setItem("token", data);
      nav("/courseManage");
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#f1f2f4]">
      <div className="w-[350px] h-[320px] shadow-md p-5 bg-white rounded-xl">
        <h1 className="text-center text-3xl">Nestjs前端注册</h1>
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
                注册
              </Button>
            </Form.Item>
          </Form>

          <div className="w-full text-center">
            <NavLink to="/login">前往登录</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
