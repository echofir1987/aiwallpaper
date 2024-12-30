"use client"

import Header from "@/components/header";
import Wallpaper from "@/components/wallpaper";
import Input from "@/components/input";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Wallpaper as WallpaperType } from "@/types/wallpaper";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const [wallpapers, setWallpapers] = useState<WallpaperType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWallpapers = async function (page: number, isLoadMore: boolean = false) {
    try {
      const uri = "/api/get-wallpaper";
      const params = {
        page: page,
        limit: 12,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        console.log("get wallpapers result: ", res);
        if (res.data) {
          if (isLoadMore) {
            setWallpapers(prev => [...prev, ...res.data]);
          } else {
            setWallpapers(res.data);
          }
          setHasMore(res.data.length === params.limit);
          return;
        }
      }

      toast.error("获取壁纸失败");
    } catch (e) {
      console.log("get wallpapers failed: ", e);
      toast.error("获取壁纸失败");
    }
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    await fetchWallpapers(nextPage, true);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  // 监听 wallpapers 的变化来更新分页状态
  useEffect(() => {
    // 如果是通过 Input 组件设置的新壁纸，重置分页状态
    if (wallpapers.length <= 12) {
      setCurrentPage(1);
      setHasMore(wallpapers.length === 12);
    }
  }, [wallpapers]);

  return (
    <div className="w-screen h-screen">
      <Header />
      <Hero />
      <Input setWallpapers={setWallpapers} />
      <Wallpaper 
        wallpapers={wallpapers} 
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
      <Footer />
    </div>
  );
}
