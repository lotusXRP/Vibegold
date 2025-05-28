
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (item_id) => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id, quantity: 1 }),
    });
    const data = await response.json();
    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("Checkout failed.");
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>VibeGold™ Pre-Order Store</h1>
      <p>Select your kit below:</p>
      <button onClick={() => handleCheckout('starter_kit')} disabled={loading}>
        Pre-order Starter Kit
      </button>
      <button onClick={() => handleCheckout('refill_pack')} disabled={loading}>
        Pre-order Refill Pack
      </button>
      <button onClick={() => handleCheckout('collectors_edition')} disabled={loading}>
        Pre-order Collector’s Edition
      </button>
    </div>
  );
}
