"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import type { Wallpaper } from "@/types/wallpaper";
import Image from 'next/image';

interface Props {
  wallpapers: Wallpaper[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function Wallpaper({ wallpapers, loading, hasMore, onLoadMore }: Props) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10">
      <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mb-16 md:grid-cols-3 md:gap-4">
        {wallpapers?.map((wallpaper: Wallpaper) => (
          <div
            key={`wallpaper-card-${wallpaper.id}`}
            className="mx-auto w-full max-w-md gap-4 rounded-md bg-[#f2f2f7] p-8 text-black sm:px-4 sm:py-8"
          >
            <div className="mb-3 flex w-full items-center justify-between">
              <div className="flex items-center">
                <Image
                  key={`avatar-${wallpaper.id}`}
                  src={wallpaper.created_user?.avatar_url || '/default-avatar.png'}
                  alt={`${wallpaper.created_user?.nickname} 的头像`}
                  width={32}
                  height={32}
                  className="mr-4 inline-block h-8 w-8 rounded-full"
                />
                <h6 className="text-base font-bold">
                  {wallpaper.img_description}
                </h6>
              </div>
              <a
                key={`size-${wallpaper.id}`}
                href="#"
                className="inline-block max-w-full text-black"
              >
                <span>{wallpaper.img_size}</span>
              </a>
            </div>
            <Image 
              key={`wallpaper-img-${wallpaper.id}`}
              src={wallpaper.img_url}
              alt={''}
              width={1792}
              height={1024}
              priority={true}
              className="inline-block h-60 w-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="w-full flex justify-center">
          <Button 
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? '加载中...' : '查看更多'}
          </Button>
        </div>
      )}
    </section>
  );
}