import { OptionType } from "@/app/types";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { Select } from "@mui/material";

import React, { ChangeEvent, memo } from "react";

type MultiSelectDropdownProps = {
  options: OptionType[];
  onChange: (selectedOptions: OptionType[]) => void;
};

const LazyMultiSelectDropdown = ({
  options,
  onChange,
}: MultiSelectDropdownProps) => {
  const [selected, setSelected] = React.useState<OptionType[]>([]);
  const [search, setSearch] = React.useState("");

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    const selectedOption = options.find(
      (opt) => opt.id == value[value.length - 1],
    );
    if (selectedOption) {
      if (!selected.find((item) => item.id == selectedOption.id)) {
        setSelected([...selected, selectedOption]);
        onChange?.([...selected, selectedOption]);
      } else {
        const options = selected.filter((item) => item.id != selectedOption.id);
        setSelected(options);
        onChange?.(selected);
      }
    }
  };

  return (
    <FormControl size="small" fullWidth>
      <Select
        labelId="searchable-multiselect-label"
        fullWidth
        multiple
        value={selected}
        onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
        renderValue={(selected) => selected.map((opt) => opt.name).join(", ")}
        MenuProps={{ PaperProps: { style: { maxHeight: 250 } } }}
      >
        <MenuItem disableRipple disableTouchRipple>
          <TextField
            autoFocus
            size="small"
            placeholder="Search..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()} // prevent closing select on typing
          />
        </MenuItem>

        {filteredOptions.map((option) => (
          <MenuItem
            sx={{ height: 44 }}
            key={option.id}
            value={option.id}
            disableGutters
          >
            <Checkbox checked={selected.indexOf(option) > -1} />
            <ListItemText
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              primary={option.name}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const MultiSelectDropdown = memo(
  LazyMultiSelectDropdown,
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options)
    );
  },
);
