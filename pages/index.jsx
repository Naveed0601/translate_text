import { Layout, Page } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";
import { Cards } from "../components";

export default function HomePage() {
  const fetch = useAuthenticatedFetch();
  const [products, setProducts] = useState(0);
  const [collections, setCollections] = useState(0);
  const [orders, setOrders] = useState(0);
  const [fulfilled, setFulfilled] = useState(0);
  const [remains, setRemains] = useState(0);

  async function fetchProduct() {
    try {
      const response = await fetch("/api/products/count");
      const data = await response.json();
      console.log("Total Products ", data);
      setProducts(data.count);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCollections() {
    try {
      const response = await fetch("/api/collections/count");
      const data = await response.json();
      console.log("Total Collections ", data);
      setCollections(data.count);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOrders() {
    try {
      const response = await fetch("/api/orders/all");
      const data = await response.json();
      console.log("Total Orders", data);
      setOrders(data.data.length);
      let fulfilledOrders = data.data.filter(
        (item) => item.fulfillment_status === "fulfulled"
      );
      setFulfilled(fulfilledOrders.length);
      setRemains(data.data.length - fulfilledOrders.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
    fetchCollections();
    fetchOrders();
  }, []);

  return (
    <Page fullWidth>
      <div>
        <Layout>
          <Cards title="Total Orders" data={products} productCard />
          <Cards title="Fulfilled Orders" data={fulfilled} fulfilledCard />
          <Cards title="Remains Orders" data={remains} remainsCard />
          <Cards title="Total Products" data={products} productCard />
          <Cards title="Total Collections" data={collections} collectionCard />
        </Layout>
      </div>
    </Page>
  );
}
