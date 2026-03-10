import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: Request) {
  try {
    const { matchId, clientName, clientEmail, tier } = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Determine the correct Stripe price ID based on tier
    let priceId: string;
    if (tier === "concierge") {
      priceId = process.env.STRIPE_PRICE_ID_CONCIERGE || process.env.STRIPE_PRICE_ID!;
    } else if (tier === "guided") {
      priceId = process.env.STRIPE_PRICE_ID_GUIDED || process.env.STRIPE_PRICE_ID!;
    } else {
      // Fallback for backwards compatibility (no tier specified)
      priceId = process.env.STRIPE_PRICE_ID!;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: clientEmail || undefined,
      metadata: {
        matchId,
        clientName,
        tier: tier || "guided",
      },
      success_url: `${baseUrl}/book-call?paid=true&tier=${tier || "guided"}&matchId=${matchId}`,
      cancel_url: `${baseUrl}/results/${matchId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
