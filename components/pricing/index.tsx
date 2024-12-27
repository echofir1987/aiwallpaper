import { useUser } from "@clerk/nextjs";

export default function Pricing() {
  const { user } = useUser();

  const handleCheckout = async () => {
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      alert("请先登录");
      return;
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 990,
        plan: "subscribe",
        credits: 100,
        user_email: user.emailAddresses[0].emailAddress
      })
    });
    const res = await response.json();
    console.log("checkout response", res);
  }
  return (
    <section>
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Monthly Subscription
          </h2>
          <p className="mt-5 text-gray-500">7 days money-back guarantee</p>
        </div>
        <div className="] mx-auto mb-8 grid grid-cols-[1.25fr] gap-4 rounded-md bg-gray-100 px-16 py-12 md:mb-12 md:grid-cols-[1.25fr_0.25fr_0.75fr] lg:px-20">
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9453a6e6cf6e_Vector%20(2).svg"
                alt=""
                className="mr-4 inline-block h-4 w-4"
              />
              <p className="max-sm:text-sm">Premium Designs</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9453a6e6cf6e_Vector%20(2).svg"
                alt=""
                className="mr-4 inline-block h-4 w-4"
              />
              <p className="max-sm:text-sm">Regular updates</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9453a6e6cf6e_Vector%20(2).svg"
                alt=""
                className="mr-4 inline-block h-4 w-4"
              />
              <p className="max-sm:text-sm">Copy &amp; Paste</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9453a6e6cf6e_Vector%20(2).svg"
                alt=""
                className="mr-4 inline-block h-4 w-4"
              />
              <p className="max-sm:text-sm">Lifetime Access</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9453a6e6cf6e_Vector%20(2).svg"
                alt=""
                className="mr-4 inline-block h-4 w-4"
              />
              <p className="max-sm:text-sm">Early bird price</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9453a6e6cf6e_Vector%20(2).svg"
                alt=""
                className="mr-4 inline-block h-4 w-4"
              />
              <p className="max-sm:text-sm">Premium Support</p>
            </div>
          </div>
          {/* Vertical Divider */}
          <div className="mx-auto h-full border border-l-1px"></div>
          {/* Price */}
          <div>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              $9.9<span className="text-sm font-light sm:text-sm">/100 credits</span>
            </h2>
            <button
              className="inline-block w-full rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
              onClick={handleCheckout}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
