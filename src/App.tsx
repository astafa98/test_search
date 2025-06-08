import Button from "./ui/Button";
import SearchInput from "./ui/SearchInput";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import type { ISearchForm } from "./types";
import { useQueryImageMutation } from "./api/queryApi";
import Loader from "./ui/Loader";
import Popup from "./ui/Popup";
import Pagination from "./ui/Pagination";
import { motion } from "framer-motion";

function App() {
  const { register, handleSubmit, watch, reset } = useForm<ISearchForm>({
    mode: "onChange",
  });
  const [viewResultMode, setViewResultMode] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupImg, setPopupImg] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const watchQuery = watch("query");

  const [queryImage, { isLoading, data }] = useQueryImageMutation();

  const onSubmit = async (formData: ISearchForm) => {
    setViewResultMode(true);
    const cleanData = formData.query.replace(/\s+/g, "").toLowerCase();
    setSearchQuery(cleanData);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (searchQuery) {
      queryImage({ query: searchQuery, page: currentPage });
    }
  }, [searchQuery, currentPage]);

  return (
    <div className=" h-[80vh] flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            className="z-50 flex flex-col  items-center   "
            style={{ willChange: "transform" }}
          >
            <div
              className={`flex gap-2 transition-all duration-500 w-full px-4 justify-center items-center ${
                viewResultMode ? "translate-y-2" : "translate-y-70"
              }`}
            >
              <SearchInput
                placeholder="Телефоны, яблоки, груши..."
                register={register}
                watchQuery={watchQuery}
                reset={reset}
              />
              <Button onSubmit={() => onSubmit} />
            </div>
          </div>
        </div>

        {isLoading && <Loader />}
      </form>
      {/* Grid for images */}
      <div className="w-full px-4 mt-8 grid grid-cols-3 gap-1  sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {data?.total !== 0 ? (
          data?.results.map((item) => (
            <motion.div
              key={item.id}
              className="relative aspect-square cursor-pointer"
              onClick={() => {
                setPopupImg(item.urls.regular);
                setPopupOpen(true);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.05 * (Number(item.id) % 10),
              }}
            >
              <img
                src={item.urls.small}
                alt={item.alt_description || "Image"}
                className="w-full h-full object-cover rounded-lg shadow-md border border-[#EBEBEB]"
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-left text-gray-500 justify-self-start">
            К сожалению, поиск не дал результатов
          </div>
        )}
      </div>
      <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
        {popupImg && (
          <img
            src={popupImg}
            alt="popup"
            className="max-w-full max-h-[80vh] rounded-xl"
          />
        )}
      </Popup>
      {/* Пагинация */}
      <div className="mt-auto">
        {viewResultMode && data && data?.total_pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data && data.total_pages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
export default App;
