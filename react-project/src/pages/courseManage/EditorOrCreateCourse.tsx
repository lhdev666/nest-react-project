/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input, Modal, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import {
  CourseWithoutId,
  ICourse,
  createCourse,
  updateCourse,
} from "../../api/course";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useRequest } from "ahooks";

export default function ditorOrCreateCourse(props: {
  isOpen: boolean;
  reloadData: () => void;
  closeModal: () => void;
  defaultValues?: ICourse;
}) {
  const [form] = useForm();

  useEffect(() => {
    // 控制弹窗显示与否的变量
    if (!props.isOpen) return;
    if (!props.defaultValues) {
      // 如果父组件没有传课程数据，将输入框置空，此时为创建组件
      form.resetFields();
    } else {
      // 如果父组件有传课程数据，将数据塞入输入框，此时为修改组件
      form.setFieldsValue(props.defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen, props.defaultValues]);

  // 课程创建接口
  const { run: execCreateCourse } = useRequest((value) => createCourse(value), {
    manual: true,
    onSuccess: () => {
      props.reloadData();
    },
    onFinally: () => {
      props.closeModal();
    },
  });

  // 课程修改接口
  const { run: execUpdateCourse } = useRequest((value) => updateCourse(value), {
    manual: true,
    onSuccess: () => {
      props.reloadData();
    },
    onFinally: () => {
      props.closeModal();
    },
  });

  // 弹窗确认按钮
  function handleOk() {
    // 走课程修改逻辑
    if (props.defaultValues) {
      execUpdateCourse({
        ...form.getFieldsValue(),
        id: props.defaultValues.id,
      });
    } else {
      // 课程创建逻辑
      for (const item of Object.entries(form.getFieldsValue())) {
        if (!item[1]) {
          message.warning("请填写完整表单");
          return;
        }
      }
      execCreateCourse(form.getFieldsValue());
    }
  }

  return (
    <Modal open={props.isOpen} onCancel={props.closeModal} onOk={handleOk}>
      <div className="p-10">
        <Form layout="vertical" form={form}>
          <FormItem<CourseWithoutId> label="标题" name="title">
            <Input />
          </FormItem>
          <FormItem<CourseWithoutId> label="价格" name="price">
            <Input />
          </FormItem>
          <FormItem<CourseWithoutId> label="评分" name="point">
            <Input />
          </FormItem>
          <FormItem<CourseWithoutId> label="分类" name="category">
            <Input />
          </FormItem>
          <FormItem<CourseWithoutId> label="缩略图" name="course_img">
            <Input />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
}
