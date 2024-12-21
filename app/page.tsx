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

  const fetchWallpapers = async function (page: number) {
    try {
      const uri = "/api/get-wallpaper";
      const params = {
        page: page,
        limit: 50,
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
          setWallpapers(res.data);
          return;
        }
      }

      toast.error("get wallpapers failed");
    } catch (e) {
      console.log("get wallpapers failed: ", e);
      toast.error("get wallpapers failed");
    }
  };

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  return (
    <div className="w-screen h-screen">
      <Header />
      <Hero />
      <Input setWallpapers={setWallpapers} />
      <Wallpaper wallpapers={wallpapers} />
      <Footer />
    </div>
  );
}
