require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Pricing constants
const BASE_PRICE = 150; // $150 base per song
const ADDON_PRICES = {
  vocal_tuning: 25,
  instrumental_mix: 15,
  stems: 20,
};

app.post('/create-checkout-session', async (req, res) => {
  const { fullName, email, quantity, notes, addons } = req.body;

  const quantityNum = Number(quantity) || 1;
  let addonsTotal = 0;

  if (addons && Array.isArray(addons)) {
    addons.forEach(addon => {
      if (ADDON_PRICES[addon]) {
        addonsTotal += ADDON_PRICES[addon];
      }
    });
  }

  const totalPrice = (BASE_PRICE + addonsTotal) * quantityNum;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: totalPrice * 100, // Stripe expects cents
            product_data: {
              name: 'Mixing Service',
              description: `Ordered by ${fullName}. Notes: ${notes || 'None'}. Add-ons: ${addons && addons.length > 0 ? addons.join(', ') : 'None'}`,
            },
          },
          quantity: 1, // we set totalPrice to include quantity already
        },
      ],
      success_url: 'https://yourdomain.com/success', // Update to your success page URL
      cancel_url: 'https://yourdomain.com/cancel',   // Update to your cancel page URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
