import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, LegacyCard } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();

  async function fetchProduct() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data);
      data.forEach((product) => {
        product.metaDescription = product.metaDescription.replace(
          /(<([^>]+)>)/gi,
          ""
        );
      });
      setProducts(data);
    } catch (error) {
      console.log("Not Found", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleProductClick = (product) => {
    navigate("/translate", {
      state: {
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
      },
    });
  };

  return (
    <div>
      <h1 className="text-center mt-2">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="flex items-stretch"
              onClick={() => handleProductClick(product)}
            >
              <Layout.Section>
                <LegacyCard className="h-full flex flex-col">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.metaTitle}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <h2 className="text-lg font-semibold mt-2 mb-1 pl-2 pb-2">
                    {product.metaTitle}
                  </h2>
                  <p className="text-sm mb-2 pl-2 pb-2 flex-grow">
                    {product.metaDescription}
                  </p>
                </LegacyCard>
              </Layout.Section>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};
