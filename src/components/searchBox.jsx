import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
      <div className="col-sm-6">
          <div className="search-input ">
              <input
                  type="text"
                  name="query"
                  className="form-control my-3"
                  placeholder="Որոնում..."
                  value={value}
                  onChange={e => onChange(e.currentTarget.value)}
              />
              <i className="fa fa-search"></i>
          </div>
      </div>
  );
};

export default SearchBox;
