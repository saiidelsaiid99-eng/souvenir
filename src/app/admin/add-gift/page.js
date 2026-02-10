"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";

export default function AddGift() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "gift",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [editingGiftId, setEditingGiftId] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Fetch gifts on load
  const fetchGifts = async () => {
    const res = await fetch("/api/gifts");
    if (res.ok) {
      const data = await res.json();
      setGifts(data);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Show toast function with better icon handling
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Handle image uploads
  const handleImages = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        uploadedUrls.push(data.url);
      } else {
        showToast("Failed to upload image", "error");
      }
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));

    setPreviewImages((prev) => [...prev, ...uploadedUrls]);
    setIsUploading(false);
  };

  // Remove image from form and preview
  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Submit form to API (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      showToast("Name and price are required", "error");
      return;
    }

    if (form.images.length === 0) {
      showToast("Please upload at least one image", "error");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
    };

    if (isNaN(payload.price)) {
      showToast("Price must be a valid number", "error");
      return;
    }

    const url = editingGiftId
      ? `/api/gifts/${editingGiftId}`
      : "/api/gifts";
    const method = editingGiftId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      showToast(`Gift ${editingGiftId ? "updated" : "added"} successfully!`, "success");
      setForm({
        name: "",
        price: "",
        description: "",
        category: "gift",
        images: [],
      });
      setPreviewImages([]);
      setEditingGiftId(null);
      fetchGifts();
    } else {
      showToast("Failed to save gift", "error");
    }
  };

  // Load gift data into form for editing
  const handleEdit = (gift) => {
    setEditingGiftId(gift._id);
    setForm({
      name: gift.name,
      price: gift.price.toString(),
      description: gift.description || "",
      category: gift.category || "gift",
      images: gift.images || [],
    });
    setPreviewImages(gift.images || []);
    showToast(`Editing "${gift.name}"`, "info");
  };

  // Delete gift - NO confirmation dialog
  const handleDelete = async (id) => {
    const gift = gifts.find(g => g._id === id);
    if (!gift) return;
    
    const giftName = gift.name || "this gift";

    // Show immediate feedback
    showToast(`Deleting "${giftName}"...`, "deleting");

    try {
      const res = await fetch(`/api/gifts/${id}`, { method: "DELETE" });
      
      if (res.ok) {
        // Wait a moment for the deleting toast to show, then show success
        setTimeout(() => {
          showToast(`"${giftName}" deleted successfully!`, "success");
        }, 100);
        
        // Reset form if we deleted the gift being edited
        if (editingGiftId === id) {
          setForm({
            name: "",
            price: "",
            description: "",
            category: "gift",
            images: [],
          });
          setPreviewImages([]);
          setEditingGiftId(null);
        }
        
        // Refresh the gifts list
        fetchGifts();
      } else {
        setTimeout(() => {
          showToast(`Failed to delete "${giftName}"`, "error");
        }, 100);
      }
    } catch (error) {
      setTimeout(() => {
        showToast(`Error deleting "${giftName}"`, "error");
      }, 100);
    }
  };

  // Get the correct icon based on toast type
  const getToastIcon = (type) => {
    switch(type) {
      case "success": return "✅";
      case "error": return "❌";
      case "info": return "ℹ️";
      case "deleting": return "⏳";
      default: return "ℹ️";
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="flex-1">
        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in">
            <div className={`${
              toast.type === "success" 
                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300" 
                : toast.type === "error"
                ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300"
                : toast.type === "info"
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300"
                : "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300"
            } backdrop-blur-sm rounded-xl p-4 border shadow-lg max-w-sm flex items-center gap-3`}>
              <span className="text-xl">
                {getToastIcon(toast.type)}
              </span>
              <div className="flex-1">
                <p className="font-medium">{toast.message}</p>
              </div>
              <button
                onClick={() => setToast({ show: false, message: "", type: "success" })}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="mb-12">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  {editingGiftId ? "Edit Gift" : "Add New Gift"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Gift Name */}
                  <div>
                    <label className="block text-slate-300 mb-2 font-medium">Gift Name</label>
                    <input
                      name="name"
                      placeholder="Enter gift name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50"
                      required
                    />
                  </div>

                  {/* Price & Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">Price ($)</label>
                      <input
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">Category</label>
                      <input
                        name="category"
                        placeholder="e.g., Gift, Custom"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-slate-300 mb-2 font-medium">Description</label>
                    <textarea
                      name="description"
                      placeholder="Gift description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50"
                      rows={4}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label
                      htmlFor="images"
                      className={`block w-full cursor-pointer border-2 border-dashed border-cyan-500/50 rounded-2xl p-8 text-center text-cyan-300 hover:bg-cyan-500/10 transition-all ${
                        isUploading ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin mb-2"></div>
                          <span>Uploading images...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-4xl mb-2">🎁</span>
                          <span className="font-medium">Click or drag & drop images</span>
                          <span className="text-sm text-slate-400 mt-1">Supported: JPG, PNG, GIF</span>
                        </div>
                      )}
                    </label>

                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImages}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </div>

                  {/* Preview Images */}
                  {previewImages.length > 0 && (
                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">Preview Images</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {previewImages.map((url, i) => (
                          <div
                            key={i}
                            className="relative rounded-xl overflow-hidden border border-cyan-500/30 group"
                          >
                            <img
                              src={url}
                              alt={`Preview ${i + 1}`}
                              className="h-32 w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                              aria-label="Remove image"
                            >
                              ✕
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 text-white text-xs p-2">
                              Image {i + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingGiftId ? "Update Gift" : "Add Gift"}
                  </button>
                </form>
              </div>
            </div>

            {/* Gifts List */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20">
              <h2 className="text-3xl font-bold mb-6 text-white">All Gifts</h2>

              {gifts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4 text-slate-500">🎁</div>
                  <p className="text-slate-400 text-lg">No gifts found</p>
                  <p className="text-slate-500">Add your first gift above</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gifts.map((gift) => (
                    <div
                      key={gift._id}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group"
                    >
                      {/* Gift Images */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {gift.images?.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${gift.name} image ${i + 1}`}
                            className="h-20 w-full object-cover rounded-lg"
                          />
                        ))}
                        {(!gift.images || gift.images.length === 0) && (
                          <div className="col-span-3 h-20 bg-slate-700/30 rounded-lg flex items-center justify-center">
                            <span className="text-slate-500">No images</span>
                          </div>
                        )}
                      </div>

                      {/* Gift Info */}
                      <h3 className="font-bold text-lg text-white mb-2">{gift.name}</h3>
                      <p className="text-cyan-300 text-xl font-bold mb-2">${gift.price.toFixed(2)}</p>
                      <p className="text-slate-400 text-sm mb-3">
                        <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                          {gift.category}
                        </span>
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleEdit(gift)}
                          className="flex-1 border border-cyan-500/30 text-cyan-300 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(gift._id)}
                          className="flex-1 border border-red-500/30 text-red-300 py-2 rounded-lg hover:bg-red-500/10 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}