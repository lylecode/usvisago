"use server";

import { cookies } from "next/headers";

// 类型定义
interface CookieOptions {
  secure?: boolean;
  httpOnly?: boolean;
  path?: string;
  expires?: Date;
  maxAge?: number;
}

/**
 * 设置一个 cookie
 * @param name cookie 的名称
 * @param value cookie 的值
 * @param options 可选的 cookie 属性
 */
export async function setCookieAction(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  const cookieStore = await cookies();
  const defaultOptions: CookieOptions = {
    secure: true,
    httpOnly: true,
    path: "/",
    ...options, // 允许覆盖默认值
  };

  try {
    cookieStore.set(name, value, defaultOptions);
  } catch (error) {
    console.error(`Failed to set cookie "${name}":`, error);
    throw new Error(`Unable to set cookie "${name}"`);
  }
}

/**
 * 获取指定名称的 cookie 值
 * @param name cookie 的名称
 * @returns cookie 值（若不存在则返回 undefined）
 */
export async function getCookieAction(
  name: string
): Promise<string | undefined> {
  const cookieStore = await cookies();
  try {
    const cookie = cookieStore.get(name);
    return cookie?.value; // 返回值或 undefined
  } catch (error) {
    console.error(`Failed to get cookie "${name}":`, error);
    throw new Error(`Unable to get cookie "${name}"`);
  }
}
export async function deleteCookieAction(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
