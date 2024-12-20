"use client";

import { Button } from "@/components/ui/button";
import type { Wallpaper } from "@/types/wallpaper";
import Image from 'next/image';

interface Props {
  wallpapers: Wallpaper[];
}

export default function Wallpaper({ wallpapers }: Props) {
  return (
    <div>
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-10">

          <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mb-16 md:grid-cols-3 md:gap-4 ">
            {wallpapers &&
              wallpapers.map((wallpaper: Wallpaper) => {
                return (
                  <div
                    key={wallpaper.id}
                    className="mx-auto w-full max-w-md gap-4 rounded-md bg-[#f2f2f7] p-8 text-black sm:px-4 sm:py-8"
                  >
                    <div className="mb-3 flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={wallpaper.user_avatar || '/default-avatar.png'}
                          alt={`${wallpaper.user_nickname} 的头像`}
                          width={32}
                          height={32}
                          className="mr-4 inline-block h-8 w-8 rounded-full"
                        />
                        <h6 className="text-base font-bold">
                          {wallpaper.user_nickname}
                        </h6>
                      </div>
                      <a
                        href="#"
                        className="inline-block max-w-full text-black"
                      >
                        <span>{wallpaper.img_size}</span>
                      </a>
                    </div>
                    <Image 
                      src={wallpaper.img_url}
                      alt=""
                      width={1792}
                      height={1024}
                      priority={false}
                      loading="lazy"
                      className="inline-block h-60 w-full rounded-md object-cover"
                    />
                  </div>
                );
              })}
          </div>
          <div className="w-full flex justify-center">
            <Button>查看更多</Button>
          </div>
        </div>
      </section>
    </div>
  );
}