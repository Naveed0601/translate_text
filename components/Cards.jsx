import { LegacyCard, Layout } from "@shopify/polaris";
import React from "react";

export function Cards({
  title,
  data,
  productCard,
  collectionCard,
  ordersCard,
  fulfilledCard,
  remainsCard,
}) {
  return (
    <>
      <Layout.Section oneThird>
        <LegacyCard title={title} sectioned>
          <h2>
            {productCard && data}
            {collectionCard && data}
            {ordersCard && data}
            {fulfilledCard && data}
            {remainsCard && data}
          </h2>
        </LegacyCard>
      </Layout.Section>
    </>
  );
}
