import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export const EditAccount = ({
  onClick,
  isEdit,
}: {
  isEdit: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Grid item xs={6}>
      <Button
        sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
        component="button"
        size="large"
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {isEdit === true ? "CLICK TO SAVE UPDATE" : "CLICK TO EDIT"}
      </Button>
    </Grid>
  );
};
