import { getWallpapers } from "@/models/wallpaper";

export async function GET() {
  const wallpapers = await getWallpapers(1, 50, "desc");
  return Response.json({
    code: 0,
    msg: "success",
    data: wallpapers
  });
}
