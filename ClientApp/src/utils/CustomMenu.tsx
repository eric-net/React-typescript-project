import React, {memo,useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RoleSorting from "../components/Admin/Dashboard/Role/RoleSorting";
import FilterRole from "../components/Admin/Dashboard/Role/FilterRole";
import ExperienceFilter from "../components/Admin/Dashboard/Experience/ExperienceFilter";
import ExpSorting from "../components/Admin/Dashboard/Experience/ExpSorting";
import LocationFilter from "../components/Admin/Dashboard/Location/LocationFilter";
import LocationSorting from "../components/Admin/Dashboard/Location/LocationSorting";
import StatusWithSorting from "../components/Admin/Dashboard/JobStatus/StatusWithSorting";
import { StatusFilter } from "../components/Admin/Dashboard/JobStatus/StatusFilter";
import "./custom.scss";

// status filter
type TextProps = {
    text: string,
}
 const MenuButton = ({ text }: TextProps) => {
     const [colName,setColName]=useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setColName(text.toLowerCase())
    };

    const handleClose = () => {
        setAnchorEl(null);

     };
     return (
        <>
            <Button aria-controls="dropdown-menu" className="menuButton" aria-haspopup="true" onClick={handleClick}>
                {text} <ExpandMoreIcon />
            </Button>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                /*onClick={handleClose}*/
             >
                 {colName === 'Role'.toLowerCase() && <div><RoleSorting /><FilterRole /></div>}
                 {colName === 'Experience'.toLowerCase() && <div><ExpSorting /><ExperienceFilter /></div>}
                 {colName === 'Location'.toLowerCase() && <div><LocationSorting /><LocationFilter/></div>}
                 {colName === 'Status'.toLowerCase() && <div>
                     <StatusWithSorting /><StatusFilter />
                 </div>}   
             </Menu>
        </>
     );
}
export default memo(MenuButton);