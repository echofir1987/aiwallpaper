"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { Wallpaper } from "@/types/wallpaper";
import { useUser } from "@clerk/nextjs";

interface Props {
    setWallpapers: Dispatch<SetStateAction<Wallpaper[]>>;
}

export default function ({ setWallpapers }: Props) {
    const { user } = useUser();
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    // const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

    const generateWallpaper = async function () {
        const params = {
            description: description
        };

        setLoading(true);
        const result = await fetch("/api/gen-wallpaper", {
            method: "POST",
            body: JSON.stringify(params)
        });
        const data = await result.json();
        setLoading(false);

        if (data) {
            console.log("new wallpaper", data);
            const wallpaperWithUser = {
                ...data.data,
                user_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",  // 使用默认头像
                user_nickname: "AI创作者"  // 使用默认昵称
            };
            setWallpapers((wallpapers: Wallpaper[]) => [wallpaperWithUser, ...wallpapers]);
        }
    }

    const handleGenerateWallpaper = async function () {
        console.log("handleGenerateWallpaper", description);
        if (!description) {
            alert("请输入壁纸的主题")
            return;
        }
        if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
            alert("请登录后生成壁纸")
            return;
        }
        await generateWallpaper()
    };

    return (
        <div className="flex justify-center w-full mt-10">
            <div className="flex justify-center items-center max-w-3xl w-full px-10">
                <div className="flex w-full max-w-3xl gap-2.5">
                    <Input 
                        type="text" 
                        placeholder="请输入壁纸的主题" 
                        className="flex-1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                    />
                    <Button onClick={handleGenerateWallpaper} disabled={loading}>{ loading ? "生成中..." : "生成壁纸"}</Button>
                </div>
            </div>
        </div>
    )
}