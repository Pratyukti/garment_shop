// import React from 'react';
// import { ListGroup, Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// import useWindowSize from '../../../../hooks/useWindowSize';
// import NavSearch from './NavSearch';

// const NavLeft = () => {

//   const windowSize = useWindowSize();

//   let navItemClass = ['nav-item'];
//   if (windowSize.width <= 575) {
//     navItemClass = [...navItemClass, 'd-none'];
//   }

//   return (
//     <React.Fragment>
//       <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
//         <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
//           <Dropdown align={'start'}>
//             <Dropdown.Toggle variant={'link'} id="dropdown-basic">
//               SETTINGS
//             </Dropdown.Toggle>
//             <ul>
//               <Dropdown.Menu>
//                 {/* <li>
//                   <Link to="#" className="dropdown-item">
//                     Financial Year Settings
//                   </Link>
//                 </li> */}
//                 <li>
//                   <Link to="#" className="dropdown-item" onClick={handleClickOpen}>
//                     Printer Setting
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="dropdown-item">
//                     User Role
//                   </Link>
//                 </li>
//               </Dropdown.Menu>
//             </ul>
//           </Dropdown>
//         </ListGroup.Item>
//         <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
//           <NavSearch windowWidth={windowSize.width} />
//         </ListGroup.Item>
//       </ListGroup>
//     </React.Fragment>
//   );
// };

// export default NavLeft;



// NavLeft.jsx
import React, { useState } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../../hooks/useWindowSize'; // adjust the path accordingly
import PrinterSetting from 'views/settingsmodule/printersetting'; // Import the PrinterSetting component
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon

const NavLeft = () => {
  const windowSize = useWindowSize();
  
  // Modal open/close state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <Dropdown align={'start'}>
            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
              SETTINGS
            </Dropdown.Toggle>
            <ul>
              <Dropdown.Menu>
                <li>
                  <Link to="#" className="dropdown-item" onClick={handleClickOpen}>
                    Printer Setting
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    User Role
                  </Link>
                </li>
              </Dropdown.Menu>
            </ul>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>

      {/* Modal for Printer Settings */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Printer Settings
          {/* Close Icon at the top-right corner */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <PrinterSetting /> {/* Display PrinterSetting component */}
        </DialogContent>
       
      </Dialog>
    </React.Fragment>
  );
};

export default NavLeft;
