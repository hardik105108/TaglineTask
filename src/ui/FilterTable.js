import React from "react";

const FilterTable = ({
  data,
  uniqueFilters,
  columns,
  handleCheckboxChange,
  selectedFilters,
  handleSearch,
  placeholder,
}) => (
  <div className="main">
    <div className="main-filter">
      {Object.entries(uniqueFilters).map(([filterTitle, options]) => (
        <div key={filterTitle} className="filter-box">
          <h2>{filterTitle}</h2>
          {options.map((option) => (
            <div key={option} className="switch-box">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={selectedFilters[filterTitle]?.[option] || false}
                  onChange={() => handleCheckboxChange(filterTitle, option)}
                />
                <span className="slider round"></span>
              </label>
              <span>{option}</span>
            </div>
          ))}
        </div>
      ))}
     {handleSearch && <input
        type="text"
        onChange={handleSearch}
        placeholder={placeholder}
        className="input-box"
      />}
    </div>
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FilterTable;
