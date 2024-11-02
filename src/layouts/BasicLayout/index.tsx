"use client";

import {GithubFilled, LogoutOutlined, SearchOutlined, UserOutlined,} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";

import {Dropdown, Input, message} from "antd";
import React from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import {menus} from "../../../config/menu";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";

import {DEFAULT_USER} from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";


interface Props {
  children: React.ReactNode;
}

/**
 * 通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
  // 当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
    const router = useRouter();
    /**
     * 用户注销
     */
    const userLogout = async () => {
        try {
            await userLogoutUsingPost();
            message.success("已退出登录");
            dispatch(setLoginUser(DEFAULT_USER));
            // router.push("/user/login");
            router.push("/user/login");
        } catch (e) {
            message.error("操作失败，" + e.message);
        }
        return;
    }

    return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        layout="top"
        title="牢大八股"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="牢大八股-zq"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "zq",
          render: (props, dom) => {
            return (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "userCenter",
                                icon: <UserOutlined />,
                                label: "个人中心",
                            },
                            {
                                key: "logout",
                                icon: <LogoutOutlined />,
                                label: "退出登录",
                            },
                        ],
                        onClick: async (event: { key: React.Key }) => {
                            const { key } = event;
                            if (key === "logout") {
                                userLogout();
                            } else if (key === "userCenter") {
                                router.push("/user/center");
                            }
                        },
                    }}
                >
                    {dom}
                </Dropdown>


            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              href="https://github.com/97ZQ/zqbagu"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        // 渲染底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义菜单
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        // 定义菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}