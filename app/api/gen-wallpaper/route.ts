import { getOpenAIClient } from '@/service/openai';
import { downloadAndUploadImage } from '@/lib/s3';
import { ImageGenerateParams } from 'openai/resources/images';
import { Wallpaper } from '@/types/wallpaper';
import { insertWallpaper } from '@/models/wallpaper';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: Request) {
    const { description } = await request.json();

    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
        return Response.json({
          code: -2,
          message: "user not login",
        })
    }
    
    const user_email = user.emailAddresses[0].emailAddress;
    
    console.log("description", description);

    const client = getOpenAIClient();

    const img_size = "1792x1024";
    const llm_name = "dall-e-3";
    const llm_params: ImageGenerateParams = {
        prompt: `generate a desktop wallpaper about: ${description}`,
        model: llm_name,
        n: 1,
        response_format: "url",
        size: img_size,
    };
    const response = await client.images.generate(llm_params);

    console.log('gen wallpaper success', response);
        
    const rawImageUrl = response.data[0].url;
    if(!rawImageUrl) {
        return Response.json({ 
            code: 1,
            msg: "生成图片失败",
        });
    }

    const img_name = encodeURIComponent(description);
    const s3_img = await downloadAndUploadImage(
        rawImageUrl, 
        process.env.AWS_BUCKET || "aiwallpapers",
        `wallpapers/${img_name}.png`
    );
    const img_url = s3_img.Location;

    console.log('gen wallpaper success', img_url);

    const wallpaper: Wallpaper = {
        user_email: user_email,
        img_description: description,
        img_size: img_size,
        img_url: img_url,
        llm_name: llm_name,
        llm_params: JSON.stringify(llm_params),
        created_at: new Date().toISOString(),
    };
    await insertWallpaper(wallpaper);

    return Response.json({
        code: 0,
        msg: "success",
        data: wallpaper
    });
} 