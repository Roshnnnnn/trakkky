import axios from "axios";

export default function FormSection({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: prev.images ? [...prev.images, ...files] : files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.spaName ||
      !formData.city ||
      !formData.area ||
      !formData.price ||
      !formData.openTime
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("spa_name", formData.spaName);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("area", formData.area);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("timing", formData.openTime);

    if (formData.images) {
      Array.from(formData.images).forEach((image) => {
        formDataToSend.append("images", image);
      });
    }

    try {
      const response = await axios.put(
        "http://20.193.149.47:2242/spas/vendor-spa-update-test/1/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);
      alert("Form submitted successfully!");

      // Reset form after successful submission
      setFormData({
        spaName: "",
        city: "",
        area: "",
        price: "",
        openTime: "",
        closeTime: "",
        images: null,
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:pt-10">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-gray-200 rounded-lg shadow-md">
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Spa Name */}
          <div>
            <label
              htmlFor="spaName"
              className="block text-sm font-medium text-gray-700"
            >
              Spa Name
            </label>
            <input
              type="text"
              id="spaName"
              name="spaName"
              value={formData.spaName || ""}
              placeholder="Enter spa name"
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ""}
              placeholder="Enter city"
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Area */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area || ""}
              placeholder="Enter area"
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Images */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 p-2 
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            />

            {/* Image Previews */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {formData.images &&
                Array.from(formData.images).map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          images: Array.from(prev.images).filter(
                            (_, i) => i !== index
                          ),
                        }));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ""}
                placeholder="Enter price"
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 pl-7 rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="openTime"
                className="block text-sm font-medium text-gray-700"
              >
                Opening Time
              </label>
              <input
                type="time"
                id="openTime"
                name="openTime"
                value={formData.openTime}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="closeTime"
                className="block text-sm font-medium text-gray-700"
              >
                Closing Time
              </label>
              <input
                type="time"
                id="closeTime"
                name="closeTime"
                value={formData.closeTime}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 sm:py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
