import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PreviewSection({ formData }) {
  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      if (formData.images && formData.images.length > 0) {
        Array.from(formData.images).forEach((image) =>
          URL.revokeObjectURL(URL.createObjectURL(image))
        );
      }
    };
  }, [formData.images]);

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-4 sm:p-8 flex items-center min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="p-3 sm:p-4 border-b">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Image Gallery{" "}
              {formData.images?.length > 0 &&
                `(${formData.images.length} images)`}
            </h2>
          </div>

          {/* Updated Card Body with Swiper */}
          <div className="p-3 sm:p-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="h-[300px] sm:h-[400px]"
            >
              {formData.images && formData.images.length > 0 ? (
                Array.from(formData.images).map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No images uploaded</p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          {/* Updated Card Footer with Dynamic Form Preview */}
          <div className="p-4 sm:p-6 border-t bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Basic Info</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Spa Name:</span>{" "}
                    <span className="text-gray-600">{formData.spaName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">City:</span>{" "}
                    <span className="text-gray-600">{formData.city}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Area:</span>{" "}
                    <span className="text-gray-600">{formData.area}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Price:</span>{" "}
                    <span className="text-gray-600">₹{formData.price}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Timings</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Opens:</span>{" "}
                    <span className="text-gray-600">
                      {formatTime(formData.openTime)}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Closes:</span>{" "}
                    <span className="text-gray-600">
                      {formatTime(formData.closeTime)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
