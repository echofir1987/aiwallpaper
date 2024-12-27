import { UserCredits } from "@/types/user";
import { getUserWallpapersCount } from "@/models/wallpaper";
export async function getUserCredits(user_email: string): Promise<UserCredits> {
  let userCredits: UserCredits = {
    one_time_credits: user_email === 'echofir@gmail.com' ? 100 : 3,
    monthly_credits: 0,
    total_credits: user_email === 'echofir@gmail.com' ? 100 : 3,
    used_credits: 0,
    left_credits: user_email === 'echofir@gmail.com' ? 100 : 3,
  };

  try{
    const used_credits = await getUserWallpapersCount(user_email);
    userCredits.used_credits = used_credits;
    userCredits.left_credits = userCredits.total_credits - userCredits.used_credits;
  }catch(e){
    console.log("get user credits failed: ",e);
  }

  return userCredits;
}
