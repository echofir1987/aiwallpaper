import { currentUser } from "@clerk/nextjs/server";
import { getUserCredits } from "@/service/order";
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
            return respData({
                credits: {
                    left_credits: 0
                }
            });
        }

        const user_email = user.emailAddresses[0].emailAddress;
        const userCredits = await getUserCredits(user_email);

        return respData({
            credits: userCredits
        });
    } catch (error) {
        console.error("获取用户信息失败:", error);
        return respErr("获取用户信息失败");
    }
}