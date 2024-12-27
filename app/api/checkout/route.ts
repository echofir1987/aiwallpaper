import { Order } from "@/types/order";
import { insertOrder } from "@/models/order";


export async function POST(request: Request) {
    //1.获取下单参数
    const params = await request.json();
    console.log("params", params);

    //2.生成订单
    const currentDate = new Date();
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    const created_at = currentDate.toISOString();
    const expired_at = oneMonthLater.toISOString();
    const order_no = created_at.toString();
    const order: Order = {
        order_no: order_no,
        created_at: created_at,
        user_email: params.user_email,
        amount: params.amount,
        plan: params.plan,
        credits: params.credits,
        expired_at: expired_at,
        order_status: 1,
    };
    console.log("order", order);

    //3.保存订单
    await insertOrder(order);

    return Response.json({
        code: 0,
        message: "success",
        data: params
    });
}