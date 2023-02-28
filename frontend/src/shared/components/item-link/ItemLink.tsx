import { Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IItemLinkProps {
  to: string;
  label: string;
  onClick: (() => void) | undefined;
  icon: JSX.Element[] | React.ReactElement;
}
export const ItemLink: React.FC<IItemLinkProps> = ({
  to,
  label,
  onClick,
  icon
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });
 
  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};