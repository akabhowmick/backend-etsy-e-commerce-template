import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ComponentProps } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

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
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <label style={{ fontWeight: "bold" }} htmlFor={inputProps.id}>
        {inputProps.title}
      </label>
      {!isPasswordInput ? (
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
          autoComplete={inputProps.autoComplete}
        >
          {inputProps.content}
        </TextField>
      ) : (
        <div>
          {" "}
          <FormControl fullWidth variant="outlined" disabled={inputProps.disabled}>
            <OutlinedInput
              id="password"
              name="password"
              value={inputProps.value}
              disabled={inputProps.disabled}
              required={inputProps.required}
              onChange={inputProps.onChange}
              type={passwordProps?.showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={passwordProps?.handlePassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passwordProps?.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      )}
    </Box>
  );
};
