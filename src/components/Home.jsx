import React, { useState } from "react";
import { Data, Data2 } from "../data/data";
import useSearch from "../hook/useSearch";
import FilterTable from "../ui/FilterTable";

const Home = () => {
  const columns1 = Object.keys(Data[0]);
  const columns2 = Object.keys(Data2[0]);

  const uniqueFiltersCol1 = ["city", "category", "type", "active"];
  const uniqueFiltersCol2 = ["address", "category", "rating"];
  const uniqueFilters1 = uniqueFiltersCol1.reduce((filters, key) => {
    filters[key.charAt(0).toUpperCase() + key.slice(1)] = [
      ...new Set(Data.map((item) => item[key])),
    ];
    return filters;
  }, {});
  const uniqueFilters2 = uniqueFiltersCol2.reduce((filters, key) => {
    filters[key.charAt(0).toUpperCase() + key.slice(1)] = [
      ...new Set(Data2.map((item) => item[key])),
    ];
    return filters;
  }, {});

  const [selectedFilters1, setSelectedFilters1] = useState({
    City: {},
    Category: {},
    Type: {},
    Active: {},
  });

  const [selectedFilters2, setSelectedFilters2] = useState({
    Address: {},
    Rating: {},
    Category: {},
  });

  const handleCheckboxChange1 = (filterType, option) => {
    setSelectedFilters1((prevState) => ({
      ...prevState,
      [filterType]: {
        ...prevState[filterType],
        [option]: !prevState[filterType][option],
      },
    }));
  };

  const handleCheckboxChange2 = (filterType, option) => {
    setSelectedFilters2((prevState) => ({
      ...prevState,
      [filterType]: {
        ...prevState[filterType],
        [option]: !prevState[filterType][option],
      },
    }));
  };

  const filterData1 = (data) => {
    return data.filter((item) => {
      return (
        (Object.keys(selectedFilters1.City).length === 0 ||
          selectedFilters1.City[item.city]) &&
        (Object.keys(selectedFilters1.Category).length === 0 ||
          selectedFilters1.Category[item.category]) &&
        (Object.keys(selectedFilters1.Type).length === 0 ||
          selectedFilters1.Type[item.type]) &&
        (Object.keys(selectedFilters1.Active).length === 0 ||
          selectedFilters1.Active[item.active])
      );
    });
  };

  const filterData2 = (data) => {
    return data.filter((item) => {
      return (
        (Object.keys(selectedFilters2.Address).length === 0 ||
          selectedFilters2.Address[item.address]) &&
        (Object.keys(selectedFilters2.Rating).length === 0 ||
          selectedFilters2.Rating[item.rating]) &&
        (Object.keys(selectedFilters2.Category).length === 0 ||
          selectedFilters2.Category[item.category])
      );
    });
  };

  const filteredData1 = filterData1(Data);
  const filteredData2 = filterData2(Data2);

  const { handleSearch: handleSearch1, searchData: searchData1 } =
    useSearch(filteredData1);
  // const { handleSearch: handleSearch2, searchData: searchData2 } = useSearch(filteredData2);

  return (
    <div >
      <FilterTable
        data={searchData1}
        uniqueFilters={uniqueFilters1}
        columns={columns1}
        handleCheckboxChange={handleCheckboxChange1}
        selectedFilters={selectedFilters1}
        handleSearch={handleSearch1}
        placeholder="Name"
      />
      <FilterTable
        data={filteredData2}
        uniqueFilters={uniqueFilters2}
        columns={columns2}
        handleCheckboxChange={handleCheckboxChange2}
        selectedFilters={selectedFilters2}
        // handleSearch={handleSearch2}
        // placeholder="Mall Name"
      />
    </div>
  );
};

export default Home;
