import React, { useState } from "react";
import Frame from "./Frame";
import { run } from "../gemini/gemini-config";
import { Buffer } from "buffer";
import axios from "axios";
import { menu } from "../types/store";
const StoreSave: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [menu,setMenu] = useState<menu[]>([]);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setImage(file);
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("http://localhost:3000/api/stores/upload", formData, {
        });
        const keys = Object.keys(response.data);
        setImage(response.data.image);
        setMenu(keys.filter(value => value != "image").reduce<menu[]>((acc, key) => {
          return [...acc, {name: key, drinks: [...response.data[key].drinks]}];
        },[]))
    }
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Store Name:", name);
    console.log("Store Image:", image);
  };
  console.log(menu);
  
  return (
    <Frame>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Add New Store</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Store Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {menu.length > 0 && menu.map((menu) => (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {menu.name}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {menu.drinks && menu.drinks.length > 0 && menu.drinks.map((drink, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div>
                      <p>{drink.drink_name}</p>
                      <p>{drink.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Store
            </button>
          </div>
        </form>
      </div>
    </Frame>
  );
};

export default StoreSave;
