import { currentUser } from "@clerk/nextjs/server";
import { getUserCredits } from "@/service/order";

export async function POST(req: Request) {
    const user = await currentUser();
    const user_email = user?.emailAddresses[0].emailAddress;
    const userCredits = user_email ? await getUserCredits(user_email) : 0;
    console.log(userCredits);

    return Response.json({
        code:0,
        message:"success",
        data:{
            credits:userCredits
        }
    })
}