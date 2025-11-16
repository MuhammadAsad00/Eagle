import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { shopDataContext } from "../../context/ShopContext";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {getFilteredProducts} = useContext(shopDataContext);

  const handleSortChange = (e) => {
  const sortBy = e.target.value;
  const newParams = new URLSearchParams(searchParams);
  newParams.set("sortBy", sortBy);
  setSearchParams(newParams);
};

// Trigger product reload whenever URL params change (including sortBy)
  useEffect(() => {
    const filters = Object.fromEntries([...searchParams]);
    getFilteredProducts(filters);
  }, [searchParams]);


  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        id="sort"
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOption;
