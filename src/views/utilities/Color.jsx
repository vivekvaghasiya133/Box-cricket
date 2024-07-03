
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';


// ===============================|| COLOR BOX ||=============================== //


// ===============================|| UI COLOR ||=============================== //

const UIColor = () => {


  return (
    <MainCard title="Color Palette" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
     
    </MainCard>
  );
};

export default UIColor;
