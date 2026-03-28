"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { whatsAppNumber, deliveryFeeEnabled, deliveryFee } from "@/data/config";
import { menuItems as allMenuItems } from "@/data/menu";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderForm() {
  const { checkoutItems, isCheckoutOpen, isDirectCheckout, closeCheckout, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isInitializedRef = useRef(false);
  const prevCheckoutOpenRef = useRef(false);

  useEffect(() => {
    if (isCheckoutOpen && !prevCheckoutOpenRef.current) {
      isInitializedRef.current = false;
    }
    prevCheckoutOpenRef.current = isCheckoutOpen;
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (isCheckoutOpen && !isInitializedRef.current) {
      isInitializedRef.current = true;
      const newItems = checkoutItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
      setSelectedItems(newItems);
    }
    if (!isCheckoutOpen) {
      setSelectedItems([]);
    }
  }, [isCheckoutOpen, checkoutItems, isDirectCheckout]);

  const filteredMenuItems = allMenuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedItems(prev => prev.filter(item => item.id !== id));
    } else {
      setSelectedItems(prev =>
        prev.map(item => item.id === id ? { ...item, quantity } : item)
      );
    }
  };

  const addNewItem = (menuItem: typeof allMenuItems[0]) => {
    const exists = selectedItems.find(item => item.id === menuItem.id);
    if (exists) {
      updateItemQuantity(menuItem.id, exists.quantity + 1);
    } else {
      setSelectedItems(prev => [...prev, {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
      }]);
    }
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    const itemsTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const fee = deliveryFeeEnabled ? deliveryFee : 0;
    return itemsTotal + fee;
  };

  const getItemsTotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      alert("Please select at least one item");
      return;
    }
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const notes = formData.get("notes") as string;

    if (!name || !phone || !address) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const orderItems = selectedItems
      .map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join("\n");

    const deliveryFeeText = deliveryFeeEnabled 
      ? (deliveryFee > 0 ? `*Delivery Fee:* ₹${deliveryFee}\n` : "*Delivery:* Free\n")
      : "";

    const message = encodeURIComponent(
      `🛒 *New Order*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Address:* ${address}\n\n` +
      `*Order Details:*\n${orderItems}\n\n` +
      `*Items Total:* ₹${getItemsTotal()}\n` +
      deliveryFeeText +
      `*Total:* ₹${getTotalPrice()}\n\n` +
      `${notes ? `*Notes:* ${notes}` : ""}`
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    window.open(`https://wa.me/${whatsAppNumber}?text=${message}`, "_blank");
    
    clearCart();
    setSelectedItems([]);
    setIsSubmitting(false);
    closeCheckout();
  };

  if (!isCheckoutOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
        onClick={closeCheckout}
      />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-dark-gray rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto border border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-dark-gray p-5 border-b border-gray-800 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📝</span> Place Your Order
              </h2>
              <p className="text-sm text-gray-400">{selectedItems.length} items selected</p>
            </div>
            <button
              onClick={closeCheckout}
              className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-5 space-y-4">
            {isDirectCheckout && (
              <>
                <div className="bg-dark rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Your Selected Items</h3>
                  {selectedItems.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No items selected</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium">{item.name}</span>
                            <span className="text-primary font-bold">₹{item.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-primary/20 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-primary/20 transition-colors text-sm"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-500 hover:text-red-500 ml-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-dark rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Add More Items</h3>
              <div className="relative mb-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filteredMenuItems.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No items found</p>
                ) : (
                  filteredMenuItems.map((item) => {
                  const isSelected = selectedItems.some(s => s.id === item.id);
                  const selectedItem = selectedItems.find(s => s.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        isSelected 
                          ? "bg-primary/20 border border-primary/50" 
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.emoji}</span>
                        <div>
                          <div className="text-white text-sm font-medium">{item.name}</div>
                          <div className="text-primary text-xs">₹{item.price}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <>
                            <button
                              type="button"
                              onClick={() => updateItemQuantity(item.id, selectedItem!.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-primary/30 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="text-white text-sm font-medium w-6 text-center">{selectedItem!.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateItemQuantity(item.id, selectedItem!.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-primary/30 transition-colors text-sm"
                            >
                              +
                            </button>
                          </>
                        )}
                        {!isSelected && (
                          <button
                            type="button"
                            onClick={() => addNewItem(item)}
                            className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
                )}
              </div>
            </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Enter your full address"
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Special Instructions
                </label>
                <textarea
                  name="notes"
                  placeholder="Any special requests? (optional)"
                  rows={2}
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="bg-dark rounded-xl p-4">
                  {deliveryFeeEnabled && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Items Total</span>
                        <span className="text-white font-medium">₹{getItemsTotal()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Delivery Fee</span>
                        <span className="text-white font-medium">
                          {deliveryFee > 0 ? `₹${deliveryFee}` : "Free"}
                        </span>
                      </div>
                    </>
                  )}
                  {!deliveryFeeEnabled && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total</span>
                      <span className="text-white font-medium">₹{getItemsTotal()}</span>
                    </div>
                  )}
                </div>
                {deliveryFeeEnabled && (
                  <div className="bg-dark rounded-xl p-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-primary">₹{getTotalPrice()}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || selectedItems.length === 0}
                className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                    Send Order via WhatsApp
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center">
              Your order will be sent via WhatsApp. Payment on delivery.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
