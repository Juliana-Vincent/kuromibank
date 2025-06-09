import Alert from '@mui/material/Alert';
import { FC } from "react";

const CustomAlert: FC<{description: string, success?: boolean}> = ({description, success}) => {
  return (
    <Alert severity={success ? 'success' : 'error'}>{description}</Alert>
    
  );
}
export default CustomAlert