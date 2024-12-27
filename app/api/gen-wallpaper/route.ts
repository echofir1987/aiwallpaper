import { getOpenAIClient } from '@/service/openai';
import { downloadAndUploadImage } from '@/lib/s3';
import { ImageGenerateParams } from 'openai/resources/images';
import { Wallpaper } from '@/types/wallpaper';
import { insertWallpaper } from '@/models/wallpaper';
import { currentUser } from "@clerk/nextjs";
import { User } from "@/types/user";
import { saveUser } from "@/service/user";
import { getUserCredits } from "@/service/order";
export async function POST(request: Request) {
    const { description } = await request.json();
    if(!description) {
        return Response.json({
            code: -1,
            message: "description is required",
        });
    }
    console.log("description", description);
    
    const user  = await currentUser();
    if (!user) {
        return Response.json({
          code: -2,
          message: "user not login",
        });
    }
    console.log("user", user);
    
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

    const img_name = `wallpaper-${Date.now()}`;
    const s3Key = `wallpapers/${img_name}.png`;
    await downloadAndUploadImage(
        rawImageUrl, 
        process.env.AWS_BUCKET || "aiwallpapers",
        s3Key
    );
    
    // 手动构建 S3 URL
    const img_url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

    console.log('gen wallpaper success', img_url);

    const user_email = user.emailAddresses[0].emailAddress;
    const credits = await getUserCredits(user_email);   
    console.log("credits", credits);
    if(credits.left_credits <= 0) {
        return Response.json({
            code: -1,
            msg: "credits not enough",
        });
    }

    const user_avatar = user.imageUrl;
    const user_nickname = user.firstName;
    const userInfo: User = {
        email: user_email,
        avatar_url: user_avatar,
        nickname: user_nickname || '',
    };

    await saveUser(userInfo);

    const wallpaper: Wallpaper = {
        user_email: user_email,
        img_description: description,
        img_size: img_size,
        img_url: img_url || '',
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