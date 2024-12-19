"use client"

import Header from "@/components/header";
import Wallpaper from "@/components/wallpaper";
import Input from "@/components/input";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Wallpaper as WallpaperType } from "@/types/wallpaper";
import { useState, useEffect } from "react";

export default function Home() {
  const [wallpapers, setWallpapers] = useState<WallpaperType[]>([]);

  const fetchWallpapers = async function () {
    const result = await fetch("/api/get-wallpaper");
    const { data } = await result.json();
    
    if (data) {
      setWallpapers(data);
    }
  };

  useEffect(() => {
    fetchWallpapers();
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
