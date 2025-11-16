import React, { useContext } from "react";
import { useState } from "react";
import uploadImage from "../assets/imageUpload.webp";
import { authDataContext } from "./../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("Men");
  const [category, setCategory] = useState("Top wear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  let { serverUrl } = useContext(authDataContext);

  const handleAdProduct = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Uploading product...");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("gender", gender);
      formData.append("category", category);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(serverUrl + "/api/product/addproduct",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      if (result.data) {
        setName("");
        setDescription("");
        setPrice("");
        setGender("Men");
        setCategory("Top wear");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }

      toast.success("Product added successfully!", { id: toastId });
    } catch (error) {
      console.log("Error Adding Product:", error.response?.data || error);
      toast.error("Failed to add product. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleAdProduct}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="$ 2500"
            required
          />
        </div>
        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        {/*Sub Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Top wear">Top wear</option>
            <option value="Bottom wear">Bottom wear</option>
          </select>
        </div>
        {/* bestseller */}
        <div className="flex items-center gap-[10px] mt-[20px] mb-6">
          <input
            type="checkbox"
            id="checkbox"
            className="w-[25px] h-[25px] cursor-pointer"
            onChange={(e) => setBestseller((prev) => !prev)}
          />
          <label htmlFor="checkbox" className="block font-semibold">
            Bestseller
          </label>
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes</label>
          <input
            type="text"
            name="sizes"
            value={sizes.join(", ")}
            onChange={(e) =>
              setSizes(e.target.value.split(",").map((size) => size.trim()))
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Images</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label htmlFor="image1">
              <img
                src={!image1 ? uploadImage : URL.createObjectURL(image1)}
                alt="Upload 1"
                className="w-[70%] h-[80%] object-cover rounded-lg shadow-2xl cursor-pointer transition hover:scale-105"
              />
            </label>
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImage1(e.target.files[0]);
                  toast.success("Image 1 selected successfully!", {
                    duration: 1500, // Auto dismiss in 1.5s
                  });
                }
              }}
            />
            <label htmlFor="image2">
              <img
                src={!image2 ? uploadImage : URL.createObjectURL(image2)}
                alt=""
                className="w-[70%] h-[80%] object-cover rounded-lg shadow-2xl hover:cursor-pointer transition hover:scale-105"
              />
            </label>
            <input
              type="file"
              id="image2"
              hidden
               onChange={(e) => {
                if (e.target.files[0]) {
                  setImage2(e.target.files[0]);
                  toast.success("Image 2 selected successfully!", {
                    duration: 1500, // Auto dismiss in 1.5s
                  });
                }
              }}
            />
            <label htmlFor="image3">
              <img
                src={!image3 ? uploadImage : URL.createObjectURL(image3)}
                alt=""
                className="w-[70%] h-[80%] object-cover rounded-lg shadow-2xl hover:cursor-pointer transition hover:scale-105"
              />
            </label>
            <input
              type="file"
              id="image3"
              hidden
               onChange={(e) => {
                if (e.target.files[0]) {
                  setImage3(e.target.files[0]);
                  toast.success("Image 3 selected successfully!", {
                    duration: 1500, // Auto dismiss in 1.5s
                  });
                }
              }}
            />
            <label htmlFor="image4">
              <img
                src={!image4 ? uploadImage : URL.createObjectURL(image4)}
                alt=""
                className="w-[70%] h-[80%] object-cover rounded-lg shadow-2xl hover:cursor-pointer transition hover:scale-105"
              />
            </label>
            <input
              type="file"
              id="image4"
              hidden
               onChange={(e) => {
                if (e.target.files[0]) {
                  setImage4(e.target.files[0]);
                  toast.success("Image 4 selected successfully!", {
                    duration: 1500, // Auto dismiss in 1.5s
                  });
                }
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
