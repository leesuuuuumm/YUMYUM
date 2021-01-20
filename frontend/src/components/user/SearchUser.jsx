import React from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

const SearchUser = () => {
  const defaultProps = {
    options: searchingUser,
    getOptionLabel: (option) => option.name,
  };

  const flatProps = {
    options: searchingUser.map((option) => option.name),
  };

  // const [value, setValue] = React.useState(null);

  return (
    <div style={{ width: 500 }}>
      <Autocomplete
        {...defaultProps}
        id="debug"
        debug
        renderInput={(params) => (
          <TextField {...params} label="유저를 검색해 보세요" margin="normal" />
        )}
      />
    </div>
  );
};

const searchingUser = [
  { name: "Ahyeon" },
  { name: "Zoonam" },
  { name: "Suuuum" },
  { name: "JaeU" },
  { name: "Yeomham" },
];

export default SearchUser;
