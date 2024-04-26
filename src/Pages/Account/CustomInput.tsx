// IMPORTS
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ComponentProps } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

//APP
export const CustomInput = ({
  inputProps,
  isPasswordInput,
  passwordProps,
}: {
  inputProps: ComponentProps<"input">;
  isPasswordInput?: boolean;
  passwordProps?: {
    handlePassword: () => void;
    showPassword: boolean;
    disabled: boolean;
  };
}) => {
  return (
    <Box>
      <label style={{ fontWeight: "bold" }} htmlFor={inputProps.id}>
        {inputProps.title}
      </label>
      <TextField
        fullWidth
        margin="dense"
        size="small"
        id={inputProps.id}
        name={inputProps.name}
        value={inputProps.value}
        onChange={inputProps.onChange}
        disabled={inputProps.disabled}
        required={inputProps.required}
        type={inputProps.type}
      >
        {isPasswordInput && passwordProps && (
          <InputAdornment position="end">
            <IconButton
              onClick={passwordProps.handlePassword}
              edge="end"
              disabled={passwordProps.disabled}
            >
              {passwordProps.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}

        {inputProps.content}
      </TextField>
    </Box>
  );
};
