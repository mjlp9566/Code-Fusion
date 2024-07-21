
import { useLocation} from 'react-router-dom';


export const withLoc = (Component)=> {
  const Wrapper = (props) => {
    const location = useLocation();
    
    return (
      <Component
        location={location}
        {...props}
        />
    );
  };
  
  return Wrapper;
};