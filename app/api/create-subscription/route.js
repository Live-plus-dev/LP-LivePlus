import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { planType, quantity, pricePerUser } = await req.json();

    // Create or retrieve the product
    const product = await stripe.products.create({
      name: `Life Plus ${planType.charAt(0).toUpperCase() + planType.slice(1)}`,
      description: `Assinatura ${planType} do Life Plus`,
    });

    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: pricePerUser,
      currency: 'brl',
      recurring: {
        interval: 'month',
      },
    });

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: quantity,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
      subscription_data: {
        metadata: {
          planType,
          quantity,
        },
      },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ error: { message: err.message } }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}