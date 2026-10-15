/**
 * withRouter HOC — react-router-dom v7 compatibility shim.
 *
 * react-router-dom v6/v7 removed the `withRouter` HOC and the class-component
 * props (match, location, history).  This shim re-creates those props using the
 * modern hooks so that existing class components keep working without a full
 * rewrite.
 *
 * Usage:
 *   export default withRouter(MyClassComponent);
 *
 * The wrapped component receives:
 *   props.match.params  — from useParams()
 *   props.location      — from useLocation()
 *   props.history.push  — from useNavigate()
 *   props.history.replace — from useNavigate(..., { replace: true })
 */
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export function withRouter(Component) {
  function Wrapper(props) {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const history = {
      push: (to) => navigate(to),
      replace: (to) => navigate(to, { replace: true }),
    };

    return (
      <Component
        {...props}
        match={{ params }}
        location={location}
        history={history}
      />
    );
  }

  Wrapper.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`;
  return Wrapper;
}

export default withRouter;
