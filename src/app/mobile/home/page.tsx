"use client"
import { useState } from "react";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import { Modal, Button, Select, Input } from "antd";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  bundles?: string[];
}

const products: Product[] = [
  { id: 1, name: "Whiskey", price: "Ksh 920 per piece", image: "/images/whiskey.webp" },
  { id: 2, name: "Vodka", price: "Ksh 730", image: "/images/vodka.png" },
  { id: 3, name: "Rum", price: "Ksh 800", image: "/images/rum.webp" },
  { id: 4, name: "Tequila", price: "Ksh 845", image: "/images/tequilla.jpg" },
  { id: 5, name: "Gin", price: "Ksh 1112", image: "/images/gin.jpg" },
  { id: 6, name: "Brandy", price: "Ksh 685", image: "/images/brandy.jpg" },
  { id: 7, name: "Champagne", price: "Ksh 760", image: "/images/champagne.jpg" },
  { id: 8, name: "Beer", price: "Ksh 378", image: "/images/beer.webp", bundles: ["4 Pack", "6 Pack", "12 Pack"] },
  { id: 9, name: "Wine", price: "Ksh 725", image: "/images/wine.jpg" },
  { id: 10, name: "Cider", price: "Ksh 350", image: "/images/cider.webp" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [bundle, setBundle] = useState<string>("");
  
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setBundle("");
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-4 border-b">
        <h1 className="text-lg font-bold">Welcome to Liquor Store</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Image src="/images/avatar.jpg" width={40} height={40} alt="User" className="rounded-full" />
        </button>
      </div>
      
      {/* Side Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="w-64 bg-white h-full p-4">
            <button className="mb-4" onClick={() => setMenuOpen(false)}>
              <IconX className="w-6 h-6" />
            </button>
            <nav className="space-y-4">
              <a href="#" className="block">Home</a>
              <a href="#" className="block">Cart</a>
              <a href="#" className="block">Profile</a>
              <a href="#" className="block text-red-500">Logout</a>
            </nav>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full p-2 border rounded"
        />
      </div>
      
      {/* Product Listing */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-2 rounded" onClick={() => openProductModal(product)}>
            <Image
              src={product.image}
              width={150}
              height={150}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-sm font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Product Selection Modal */}
      {selectedProduct && (
        <Modal
          title={`Select Quantity for ${selectedProduct.name}`}
          open={true}
          onCancel={closeProductModal}
          footer={null}
        >
          {selectedProduct.bundles && (
            <div className="mb-4">
              <label className="block text-sm font-medium">Select Bundle:</label>
              <Select
                className="w-full"
                value={bundle}
                onChange={(value) => setBundle(value)}
                placeholder="Select bundle"
              >
                {selectedProduct.bundles.map((bundleOption, index) => (
                  <Select.Option key={index} value={bundleOption}>{bundleOption}</Select.Option>
                ))}
              </Select>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium">Enter Quantity:</label>
            <Input
              type="number"
              className="w-full"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <Button type="primary" block onClick={closeProductModal}>
            Confirm
          </Button>
        </Modal>
      )}
    </div>
  );
}
