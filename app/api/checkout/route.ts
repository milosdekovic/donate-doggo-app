import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Dog Donation",
              description: "Thank you for supporting our doggos!",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://donate-doggo-app.vercel.app/success",
      cancel_url: "https://donate-doggo-app.vercel.app/cancel",
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
