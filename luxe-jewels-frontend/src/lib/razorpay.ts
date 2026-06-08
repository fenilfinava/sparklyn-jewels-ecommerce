// Helper to dynamically load the Razorpay checkout script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // If already loaded, return true
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export const openRazorpayCheckout = async (options: RazorpayOptions) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    throw new Error('Razorpay SDK failed to load. Are you online?');
  }

  const rzp = new (window as any).Razorpay(options);
  rzp.on('payment.failed', function (response: any) {
    console.error('Payment Failed:', response.error);
    alert(`Payment failed: ${response.error.description}`);
  });
  
  rzp.open();
};
