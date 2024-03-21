// ** React Imports
import { ReactNode, useEffect } from 'react'

const PricingTable = () => {

  useEffect(() => {
    // Load Stripe.js
    const stripeJs = document.createElement("script");
    stripeJs.src = "https://js.stripe.com/v3/pricing-table.js";
    stripeJs.async = true;
    stripeJs.onload = () => {

      // Add the Pricing Table
      const pricingTable = document.createElement("stripe-pricing-table");
      pricingTable.setAttribute(
        "pricing-table-id",
        "prctbl_1NzIh6E3jUhiKLS7fGIuKlKP"
      );
      pricingTable.setAttribute(
        "publishable-key",
        "pk_live_cqQEmbQ2CbUu2Fh3an1M9wWx"
      );

      // Append the Pricing Table to your component
      const container = document.getElementById("stripe_container");

      // Clear the container's existing content
      if (container) {
        container.innerHTML = "";
      }

      if (container) {
        console.log(container);
        container.appendChild(pricingTable);
      }
    };

    document.head.appendChild(stripeJs);
  }, []);

  return <div id="stripe_container"></div>;
};

PricingTable.getLayout = (page: ReactNode) => <>{page}</>

PricingTable.guestGuard = true;

export default PricingTable
