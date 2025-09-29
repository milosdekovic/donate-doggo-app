import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function DonateButton({ amount }: { amount: number }) {
  const handleDonate = useCallback(async () => {
    const stripe = await stripePromise;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { id } = await res.json();
    if (!stripe) return;
    const { error } = await stripe.redirectToCheckout({ sessionId: id });
    if (error) console.error("Stripe redirect error:", error.message);
  }, [amount]);

  return (
    <button
      className="bg-green-800 hover:bg-green-600 cursor-pointer text-white p-2 w-full rounded-md transition"
      onClick={handleDonate}
    >
      Donate {amount / 100}€
    </button>
  );
}
