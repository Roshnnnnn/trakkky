import FormSection from "./components/FormSection";
import PreviewSection from "./components/PreviewSection";
import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    spaName: "",
    city: "",
    area: "",
    price: "",
    openTime: "",
    closeTime: "",
    images: [],
  });

  return (
    <div className="bg-slate-400 min-h-screen">
      <h1 className="text-4xl font-poppins font-bold text-center py-4 px-2">
        TRAKKY
      </h1>
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 p-4">
        <FormSection formData={formData} setFormData={setFormData} />
        <PreviewSection formData={formData} />
      </div>
    </div>
  );
};

export default App;
